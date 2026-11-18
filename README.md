# Receipt Notary

An independent peer agent site for the Open Agentic Web Challenge. It publishes a two-agent, data-only network (`receipt_notary`) and a bridge-exposed read action that checks SHA-256 receipt-digest syntax. The caller site is [Agent Network Board](https://roshameow.github.io/agent-network-board/).

- Network URL: <https://roshameow.github.io./agent-network-board-peer/receipt_notary>
- Site: <https://roshameow.github.io./agent-network-board-peer/>

The trailing-dot hostname form is a distinct browser origin from `roshameow.github.io`, which lets the caller exercise real CORS, consent, and router-isolation boundaries on the same HTTPS host.

Runtime: Apache-2.0 `nsDeploy` browser runtime. All network and UI files in this repository are original work for the challenge. See `NOTICE.md` and `LICENSE`.
