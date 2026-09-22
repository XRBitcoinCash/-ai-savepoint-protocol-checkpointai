# XRBitcoin Wallet + Preview Control Repair — 2026-09-22

Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`.

Implementation commit: `ab7f5dbd401e93e7bcffc7bd87669625ef14d097`.

Pipeline: `2870912971` — success. Runtime contracts, repository validation, secret detection, Semgrep SAST, and Pages deployment all passed.

## User-visible failure

After the prior CSP/runtime repair, live XRB/XRP pool data and pool activity were working again, but wallet-dependent controls still felt frozen:
- the sidebar **Wallet** control was only an anchor to the wallet card, not an actual Xaman connection action;
- **Preview deposit** remained disabled while disconnected, giving no actionable route from the button itself;
- XRBitcoin used the generic `busy` state for connection rather than the dedicated `connecting` state used by the working XRBC liquidity reference.

This made the page look partially functional while the two controls needed to enter the signing workflow did not behave as expected.

## Repair

The XRBitcoin workspace now uses a dedicated `connecting` state, matching the established XRBC connection lifecycle.

The sidebar control is now `#walletShortcut` and is a real deliberate-user-gesture Xaman entry point:
- disconnected: **Connect wallet** opens Xaman authorization;
- connecting: shows **Connecting…**;
- connected: shows **Wallet connected** and scrolls to the wallet panel instead of starting another authorization.

The main `#connectBtn` remains the primary wallet-card control and uses the same authorization path.

The Preview button is no longer a dead disabled control merely because the wallet is disconnected. When the page is otherwise eligible:
- disconnected: it says **Connect Xaman to preview deposit** (or the equivalent current action);
- clicking it starts authorization only;
- no AMM/trade/trustline transaction request is created during connection;
- after authorization, the user deliberately clicks Preview again to build the unsigned preview.

Connection state is separate from transaction `busy` state. The liquidity fields can remain usable while browser authorization is settling, while duplicate authorization is still blocked.

XRBitcoin continues to use its own Xaman public application key:
`9f853ecf-d95f-4e03-8591-e41f91b9f3c5`.

The XRBitcoinCash Xaman application key must not be substituted.

The modified `liquidity-app` CSP SHA-256 is:
`VprOSm7qog4+YxqN6Tczr0mXYMh5FiRJ6a6jDnRqgsk=`.

Runtime-contract coverage now requires `walletShortcut`, `connectBtn`, `previewBtn`, `signBtn`, `refreshPool`, and `themeToggle` on `xrbitcoin-links.html`, and proves each required control is referenced by executable inline JavaScript.

Current page evidence:
- blob: `bb9332e25a7ae57bf7c458bee80d4cb6895bfa52`
- SHA-256: `b29641ac3f691cd7cd4fadb5f99eb253b1ca10372410e6374283df73ef284fbf`

## Preserve

- Wallet connection is authorization only.
- No automatic replacement authorization.
- No signing payload is created by Connect Wallet or by the disconnected Preview gateway.
- Exact XRB/XRP asset identity and validated pool reads remain unchanged.
- Existing pending/ambiguous signing-request protections remain unchanged.
- Final transaction success still requires validated XRPL evidence and the existing critical-field checks.
