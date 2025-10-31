# AI Savepoint Protocol · Checkpoint TIA
**Doc ID:** xrbc/tia/2025-10-30-01  
**Scope:** XRBitcoinCash site and XRPL apps (XRBC, XRBitcoin)  
**Status:** Stable baseline  
**Last updated:** 2025-10-30

---

## 0) Machine profile (authoritative JSON for agents)
Agents must parse this first. This is the single source of truth.

```json
{
  "project": "XRBitcoinCash",
  "domains": {
    "site": "https://xrbitcoincash.com/",
    "repo_site": "XRBitcoinCash/xrbitcoincash.github.io",
    "repo_core": "XRBitcoinCash/xrbitcoincash-core",
    "repo_savepoints": "XRBitcoinCash/-ai-savepoint-protocol-checkpointai"
  },
  "xrbc": {
    "issuer": "rEjwniYhYR5QDZzK1a1x2359j8j8N43Ypw",
    "currency_hex": "5852626974636F696E6361736800000000000000",
    "proxy_url": "https://xrbitcoincash-github-io.onrender.com",
    "home": "https://xrbitcoincash.com/",
    "flows": { "desktop": "qr_only", "mobile": "xaman_deeplink" },
    "no_placeholders": true
  },
  "xrbitcoin": {
    "issuer": "rGQaHbQHCsTLQtboQPwUBasXjLvk8uDbpT",
    "currency_hex": "5852626974636F696E0000000000000000000000",
    "home": "https://xrbitcoincash.com/XRBitcoin/"
  },
  "xrpl": {
    "xrp_to_drops": 1000000,
    "endpoints_allowed": [
      "https://xrbitcoincash-github-io.onrender.com",
      "https://s1.ripple.com",
      "https://xrplcluster.com",
      "https://xrpl.ws"
    ]
  },
  "security": {
    "portal_path": "/security-portal.html",
    "referrer_policy": "no-referrer",
    "frame_ancestors": "none",
    "target_blank_policy": "noopener_noreferrer",
    "dom_write_policy": "textContent_or_escapeHTML",
    "third_party_js": "sri_or_self_hosted",
    "well_known_rule": "single_root_only"
  },
  "diagnostics": {
    "health": "https://xrbitcoincash.com/ai/ai/health.html",
    "price": "https://xrbitcoincash.com/ai/ai/ai/price.html"
  },
  "build_rules": {
    "single_html": true,
    "single_js": true,
    "config_tag_order": "app-config_before_main_script",
    "no_network_changes_without_request": true,
    "case_sensitive_paths": true
  }
}
1) Repository policy


Public: xrbitcoincash.github.io for user-facing site, SEO, AI discovery.


Private: xrbitcoincash-core for internal scripts.


Public as needed: XRBitcoin, JCS-token-on-the-XRPL.


Never commit secrets, API keys, wallet seeds, or env values.


2) Security baseline (single-file workaround)


Entry: /security-portal.html?page=/trade.html or other target page.


Portal sets top-level CSP and no-referrer.


Iframe sandbox: allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation.


Inside same-origin frames, harden target="_blank" to rel="noopener noreferrer".


3) DOM writing rules


Default: node.textContent.


If dynamic markup is required: escape then set innerHTML.


Do not inject ledger/user strings into innerHTML.


Helper:
function escapeHTML(s){
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

4) Wallet flows


Desktop: QR only. No desktop signing.


Mobile: Xaman deep-link intent.


States: connected, canceled, timed out, not installed.


5) Trading UX rules


Trustline gating via account_lines. Block buys if missing.


Default limit orders. AMM path explicit when enabled.


Validate numbers, balances, and reserve buffer.


Disable submit during async. Clear status before/after submit.


Refresh order book on success.


6) Performance and resilience


Poll every 10–15 s with one in-flight request.


Timeout ≈ 10 s via AbortController. Retry once on transient error.


Pause polling when tab hidden.


7) Accessibility


Use aria-live="polite" or role="status" for dynamic text.


Keyboard reachable.


Sufficient contrast in both themes.


8) SEO and AI discoverability


Keep /robots.txt and /sitemap.xml accurate.


Keep /.well-known/security.txt once. Remove nested duplicates.


Keep /.well-known/ai.json once and link from a main page.


Add JSON-LD where relevant.


JSON-LD templates
WebApplication
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"XRBitcoinCash Trading Tools","url":"https://xrbitcoincash.com/","applicationCategory":"FinanceApplication","operatingSystem":"Web","featureList":["XRPL limit order placement","Order book view","AMM price helper"]}
</script>

TechArticle
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"TechArticle","headline":"XRBitcoinCash · Trading and Security Guide","proficiencyLevel":"Beginner","url":"https://xrbitcoincash.com/whitepaper.html"}
</script>

9) Page architecture


Single HTML + single JS per page.


<script id="app-config"> immediately before the main script include.


No extra <script> tags. Preserve filename case.


10) Diagnostics and pre-commit checks


Open /ai/ai/health.html.


Verify server_state, book_offers, amm_info when diag exists.


Console-parse #app-config.


Manual GET of Trade.html with exact casing.


11) Commits and PRs
Short
feat|fix|docs|security|chore(scope): action · key artifact

Expanded
Context: <one line>
Changes:
- <bullet>
Impact:
- <effect>
Notes:
- no network changes
- no secrets

PR checklist


 No secrets added


 Proxy unchanged (https://xrbitcoincash-github-io.onrender.com)


 Desktop QR-only intact


 Mobile deep-link intact


 Portal used if relevant


 target="_blank" hardened


 No unsafe innerHTML


 Health/diag pass


12) Savepoints
Format
### [SAVEPOINT-YYYY-MM-DD] <title>
Context: <1–2 lines>
Changes:
- <facts, constants, URLs, UX rules>
Impact:
- <what to do differently>
TODO:
- <optional>

Current baseline
[SAVEPOINT-2025-10-30] Security Baseline v1


/security-portal.html entry, link hardening, DOM policy.


[SAVEPOINT-2025-10-30] XRBC connectivity constants


Issuer, currency hex, proxy set. No networking changes without request.


[SAVEPOINT-2025-10-30] Diagnostics references


Health and price helper URLs defined.


13) Legal


No secrets, keys, or wallet seeds in code or history.


Public content follows repo LICENSE.


This document contains no sensitive data.



Commit message:
- Short: `docs(ai): add AI Savepoint Protocol (Checkpoint TIA)`
