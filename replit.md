# Karosh Group — Static Website

A multilingual photography studio website for Karosh Group, supporting Kurdish, Arabic, and English.

## Project Structure

- `index.html` — Language selection landing page
- `ku/index.html` — Kurdish version of the site
- `ar/index.html` — Arabic version of the site
- `en/index.html` — English version of the site
- `albums/` — Individual album pages (wedding, family, newborn, etc.)
- `content/home.json` — Editable content data
- `admin/` — Decap CMS dashboard for content editing
- `images/uploads/` — Uploaded images
- `styles.css` — Main stylesheet

## Running the App

The site is served as a static website using Python's built-in HTTP server:

```
python3 -m http.server 5000 --bind 0.0.0.0
```

Runs on port 5000 (webview).

## Deployment

Configured as a **static** deployment with `publicDir: "."`.
