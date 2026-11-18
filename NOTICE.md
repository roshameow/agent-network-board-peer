# Notices

This project includes the browser runtime from [cognizant-ai-lab/nsdeploy](https://github.com/cognizant-ai-lab/nsdeploy), licensed under the Apache License, Version 2.0. The runtime files are under `vendor/nsdeploy/runtime/` and the upstream license is included at `vendor/nsdeploy/LICENSE.txt`.

Local modification: `vendor/nsdeploy/runtime/runner.js` was changed to expose registered site actions whose `effect` is `read` as ordinary function tools, filtered by an optional `x_anb_actions` list on each agent definition. Write and irreversible actions remain behind the upstream confirmation path. The modification is marked in the source.

All other agent network definitions, public artifacts, board UI, site actions, peer network, tests, and documentation in this repository were created for the Open Agentic Web Challenge by this participant.

The deterministic browser router is a keyless inference adapter for reproducible demonstration. It is not a language model and does not generate fictional tool results; it selects declared tools and passes real tool outputs back through the runtime.
