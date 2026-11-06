# Protected Namecheap review

Use this review stage to test the corrected design, policy pages and actual PHP
mail delivery before the final production deployment. The existing public site
stays in `public_html`; this review goes in its own `public_html/review` folder.

## Prepare the package

From `My-Portfolio`:

```powershell
python scripts/prepare_namecheap.py --review
```

Use the timestamped `abdulhakeemor-review-*.zip` identified in
`releases/latest-review.json`. This is different from a production ZIP, which
is identified in `releases/latest.json`. Review builds route form submissions
to `/review/contact.php`, keep native success/error links in that folder and
add noindex metadata. Canonical/search metadata still points to the intended
production domain. The generated `dist/` reflects the last build mode; use the
identified ZIP rather than assuming that folder is a production release.

Noindex does not provide privacy. Set password protection on the server.

## cPanel setup

1. In **File Manager → public_html**, create a folder named `review`.
2. Return to the main cPanel dashboard and open **Directory Privacy**.
3. Select `public_html/review`, choose **Edit**, enable **Password protect this
   directory**, enter a label and save. Create a review username and strong
   password in **Create User**. Keep these credentials private.
4. Open `https://abdulhakeemor.com/review/` in a private browser window. Confirm
   it asks for the review username/password before uploading the files. An empty
   folder may show another response after authentication; the important check
   here is that anonymous access is challenged.
5. Upload the review ZIP into **public_html/review** and extract it there. The
   directory should contain `index.html`, `contact.php`, `assets`, `en` and `ar`
   directly, without an extra `dist` or `review` nesting level.
6. The ZIP deliberately excludes `.htaccess`, so cPanel's authentication
   directives survive extraction. Do not overwrite or delete the protected
   folder's `.htaccess`. Production Apache redirect/cache/404 rules will need
   their own final-host acceptance checks; they are not being installed by this
   review ZIP.
7. Remove the uploaded ZIP from the server after extraction; retain the local
   release copy.
8. Open `https://abdulhakeemor.com/review/en/index.html`, authenticate and review.
   The matching Arabic URL is `/review/ar/index.html`.

Namecheap guide:
https://www.namecheap.com/support/knowledgebase/article.aspx/9767/29/how-to-password-protect-files-and-directories/

## Hosted checks

- Use mobile data/hotspot if Housing Wi-Fi continues to show a certificate error.
  Do not bypass a certificate warning to submit passwords or personal details.
- Check five projects, current design, English/Arabic navigation, both policies,
  footer links, the mobile menu and back-to-top button.
- Confirm PHP 8+ is selected in cPanel.
- Submit one English and one Arabic contact message. They should reach
  `abdulhakeemoladaporaji@gmail.com`, with replies directed to the visitor.
- Confirm success remains inside `/review/en/` or `/review/ar/`. Check Gmail
  Inbox and Spam; record receipt before considering delivery verified.
- In cPanel, check **Email Deliverability** for SPF/DKIM and **Track Delivery** if
  messages do not arrive. Never place mailbox credentials in the website code.
- Confirm a new unauthenticated private browser session is still prompted for
  the review credentials after extraction, including when opening a policy page
  or asset directly.

## Final deployment

For the new self-hosted likes and moderated comments, follow
[COMMENT_MODERATION.md](COMMENT_MODERATION.md). The nested moderation folder
needs its own private cPanel Directory Privacy user before you can approve comments.

Finish the remaining privacy/business review and live acceptance checks first.
Then build a fresh production ZIP without `--review`; its form action returns to
`/contact.php`, and production Apache rules are included. Do not extract a review
ZIP at the public site root. Keep the protected review credentials and folder
separate from production.
