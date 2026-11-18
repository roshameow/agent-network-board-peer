import { boot } from "./vendor/nsdeploy/runtime/index.js";

window.addEventListener("anb:peer-state", (event) => {
  document.querySelector("#action-result").textContent = JSON.stringify(event.detail, null, 2);
});

const basePath = location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
const siteBase = `${location.origin}${basePath}`;
const sandboxWorkerUrl = new URL("./vendor/nsdeploy/runtime/sandbox-worker.js", location.href).href;

boot("#agent-app", { originUrl: siteBase, sandboxWorkerUrl })
  .then(({ engine }) => {
    const keyActive = !!engine.byokKey && engine.byokKey !== "demo";
    document.querySelector("#status").textContent = keyActive
      ? `BYOK router active: ${engine.userRouter?.baseUrl || "visitor selected"}`
      : "Keyless deterministic browser router active. Add BYOK in settings to use a real provider.";
  })
  .catch((error) => {
    document.querySelector("#status").textContent = `Runtime failed to load: ${error?.message || error}`;
  });
