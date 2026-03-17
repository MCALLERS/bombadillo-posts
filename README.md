# Blueprint Finance Contract Dashboard

Password-protected dashboard for viewing and managing contracts.

## Setup

### 1. Environment Variables

In Cloudflare Pages dashboard, set:

```
DASHBOARD_PASSWORD=your-secure-password-here
```

**How to set:**
1. Go to Cloudflare dashboard → Pages → bombadillo-posts
2. Settings → Environment variables
3. Add variable: `DASHBOARD_PASSWORD`
4. Redeploy (or it will auto-deploy on next commit)

If not set, defaults to `blueprint2026` (not recommended for production).

### 2. Access the Dashboard

**URL:** https://bombadillo-posts.pages.dev/dashboard-protected/

**Login:** Enter the password set in `DASHBOARD_PASSWORD`

## Development

Built with:
- React + TypeScript (dashboard app)
- Cloudflare Pages + Functions (backend)
- Static password authentication via session cookies

### API Endpoints

- `POST /api/auth/login` - Authenticate with password
- `GET /api/auth/check` - Check authentication status
- `POST /api/auth/logout` - Clear session
- `GET /api/contracts` - List contracts (mock data)
- `GET /api/contracts/:id` - Get contract details
- `PATCH /api/contracts/:id` - Update contract

**Note:** The React app has a build bug where it uses relative URLs like `port/5000/api/auth/*`. Proxy Functions handle this automatically.

## Security

- Session cookies (24-hour expiry)
- HttpOnly, Secure, SameSite=Strict
- Password validation on server-side
- No sensitive data in client code

---

Created with Perplexity Computer
