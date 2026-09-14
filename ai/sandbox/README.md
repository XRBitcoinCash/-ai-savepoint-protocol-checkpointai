# XRBitcoinCash AI sandbox

This directory is for local, synthetic, reversible experiments only. It is not a production asset directory and must never be included in a deployed page or backend package.

## Allowed

- Fake XRPL accounts, transaction hashes, NFT IDs, and ledger responses.
- Deterministic fixtures, parser tests, accessibility checks, and UI previews.
- Reproduction of a reported failure without wallet secrets or real funds.

## Forbidden

- Seeds, private keys, passcodes, API secrets, environment values, personal data, or real signing payloads.
- Wallet authorization, transaction submission, fund movement, live backend mutation, or production credentials.
- Treating a simulated result as proof that a live wallet or deployment works.

## Experiment record

```text
Hypothesis:
Target file/function:
Fixture or synthetic input:
Expected result:
Observed result:
Checks run:
Cleanup or promotion decision:
```

Promote only the smallest reviewed patch after the relevant repository checks pass. Record the result in the parent savepoint document; do not paste a full conversation.
