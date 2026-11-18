// Public site action for the independent Receipt Notary peer.
const encoder = new TextEncoder();

function publish(detail) {
  window.dispatchEvent(new CustomEvent("anb:peer-state", { detail }));
}

async function sha256(text) {
  const bytes = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return "sha256-" + [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function compact(value) {
  return JSON.stringify(value, null, 2);
}

export function registerActions(actions) {
  actions.register({
    name: "verify_receipt_digest",
    description: "Check a receipt digest's SHA-256 syntax, or compute a canonical SHA-256 digest from supplied receipt text. Returns deterministic evidence only.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        request: { type: "string", title: "Receipt digest or statement", description: "sha256:<64 hex>, a bare 64-hex digest, or text to hash." },
      },
      required: ["request"],
    },
    effect: "read",
    availability: "bridge",
    async execute({ request }) {
      const input = String(request || "").trim();
      const match = input.match(/(?:sha256[:-])?([0-9a-fA-F]{64})/);
      let result;
      if (match) {
        const digest = match[1].toLowerCase();
        const canonical = JSON.stringify({ algorithm: "SHA-256", digest });
        const recomputed = await sha256(canonical);
        result = {
          status: "succeeded",
          mode: "syntax-check",
          algorithm: "SHA-256",
          suppliedDigest: `sha256-${digest}`,
          syntax: "PASS",
          canonicalStatement: canonical,
          canonicalDigest: recomputed,
          evidence: "The supplied value is a syntactically valid 64-character hexadecimal SHA-256 digest. Syntax validity is not proof that the underlying receipt is authentic.",
          keyReceived: false,
          privateContextReceived: false,
        };
      } else if (input) {
        const canonical = JSON.stringify({ statement: input.replace(/\s+/g, " ").trim() });
        result = {
          status: "succeeded",
          mode: "canonical-hash",
          algorithm: "SHA-256",
          canonicalStatement: canonical,
          digest: await sha256(canonical),
          evidence: "The digest was computed in this browser from a whitespace-normalized canonical statement.",
          keyReceived: false,
          privateContextReceived: false,
        };
      } else {
        result = {
          status: "failed",
          reason: "No digest or statement was supplied.",
          keyReceived: false,
          privateContextReceived: false,
        };
      }
      publish(result);
      return compact(result);
    },
  });
}
