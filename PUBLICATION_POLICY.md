# Clisonix Public Interface and Protected Core Policy

**Policy ID:** CLX-PUB-001  
**Status:** Approved  
**Owner:** Clisonix  
**Applies to:** Clisonix, OS-CLX, UltraWebThinking, Kloud, Web8 Fabric, CWY, SDKs, packages, crates, documentation, examples, and release pipelines

## 1. Governing Principle

> We publish how the platform is used. We keep private the mechanisms that create its security, sovereignty, and technical advantage.

Clisonix is open at the integration boundary and protected at the mechanism boundary. Public artifacts must help developers build against stable interfaces without exposing privileged control paths, internal topology, hardware orchestration, security primitives, or protected runtime logic.

## 2. Objectives

This policy exists to:

- provide useful, stable, and verifiable developer interfaces;
- protect intellectual property and operational security;
- prevent accidental publication of internal services or control-plane code;
- keep public packages free of secrets, private infrastructure data, and privileged operations;
- make every publication decision repeatable and auditable.

## 3. Classification Model

### 3.1 PUBLIC — Approved for publication

The following may be published after the release gate in Section 7 passes:

- client SDKs and API clients;
- public type definitions and sanitized schemas;
- UI component libraries;
- restricted CLIs that expose only documented public operations;
- documentation, tutorials, examples, and integration templates;
- read-only health and availability models that do not reveal topology or host data;
- public protocol adapters that contain no protected implementation;
- compatibility wrappers around explicitly approved public APIs.

### 3.2 RESTRICTED — Requires security and architecture review

The following are not public by default:

- telemetry models that may reveal scheduling or topology;
- signal-processing packages shared with hardware paths;
- administrative API clients;
- deployment tooling and infrastructure templates;
- observability integrations that expose containers, hosts, ports, peers, or internal services;
- cross-repository shared packages whose contents have not been separated into public and private surfaces;
- wrappers around already-public low-level components when the wrapper would expose new protected behavior.

Restricted artifacts require written approval from the Clisonix architecture owner before publication.

### 3.3 PRIVATE — Publication prohibited

The following must remain private:

- kernel, minimal-kernel, boot, interrupt, scheduler, memory, and filesystem internals;
- hardware abstraction, device control, bare-metal orchestration, node agents, and SoC logic;
- Sovereign Fabric, Web8 mesh, routing, replication, trust-lane, and control-plane internals;
- OS-CLX runtime internals, cognitive scheduling, recovery logic, and protected audit-chain implementation;
- cryptographic implementation, capability primitives, identity internals, access-control rules, security policies, and threat-response logic;
- private model/runtime orchestration, protected memory engines, and internal reasoning mechanisms;
- credentials, tokens, keys, private endpoints, internal hostnames, infrastructure inventories, and production configuration;
- source or documentation that materially lowers the cost of bypassing a security boundary.

## 4. Public Package Boundary

A public package may expose:

- documented public endpoints;
- user-owned resource operations;
- sanitized health or availability results;
- stable request and response types;
- retry, timeout, authentication-header, and error-handling helpers;
- non-privileged developer utilities.

A public package must not expose:

- manual runtime synchronization or scheduler control;
- node, container, peer, process, or host inventory;
- internal ALBA, ALBI, JONA, NIN, MALI, NodeDB, or fabric metrics unless explicitly approved as a sanitized public contract;
- Docker, Kubernetes, bare-metal, or kernel administration;
- raw security decisions, cryptographic material, capability graphs, or policy rules;
- undocumented internal endpoints or privileged maintenance operations.

## 5. Repository Visibility and Package Privacy

Repository visibility and npm package privacy are separate controls.

- A repository may be public while its workspace root retains `"private": true`.
- Monorepo roots, applications, dashboards, deployment units, and integration tests should remain non-publishable.
- Only reviewed package directories may remove `"private": true`.
- Public npm packages must declare `publishConfig.access` as `public`.
- A public package must use the `@clisonix` scope unless an exception is approved.

## 6. Required Package Metadata

Every public npm package must include:

- a unique lowercase scoped name;
- a valid semantic version;
- an SPDX license and license file;
- accurate `repository`, `homepage`, and `bugs` links;
- explicit `files` allowlisting;
- correct `main`, `module`, `types`, and `exports` entries where applicable;
- supported runtime versions in `engines`;
- a README that documents the public security boundary;
- `publishConfig: { "access": "public" }`;
- provenance through the approved release workflow when available.

## 7. Publication Gate

No package may be published until all checks pass:

1. **Ownership:** the package belongs to the `@clisonix` npm scope.
2. **Classification:** every exported symbol is PUBLIC or explicitly approved RESTRICTED.
3. **Secret scan:** no credentials, tokens, private keys, internal URLs, or sensitive configuration are present.
4. **Boundary scan:** no kernel, hardware, fabric, runtime-internal, or security-primitive implementation is included.
5. **Metadata:** name, version, license, repository links, exports, and file allowlist are correct.
6. **Build:** the clean package build succeeds.
7. **Tests:** automated tests pass.
8. **Package inspection:** `npm pack --dry-run` contains only intended files.
9. **API review:** privileged or internal operations are absent from the public surface.
10. **Release approval:** the architecture owner approves the release candidate.

Failure of any check blocks publication.

## 8. Existing Public Artifacts

Previously published artifacts are treated as permanently disclosed. Removing or yanking a version may stop ordinary dependency resolution, but it does not make already-published source private.

For `clx-nanodecibel` and `clx-nodedb-fluid`:

- no new wrapper or expanded public surface is approved by default;
- future releases require classification review;
- protected successor implementations must use private modules and must not copy new private mechanisms into public history;
- any yank or deprecation action requires a separate explicit decision.

## 9. Exceptions

An exception must document:

- the exact artifact and version;
- the business or research purpose;
- the protected elements affected;
- the mitigation and rollback plan;
- the approving owner;
- the expiration or review date.

Silence, prior publication, or repository visibility is not approval.

## 10. Enforcement

Clisonix release workflows should enforce this policy with:

- protected package allowlists;
- secret and sensitive-path scanning;
- build, test, and package-content checks;
- npm scope validation;
- provenance and release attestations;
- manual approval for first releases and restricted packages.

This policy takes precedence over convenience, automatic workspace discovery, and bulk publication scripts.

