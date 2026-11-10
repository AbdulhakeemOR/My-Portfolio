# Publish abdulhakeemor.com

For the password-protected hosted test stage, follow
[HOSTED_REVIEW.md](HOSTED_REVIEW.md) and build with `--review`. That package belongs
only in `public_html/review`; the instructions below cover the final root deployment.

The corrected package is ready for hosted testing. Media approval is recorded.
Public launch still needs privacy/business-policy decisions and live acceptance
checks; see `CORRECTIONS_STATUS.md`. Use the verified release in
`releases/latest.json`, not an earlier ZIP.

Build a fresh package after making local changes:

```powershell
python scripts/prepare_namecheap.py
```

Upload the newly generated timestamped `abdulhakeemor-namecheap-*.zip` from
`releases/`, which contains public files at its root. `releases/latest.json`
identifies the newest build, not necessarily what is currently deployed.
Each release has a SHA-256 checksum and a file manifest. Keep the ZIP from the
last known-good deployment for recovery. Review any removed-file list manually:
extracting a ZIP does not remove obsolete server files. No files are deleted
from the server by the build script.
Private source media, audit files, Python scripts, and the Netlify CMS are excluded.
The Netlify build command remains available separately. This package uses PHP
for contact messages and canonical links for https://abdulhakeemor.com.

## cPanel setup

1. Confirm cPanel **Domains** lists `abdulhakeemor.com` with `public_html` as its
   document root. Use the listed document root if different.
2. Under **Email Accounts**, create `website@abdulhakeemor.com` and open its
   **Connect Devices** page. Copy the outgoing SMTP host, port, username and
   encryption type into a private `aor-private/config.php` file beside
   `public_html`, using `hosting/namecheap/private/config.example.php` as the
   template. Never place this password in `public_html`, Git, a ZIP release or chat.
   Messages notify `contact@abdulhakeemor.com`, with the
   visitor as Reply-To.
3. Under **Email Deliverability**, confirm SPF and DKIM. Add and verify a DMARC
   record through the domain DNS controls before treating delivery as ready.
4. Confirm the domain and `www` have a valid installed SSL certificate before
   uploading: the package redirects visitors to HTTPS and the non-www domain.
5. Use PHP 8 or newer in cPanel's PHP selector.
6. In **File Manager → public_html**, upload the ZIP and extract it there.
   `index.html`, `contact.php`, `.htaccess`, `assets/`, `en/`, and `ar/` should be
   directly in that folder, without a surrounding `dist` folder.
7. Turn on **Settings → Show Hidden Files** to confirm `.htaccess` extracted.
   If an existing `.htaccess` is present, download a backup and review it before
   replacing it. Leave `cgi-bin`, `nc_assets`, and `parking-page.shtml` in place.
8. Delete the uploaded ZIP from the server after extraction. Keep the local ZIP.

## Live checks

- Open https://abdulhakeemor.com, English and Arabic pages, project galleries,
  media, and a nonexistent URL (which should show the 404 page).
- Check that HTTP and www redirect to https://abdulhakeemor.com.
- Submit a real contact message and confirm the owner notification at contact@abdulhakeemor.com and
  the acknowledgement at the customer's address, including Spam. A submitted
  status means the enquiry was saved even if SMTP later needs investigation.
- If delivery fails, inspect cPanel **Track Delivery** and **Email Deliverability**.
  Keep the direct email link available. Do not regard mail delivery as verified
  until the message is received.

JavaScript submissions request JSON and navigate to the same language's thank-you
page only after explicit success. Without JavaScript, PHP redirects to the language
submitted by the form. Error responses retain a copyable draft on a localized page.

The handler validates fields, rejects a filled honeypot and foreign browser
origins, and limits each client IP to five attempts per hour. It stores only
hashed IPs, counters, and expiry times in one temporary file outside the website.
Cloudflare Turnstile is supported but remains disabled while either key is empty
in the private configuration. Enable it only after both keys are installed.

Schedule daily cPanel backups of the private `aor-projects` folder and, once
file uploads are enabled, its uploads directory. Keep at least one copy outside
the hosting account and periodically verify that it can be restored.

The Decap editor is excluded because its current OAuth and automatic publishing
depend on Netlify. For this setup, edit locally, rebuild, and upload the new ZIP.
No Namecheap credentials are stored in the project.

References:

- https://www.namecheap.com/support/knowledgebase/article/10038/31/how-to-configure-a-contact-form-with-us/
- https://www.namecheap.com/support/knowledgebase/article.aspx/177/27/shared-hosting-getting-started/
- https://github.com/PHPMailer/PHPMailer
