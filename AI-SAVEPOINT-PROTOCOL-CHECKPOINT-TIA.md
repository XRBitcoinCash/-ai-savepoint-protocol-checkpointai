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
