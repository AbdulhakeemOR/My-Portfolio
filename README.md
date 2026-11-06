# AOR Portfolio

Seven public website demos are prepared under `demos/` and listed under the
Projects page's Websites filter. See [WEBSITE_DEMOS_SETUP.md](WEBSITE_DEMOS_SETUP.md)
for preview links, deployment, and maintenance instructions.

Owner tools are gathered at `/admin/`. See [ADMIN_HOME_SETUP.md](ADMIN_HOME_SETUP.md)
for the small upload package and its cPanel password setup.

The approved services design and account-free project tracker are integrated.
Use [SERVICES_TRACKING_UPDATE.md](SERVICES_TRACKING_UPDATE.md) for the focused
update ZIP and deployment instructions that preserve live records and admin
password settings.

For Namecheap Stellar Plus and `abdulhakeemor.com`, follow [NAMECHEAP_SETUP.md](NAMECHEAP_SETUP.md).
From this folder, build the upload ZIP with `python scripts/prepare_namecheap.py`.

**Launch corrections are in progress.** See [CORRECTIONS_STATUS.md](CORRECTIONS_STATUS.md) for completed code fixes and owner inputs. Owner approval of the media is recorded in [MEDIA_REVIEW_PENDING.md](MEDIA_REVIEW_PENDING.md). Use the newest verified release identified in `releases/latest.json`; older ZIPs do not contain all corrections.

This is my portfolio website for communication, creative design, research, and digital services.

## Preview the website

For everyday editing, open this project folder in VS Code, open the root `index.html`, and select **Go Live** in the status bar (or right-click the file and choose **Open with Live Server**).

- Home: `http://127.0.0.1:5500/index.html`
- English: `http://127.0.0.1:5500/en/index.html`
- Arabic: `http://127.0.0.1:5500/ar/index.html`

Live Server refreshes the browser when you save. Edit the root HTML files, shared templates, stylesheet, and content sources. After editing templates, JSON content, or translations, regenerate the language pages:

```powershell
python scripts/sync_content.py
```

The `en/` and `ar/` pages are generated; changes made directly in those folders are replaced by the next sync. Local contact-form submissions open an email draft for review and sending.

Local preview works independently of GitHub and Netlify. To disconnect automatic Netlify deployments, use **Project configuration → Developer settings → Continuous deployment → Repository → Manage repository → Unlink the current repository** in Netlify. Deleting local hosting configuration does not disconnect that integration.

To preview the public deployment package instead, run:

```powershell
python scripts/build_site.py
python -m http.server 8000 --directory dist
```

Open `http://localhost:8000` in your browser. This serves the public deployment package, excluding private originals and audit files.

## Where to make changes

The About page's Courses & Training section uses interactive glass folders. Open a category to browse individual courses in a stacked card carousel. Drag/swipe or use the previous/next buttons and arrow keys; press Escape to close the folder. Each card preserves the certificate links, issuer, dates, hours, and any programme modules. Course records are maintained in `content/courses.json` and regenerated with `python scripts/sync_content.py`. The Live Server implementation is in `assets/js/course-folders.js`, `assets/js/course-carousel.js`, and `assets/css/course-folders.css`. Original React references and optional migration notes are preserved in `components/ui/`.

| What I want to change | Where to edit |
| --- | --- |
| Homepage introduction and service previews | `index.html` |
| Project descriptions and case-study details | `content/projects.json` |
| Article summaries and full text | `content/articles.json` |
| Service descriptions and process | `services.html` |
| Experience, education, skills, and learning | `about.html` |
| Contact fields and contact information | `contact.html` |
| Navigation on every page | `templates/header.html` |
| Footer on every page | `templates/footer.html` |
| Social profile URLs in the footer and Contact page | `templates/social-links.html` |
| Colours, spacing, cards, and responsive layouts | `index.css` |
| Menus, themes, filters, and form behavior | `index.js` |

After changing JSON content, the shared header, or the shared footer, run:

```powershell
python scripts/sync_content.py
```

This updates the HTML copies for visitors without JavaScript and for previews opened directly from a file. Keep the generated HTML readable, with two spaces per level and blank lines between sections.

Netlify runs the content sync as part of `python scripts/build_site.py` during deployment.

The homepage hero is a static introduction with links to the featured projects and contact form. The featured projects section displays up to six projects, in catalog order.

Content is maintained directly in the repository; no CMS editor or CMS authentication is included. Add projects to `content/projects.json` and articles to `content/articles.json`. Put new public media in `assets/uploads/` and reference it from those entries. Keep private originals outside the public assets folders. Build locally to review the result, then commit and push the content and media together.

## Finish the content

- Add your actual role, process, and lessons to each project's case-study fields. Blank fields stay out of the page.
- Edit each article in its `body` field, with a blank line between paragraphs. Use `## Heading` for sections, `### Heading` for subsections, and `- Item` on separate lines for bullet lists. Set `published` to `true` when it is ready. Empty or unpublished articles show **Coming soon**.
- Keep project and article slugs unique. Avoid changing them after sharing a link.
- Edit social profile URLs in `templates/social-links.html`, then run the content sync command to update the footer and Contact page together.
- Add a CV download and a portrait when those files are ready. No placeholder CV or portrait is included.
- English and Arabic versions are available through the header language links. Keep Arabic translations up to date when changing English content.

## Images and videos

The scholarship student services graduation campaign uses public media in `assets/images/scholarship-student-services-campaign/` and `assets/videos/scholarship-student-services-campaign/`. Its original uploads are archived under `admin/project-originals/scholarship-student-services-campaign/`. Keep the approval/not-implemented status when updating its portfolio entry. The homepage project section displays up to six featured projects, in their catalog order. The Projects page displays the full catalog.

Smaller web images are in `assets/images/`. The original files remain in the project folder.

The portfolio preview is an actual screenshot of this website. Replace it when the design changes substantially.

Videos use preview images and `preload="none"`. Public copies are in `assets/videos/`; original files are preserved outside the deployment package. The student-portal walkthrough is re-encoded with permanent privacy masks. Other reviewed videos retain their original picture/audio streams with source metadata removed.

## Website walkthrough projects

Signal Studio, Clearcopy Lab, Evergreen Catalog, Poster Type Studio, and Launch Quality Pass are listed in `content/projects.json`. Each belongs to both `websites` and `videos`, so the same project appears under both filters.

- `description` is the short case-study blurb.
- `role` records the supplied contribution. Signal Studio's role is explicitly labelled **Planned**.
- `brief` describes the problem the project is intended to address.
- `tool` lists the tools used.
- `video` points to the reviewed public copy in `assets/videos/`.
- `poster` points to a real frame captured from that walkthrough in `assets/images/`.
- `status` is **concept**; update it when the project's implementation status is confirmed.
- `featured` is `false`; set it to `true` to include that project on the homepage.

Add a real `external_url` when a working demo is available. Add your process and actual outcomes when ready. Run `python scripts/sync_content.py` after editing the project data.

To generate a missing poster on Windows with Edge installed, run `python scripts/capture_video_posters.py`. Existing poster images are not overwritten. The current posters are actual video frames, rather than newly designed thumbnail compositions.

## Design and motion collections

- **TruHaq Brand Concept Collection** includes all 19 images from `admin/Concept/`: service logos, business cards, social covers, posters, and a service overview.
- **Design Samples Collection** includes all 25 images from `admin/Design Samples/`: education and motivational graphics, Eid greetings, Umrah promotions, logos, templates, and communication posters.
- Both new collections appear on the Projects page under Designs and Communication. Their web copies are in `assets/images/`; originals are preserved. Run `python scripts/add_design_collections.py` to regenerate these copies and entries (requires Pillow), then sync the HTML.

- **Identity Concept A** groups the original A logo, intro, and outro in one card, preserving its `awareness-logo` link. The two separate A video cards have been removed. Identical files in `admin/A/` are not listed again.
- **Identity Concept B** and **Identity Concept C** each bring together a logo, intro, and additional animation. A, B, and C appear together as directions for the same project, with C identified as the direction selected for the final project.
- **Student Services Flyer Collection** expands the existing flyer entry into six designs. The original first flyer is the cover; the other five are in its collection gallery. Its existing `awareness-flyer` link is preserved.
- **Student Services Poster and Motion Collection** groups the six posters, coordinating background, and two pattern videos from the folder currently spelled `admin/materilas 2/`.

Projects with more than two media items show one cover on their card and a **View collection** link to a dedicated grid page. Those pages include all project images and videos, a link back to the original card, and English/Arabic language switching. Image previews open the larger web copy; videos load when played. Projects with exactly two media items retain an expandable preview for the second item.

Run `python scripts/sync_content.py` to generate `project-<slug>.html` pages and both language versions from `content/projects.json`. Do not edit generated collection pages directly. The build includes these pages automatically, and production metadata includes them in the sitemap. Run `python scripts/check_collections.py` to check the item-count rule and gallery contents.

In `content/projects.json`, the `gallery` list contains each additional item. An image item uses `image`, `image_alt`, and `caption`; a video item uses `video`, `poster`, and `caption`.

The original source files and folder names are preserved. Smaller images are in `assets/images/`. These works are labelled as concept or practice projects; no client commission, tool, role, or measured result has been invented.

## Publish with Netlify

1. Push the project to your repository.
2. Import the repository into Netlify. The build settings are in `netlify.toml`.
3. Enable form detection in Netlify before deploying the contact form.
4. Deploy and check that the **contact** form appears in Netlify's Forms area.
5. Add submission notifications to receive messages by email.
6. Submit a real test message and confirm it arrives.

The form submits directly when hosted on Netlify. During a localhost or file preview, it opens the visitor's email application instead. If a submission fails, the message stays in the form.

## Article conversations

Each article has Like, Comment, and Share controls. Share uses the device share menu when available and otherwise copies the article link, with a selectable link fallback when clipboard access is unavailable.

Public discussions are prepared for Disqus Basic. They are not live until a site owner connects Disqus:

1. Register the published website at https://disqus.com/admin/create/ and choose the free Basic plan if eligible. This plan includes ads.
2. Enable guest commenting in Disqus settings. Guests provide a name and email without creating an account or sending an email message. Guest comments require moderator approval before appearing publicly. Enable reactions before creating any article threads. Voting on individual comments requires a Disqus account.
3. Set `disqusShortname` in `index.js` to the public shortname from Disqus. This is not an API key.
4. Deploy, open two different articles, and verify separate public threads, replies, reactions, guest posting, and moderation in Disqus. Check the threads from another browser. Keep article slugs stable.

Like opens the provider's reaction controls; it does not silently record a like. Comment opens the article discussion. Discussions load on demand in separate frames for each article. If Disqus is blocked, readers may need to allow it. No local-only comment or like counts are shown. Without a configured shortname, readers see a clear unavailable message.

The interaction layout is in `templates/article-feedback.html`. Run `python scripts/sync_content.py` after editing it. Private article feedback forms have been removed. General website feedback remains on the Contact page.

References: https://help.disqus.com/en/articles/1717211-guest-commenting and https://help.disqus.com/en/articles/1717110-comments-pricing-and-plans

## Website address and search previews

No domain has been invented or inserted. Netlify provides a hosting address without requiring a custom domain.

On Netlify, the content sync script uses the production `URL` environment variable to generate canonical links, social image URLs, and `sitemap.xml` automatically.

For another host, run this after you have your final address:

```powershell
python scripts/configure_site.py --url https://your-actual-address.example
```

Replace the example with your real HTTPS address. Run the command again if the address changes.

## Courses, training, and certificate previews

`content/courses.json` contains the bilingual course record used by the About page. Each entry records the title, issuer, certificate type, documented date, hours when provided, and original source filename. The Safeer programme includes its dated module record. Entries with no supplied certificate remain separately identified as additional training.

Run `python scripts/sync_content.py` after updating this record. It rebuilds the shared About section and both language versions; Arabic course translations are read directly from the same JSON.

The 29 public preview files are in `assets/certificates/`. They preserve names, course details, and certificate identifiers while permanently removing personal ID numbers where present. Originals remain in `admin/Certificates/` and directly under `admin/`, outside the deployment package. Public PDFs also have source hyperlinks, XML metadata, and attachments removed. Issuer verification is available on request rather than linking publicly to unredacted original certificates.

The added files cover Job Interviews (12 October 2026), Career Interests (7 and 13 October 2026), another Introduction to Professional Certifications session (19 October 2026), and Multiple Intelligences (8 October 2026). Career Interests and Professional Certifications are grouped by topic with separate dated preview links. Multiple Intelligences includes its attendance certificate for a one-hour remote workshop issued by HRDF / Hadaf.

To prepare new public copies, install PyMuPDF (`python -m pip install pymupdf==1.26.7`), then run `python scripts/prepare_certificate_previews.py`. This is a preparation step, not a deployment dependency. Review new formats and scanned pages visually for private information before adding them. The importer can redact searchable personal-ID text; it does not perform OCR on scans.

Dates follow the certificates: Hijri-only dates are retained, undated records are labelled, and the Gemini workshop's year is not inferred. The three Thinking Compass certificates are grouped as three sessions. The two earlier digital-transformation titles are consolidated to match the single supplied certificate.

## Public media privacy

`content/privacy.json` records the approved opaque masks and original-to-public video paths. Eight artwork files have private phone numbers, contact email addresses, and residential addresses masked. Their `-public.webp` URLs avoid cached earlier images. The originals under `admin/` are unchanged.

The student-portal recording has masks burned into its public MP4 over the student identifier, both login forms, account phone/email panel, browser profile/history, and session details. The mask regions include time margins around the sensitive screens. Review used local English and Arabic OCR and visual inspection; the cleaned portal recording was checked at one-second intervals, including nine regions where the identifier was previously readable. Site-level public name and contact information remain intentionally visible.

To regenerate artwork masks, run `python scripts/redact_images.py` (Pillow required). The design-collection importer also applies these masks. To prepare public video copies, install `imageio-ffmpeg` and run `python scripts/prepare_public_videos.py`. These preparation tools are not needed by Netlify's build.

After reviewing new or changed media for personal details, run `python scripts/check_privacy.py --record-review` to record the reviewed file hashes. The build refuses changed or unreviewed media until reviewed. `python scripts/check_privacy.py --documents` checks certificate coverage, searchable IDs, links, metadata, and attachments with PyMuPDF installed. `python scripts/check_privacy.py` validates the packaged public files, paths, reviewed hashes, and exclusion of private originals.

Deploy `dist/` only. `scripts/build_site.py` copies public HTML, JavaScript, CSS, assets, and browser content JSON. It excludes the entire `admin/` folder, source artwork, original videos/certificates, Python helpers, local audit reports, and temporary tools. Requests under `/admin/` return 404 on Netlify. The existing anti-framing response headers continue to apply.

## English and Arabic

The site supports English and Arabic only, using static files without a translation API or recurring translation-service fees. The header links keep the current page, query parameters, and section when switching. The browser remembers a selected language when storage is available. Existing root URLs remain accessible; a remembered Arabic choice redirects root pages to Arabic. Explicit `/en/` and `/ar/` links always take precedence.

- Edit the shared English pages, templates, and `content/*.json` files as before.
- Edit Arabic interface and project translations in `content/i18n/ar.json`. Keys are the exact English text.
- Full Arabic articles are in `content/i18n/articles/*.ar.md`. Keep paragraphs, headings, and lists aligned with the English article; generation checks paragraph counts. Add an Arabic file when adding an article.
- Run `python scripts/sync_content.py`. It generates `/en/` and `/ar/` pages, their localized JSON, and `translations-ar.js`. Do not edit those generated files directly.
- Arabic uses right-to-left layout and localized dates. Brand and software names stay in their original form. Text already embedded in artwork and video is preserved; surrounding descriptions are translated.
- `python scripts/check_languages.py` checks generated links, metadata, and translation coverage. The browser checks also cover both languages, mobile layouts, language persistence, and Arabic without JavaScript.

At deployment, the existing production-URL configuration generates canonical and `hreflang` links for both languages and includes both versions in the sitemap. No domain is hardcoded.

## Embedding protection

`netlify.toml` sets `Content-Security-Policy: frame-ancestors 'none';` and `X-Frame-Options: DENY` for all routes, including both languages. These block framing of live pages after deploying to Netlify. They do not stop copying public content or linking to images. Local Python preview does not apply Netlify response headers. On another host, configure the same headers there.

## Checks

Run the static checks:

```powershell
python scripts/check_site.py
```

On Windows with Microsoft Edge installed, the browser checks are available with:

```powershell
python scripts/check_browser.py
```

The browser checks use a temporary profile and a local server. They check responsive layouts, filters, validation, navigation, themes, and fallback content. They do not send a real message.
