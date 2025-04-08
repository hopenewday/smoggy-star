# Security Overview

## CSRF Protection
- All POST, PUT, DELETE API requests require a valid CSRF token.
- Token is stored in cookies and sent via `x-csrf-token` header.
- Invalid tokens result in 403 Forbidden.

## Bot Management
- Known bad bots and scrapers are blocked based on User-Agent.
- Allowlist includes major search engine bots.
- Logs all denied requests.

## Authentication
- Use secure, HttpOnly cookies or JWTs.
- Implement OAuth2 or similar for user login.
- Enforce strong password policies.

## Event Logging
- Log failed login attempts, invalid CSRF, and blocked bots.
- Review logs regularly for suspicious activity.

## Additional Recommendations
- Use HTTPS everywhere.
- Set secure headers (CSP, HSTS, X-Frame-Options).
- Keep dependencies updated.
- Regularly audit code and dependencies for vulnerabilities.