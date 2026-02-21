KAROSH GROUP — Easy Editing (Phone + PC)

This version adds a safe editor dashboard (Decap CMS):
- Edit text + prices + images at: /admin
- Requires: GitHub repo + Netlify Identity enabled.

FILES
- index.html (renders the site)
- content/home.json (ALL editable content)
- admin/ (CMS dashboard)
- assets/uploads (uploaded images go here)

SETUP (one time)
1) Create GitHub account + new repo.
2) Upload ALL files in this folder to the repo.
3) In Netlify: Add new site -> Import from Git -> GitHub -> select repo.
4) In Netlify: Site settings -> Identity -> Enable Identity
5) Identity -> Services -> Enable Git Gateway
6) Identity -> Registration -> Invite only (recommended), then invite your email.
7) Open: https://YOURDOMAIN/admin

After that: edit + publish from phone or PC.

