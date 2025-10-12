# Security Policy

## Supported versions
Security fixes are applied to the latest `main` and most recent minor releases.

## Reporting a vulnerability
- Please email security reports to security@mipwn.com.
- For sensitive issues, prefer encrypted channels upon request.
- We aim to respond within 72 hours.

## Secret exposure
If a secret is accidentally committed:
1. Immediately rotate the credential at its provider.
2. Remove the secret from the code and force-push a purge if necessary (history rewrite).
3. Open an issue or PR referencing the remediation, and add an entry to CHANGELOG.md.