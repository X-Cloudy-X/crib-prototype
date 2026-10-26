# CRiB Prototype

Static browser prototype for **CRiB — Cloud Resource Integration Bridge**.

This repository demonstrates the intended end-to-end user experience without real provider APIs, OAuth, a backend, or a database.

## Prototype flow

Landing → Sign in / Sign up → Empty dashboard → Provider selection → Simulated authorization → Connected dashboard → File browser → Folder → Search → File details

Supporting states include provider management, disconnect, connection error, loading, and no-results.

## Technology

- HTML5
- CSS
- Vanilla JavaScript
- No framework
- No build step
- No package manager

## Demo data

All identity information is fictional and generic:

- Name: `User`
- Email: `user@example.com`
- Avatar: `U`

## Run locally

Open `index.html` directly, or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

A Pages workflow is included in `.github/workflows/pages.yml`.

If Pages is not already enabled for this repository, choose **Settings → Pages → Build and deployment → GitHub Actions** once. After that, every push to `main` deploys automatically.

## Portability

The prototype uses only relative paths and contains no secrets, environment variables, or account-specific configuration. It can be copied or merged into another repository later without modification.
