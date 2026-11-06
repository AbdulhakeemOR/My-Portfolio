# One address for your admin tools

Once installed, remember **https://abdulhakeemor.com/admin/**.
It links to project tracking and comment moderation. Customer-specific private
links stay inside Project tracking and are not listed on this page.

## Upload and password setup

1. Upload `admin-home-update.zip` to **public_html** and extract it there.
   It adds only `admin/index.php`, `admin/index.html`, and `admin/hub.css`.
   Replace matching files if prompted; do not empty `public_html` first.
2. In **cPanel → Directory Privacy**, select **public_html/admin** and enable
   password protection. Give it the label **AOR Admin Home**.
3. Create a separate directory user named **aor-admin**, choosing a strong
   password. This password is not your cPanel account password.
4. Open **https://abdulhakeemor.com/admin/** in a private browser window and sign
   in with **aor-admin**. If your server doesn't open the folder index, use
   **https://abdulhakeemor.com/admin/index.php**.
5. Open each tool and use its existing credentials when prompted:

| Tool | Website path | Existing user |
| --- | --- | --- |
| Project tracking | `/tracking/admin/index.php` | `aor-project-admin` |
| Comment moderation (currently in review) | `/review/feedback-admin/index.php` | `aor-moderator` |

The moderation tool was verified under `/review/feedback-admin/`; its root-level
counterpart is not installed on the current host. The review folder's own
credentials may also be requested. Admin Home now separates website review,
updated public Services, and the public homepage. The homepage is still a
different deployment from the complete review copy.

If the full site is later promoted to the main domain, install and protect the
production moderation tool, then update its entry in Admin Home to
`/feedback-admin/index.php`. Moving the link alone does not install that tool.

Only the new **admin** folder needs new password protection. Keep the existing
protections on **tracking/admin** and **feedback-admin**. The parent
**public_html** and **tracking** folders must remain public so the website and
customer links work without owner sign-in.

The upload ZIP contains no `.htaccess`, `.htpasswd`, project records, sessions,
or database. It does not change existing passwords or project/comment data.
The new PHP page refuses access until cPanel verifies the `aor-admin` user, even
if someone guesses its URL. Use HTTPS. Close the private browser window when
finished; the browser manages Directory Privacy sign-in.

## If you forget the address

Open **cPanel → File Manager → public_html → admin → index.php**. The matching
website address is your domain followed by `/admin/index.php`. In Admin Home,
expand **Find these pages through cPanel** to see the paths for the other tools.
Use **Directory Privacy** in cPanel to reset a forgotten directory password.

Namecheap's Directory Privacy guide:
https://www.namecheap.com/support/knowledgebase/article.aspx/9767/29/how-to-password-protect-files-and-directories/

## Future tools

Add a new entry to `$tools` in `hosting/namecheap/admin-home/index.php`, then
rebuild/upload Admin Home. Every new tool still needs its own access protection.
The list is deliberately curated; it does not scan server files or disclose
unrelated directories. No public navigation link is added.

The page has been checked locally. Its live cPanel login and tool links need
confirmation after upload; no hosting credentials or passwords are stored here.
