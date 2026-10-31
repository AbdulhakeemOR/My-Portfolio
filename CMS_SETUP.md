# Project CMS Setup

The editor is Decap CMS. Project data lives in `content/projects.json`, article data in `content/articles.json`, and uploaded media in `assets/uploads/`. Editors use `/admin/` and do not edit the HTML or JSON directly.

The CMS now uses the GitHub backend for repository `AbdulhakeemOR/My-Portfolio`. Authentication is handled through Netlify OAuth. The public website and local JSON editing work independently of CMS login.

References:

- https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/
- https://decapcms.org/docs/github-backend/

## One-Time Setup

1. Create a GitHub account if needed, then create an empty repository for the portfolio. A private repository is fine after Netlify is authorized to access it.
2. Install GitHub Desktop and sign in. Choose **File > Clone repository**, select the new repository, and clone it to your computer.
3. In File Explorer, copy this website's files and folders into the cloned repository. Keep the existing structure, especially `admin/`, `assets/`, and `content/`.
4. In GitHub Desktop, enter a summary such as `Add portfolio site`, choose **Commit to main**, then **Push origin**. The CMS config currently uses the `main` branch.
5. Create a Netlify account. Choose **Add new site > Import an existing project**, connect GitHub, and select the portfolio repository.
6. Use the build settings in `netlify.toml`: build command `python scripts/sync_content.py`, publish directory `.`. This refreshes the shared navigation and HTML content copies before deployment.
7. Configure Decap's supported repository backend and authentication using the official backend guide above. A GitHub backend needs your real repository name and a configured OAuth service; do not place client secrets in this project.
8. Update the `backend` block in `admin/config.yml` with those actual settings. The current Git Gateway block is a legacy configuration, not a completed login setup for a new site.
9. After deployment finishes, visit `https://YOUR-SITE.netlify.app/admin/`, sign in, and open **Projects** or **Articles**. The initial project and article previews are already loaded.

GitHub Desktop supplies the Git interface, so normal project updates will not require command-line commands or editing code. GitHub rejects individual files larger than 100 MB; keep large video files in a media host and enter their public URL in the project link field instead.

## Add Or Edit A Project

1. Visit `/admin/`, sign in, and open **Projects > Project library**.
2. Choose **New Project** to add an item, or select a project to edit it.
3. Enter a title, unique permanent link name (slug), and short description. Choose its main category, filter categories, and status.
4. Upload a cover image, or upload a video. The CMS places uploaded files in `assets/uploads/` automatically.
5. Add useful alt text, choose whether the image fits inside its preview or fills it, and add a video preview image when needed. Add your actual brief, role, process, and outcome to the case-study fields. You can also add a tool or project link and turn on **Feature on homepage**.
6. Save/publish the project. Decap commits the content and uploaded media to GitHub; Netlify then deploys the update. Wait for the deploy to finish before checking the live site.

## Add Or Edit An Article

1. In `/admin/`, open **Articles > Article library** and choose **New Article**, or select an existing article.
2. Add the title, unique permanent link name (slug), short summary, category, and publish date. Upload a cover image and write its image description for accessibility.
3. Write the article in the **Article text** field. Use a blank line between paragraphs, `## Heading` for sections, `### Heading` for subsections, and `- Item` on separate lines for bullet lists. You do not need HTML.
4. Turn on **Article ready to read** when the full text is complete. Empty or unpublished articles show **Coming soon**. Turn on **Feature on homepage** to include the preview there.
5. Save/publish. The Articles page displays the summary and a **Read article** disclosure for the full text; Netlify deploys the updated content after the commit.

## Notes

- The editor's authentication depends on the backend you configure. The existing Git Gateway configuration requires its own hosting services and is deprecated for new configurations.
- Changes made in the CMS are versioned in GitHub and can be reverted there.
- The CMS login becomes usable after the hosting and authentication setup above. Give editor access only to the intended accounts.
- Contact form delivery uses Netlify Forms after form detection is enabled and the site is deployed. Configure email notifications and test delivery in the Netlify dashboard. Local previews open an email application instead.
- Keep slugs unchanged after sharing project or article links.
- If you edit JSON locally, run `python scripts/sync_content.py` to refresh the HTML copies. Netlify runs this during deployment.
- Shared navigation and footer markup live in `templates/header.html` and `templates/footer.html`.
- See `README.md` for preview instructions, publishing checks, and production URL setup.
