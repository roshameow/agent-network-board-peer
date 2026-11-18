import { boot } from "./vendor/nsdeploy/runtime/index.js";

window.addEventListener("anb:peer-state", (event) => {
  document.querySelector("#action-result").textContent = JSON.stringify(event.detail, null, 2);
});

boot("#agent-app", { originUrl: location.origin })
  .then(({ engine }) => {
    const keyActive = !!engine.byokKey && engine.byokKey !== "demo";
    document.querySelector("#status").textContent = keyActive
      ? `BYOK router active: ${engine.userRouter?.baseUrl || "visitor selected"}`
      : "Keyless deterministic browser router active. Add BYOK in settings to use a real provider.";
  })
  .catch((error) => {
    document.querySelector("#status").textContent = `Runtime failed to load: ${error?.message || error}`;
  });
