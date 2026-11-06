# Namecheap article conversations

Likes and comments share article records across English and Arabic. Every new comment is pending until approved. No email address is collected from commenters. There are no automatic moderator email notifications; check the dashboard regularly.

## Install in the protected review

1. Upload the latest **review** ZIP into `public_html/review`, then extract there. Allow updated website files to replace the old files. The archive contains no `.htaccess`, so existing review password protection survives.
2. In cPanel **Select PHP Version**, use PHP 8 or newer and enable **pdo_sqlite** if it is not enabled.
3. In cPanel **Directory Privacy**, open `public_html/review/feedback-admin`. Enable password protection and save. Create a separate user with the exact username **aor-moderator** and a strong password. Keep this password to yourself; reviewers must use only the review-folder credentials.
4. Open `https://abdulhakeemor.com/review/feedback-admin/` and sign in as **aor-moderator**. If the browser keeps sending the review username, close all private windows and open a fresh private session, or use a separate browser for moderation. A 403 saying moderation is locked means the authenticated username is not yet the moderator.
5. Submit a comment from an article in one browser. In another browser it must remain invisible. Approve it in the dashboard, reload the article and check both languages. Test Like and unlike, and deletion of your own comment.

Do not share the moderator password or put it in source files. The PHP dashboard rejects access unless the web server reports the authenticated moderator username. Public review credentials alone do not grant moderation access.

## Daily use and storage

Use **Pending** to approve or delete new comments, and **Approved** to remove published comments. Visitor text is displayed as text, never executed as HTML. Submission limits are five comments and sixty like actions per hour per connection IP. People on a shared network share that limit.

The hosting account automatically creates `/home/abdufjzc/.aor-feedback/` outside `public_html`. It contains separate `review.sqlite` and `production.sqlite` files. Keep this private folder in account backups; never upload it into the public website. Deploying site files leaves these databases intact. Review reactions and comments are not copied into production.

The functional browser cookie lasts up to 30 days. Losing it means a visitor cannot use the original-browser delete control; they can still request removal by email. Approved comments remain until removed. Old pending comments are removed after 30 days when the next write or moderation visit triggers cleanup. Expired rate-limit records are cleared on subsequent writes. Like counts represent browsers, not verified people, and can be inflated by cleared cookies.

## Production later

Build and upload a separate production package when ready. Independently protect `public_html/feedback-admin` with Directory Privacy and the private **aor-moderator** account. Verify moderation and privacy from another browser before inviting public comments. Keep review-folder authentication in place.

Local Python preview serves static pages only. Test these PHP features on Namecheap or the real PHP test fixture, not the Python preview server.
