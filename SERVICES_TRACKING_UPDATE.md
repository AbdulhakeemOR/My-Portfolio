# Services and tracking integration

The approved services presentation is integrated into the maintained checkout:
`services.html`, its English/Arabic versions, and the matching contact options.
The active `AOR/services.html` working copy also contains the new design.

The implementation uses native HTML/CSS/JavaScript, preserving the existing
navigation, footer, themes, language switching, policy links, and no-JavaScript
service/quote content. It includes the floating interactive logo, scroll panels,
expandable service prices, PayPal note, and the original process stepper.
Images remain deferred. No React runtime or npm build is required for this site.

## Recommended upload to the existing site

1. Back up the existing site and the private `aor-projects` folder in cPanel.
2. Upload `AOR/services-tracking-update.zip` to `public_html` and extract it
   **directly there**, replacing the listed files. Delete the uploaded ZIP.
3. Do not delete the existing website, private project records, or
   `tracking/admin/.htaccess`. The update ZIP contains no `.htaccess`, `.htpasswd`,
   project JSON, preview router, or session records. Your admin password and
   live projects remain on the hosting account.
4. Keep Directory Privacy enabled only for `public_html/tracking/admin`.
   The parent `public_html` and `tracking` folder must stay public.
5. Hard-refresh the English and Arabic services pages. Check the logo, scrolling
   panels, price disclosures, process tabs, language switch, and both themes.
6. Follow all three quote buttons and confirm the correct service is selected.
7. Sign in to tracking admin, confirm the existing test project still appears,
   and test a saved update using that project's customer link.

The upload is an update for the existing site, not a complete replacement. The
dependency check includes the matching shared styles, scripts, icons, fonts,
and assets referenced by the updated pages, even if the live site's shared
design files are older than this checkout.
A fresh full release is also recorded in `releases/latest.json` for future rebuilds.
That full release contains the root hosting `.htaccess`; prefer the focused
update ZIP above when applying these changes to the already configured host.

## Rebuilding

Run from `My-Portfolio`:

```powershell
python scripts/prepare_namecheap.py
python scripts/prepare_services_update.py
```

Tracking application source lives in `hosting/namecheap/tracking`. Never copy
live records into that folder. The shared date picker is in `assets/css/date-picker.css`
and `assets/js/date-picker.js`; its matching distribution copies live in
`hosting/namecheap/tracking/ui`. Keep those copies together when changing it.

Customer links remain private and account-free; no public list of project links
or admin links is added to the services page. Share a project's link directly
with its customer. The admin remains English; the public services and contact
pages support English and Arabic.
