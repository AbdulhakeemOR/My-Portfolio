# Public website demos

Seven repositories from `AbdulhakeemOR` have been prepared as public, static
demonstrations. These are deployment copies; the original GitHub repositories
have not been changed. Downloaded source snapshots are in `AOR/samples/`.

## Preview before upload

Open `http://127.0.0.1:5176/en/projects.html` and choose **Websites**. The Arabic
portfolio page also lists the demos. The sample websites retain their original
languages. Each new entry includes a real browser screenshot and **Try live demo**.
Existing campaign case studies remain separate from the website demonstrations.

## Upload to Namecheap

1. Keep a current hosting backup before replacing website files.
2. Upload **AOR/website-demos-update.zip** to **public_html**, extract it directly
   there, and replace matching files. Do not empty the directory first.
3. Delete the uploaded ZIP from the server after extraction; keep your local copy.
4. Open `https://abdulhakeemor.com/en/projects.html`, refresh, and choose
   **Websites**. Repeat on the Arabic Projects page.
5. Follow each **Try live demo** link and test its main interaction.

The archive includes the demos, English/Arabic Projects pages, public project
JSON, existing project-gallery dependencies, matching shared scripts/styles,
icons and fonts. It deliberately excludes `.htaccess`, `.htpasswd`, admin
application folders, private customer project records, sessions, and databases.
Your existing project tracker, moderation tool, and Admin Home are not replaced.
The public homepage and protected review deployment are also not promoted or
replaced by this Projects update.

| Demo | Public path | Main interaction |
| --- | --- | --- |
| Bridge Arabic | `/demos/bridgearabic/` | Programme outline, greeting audio, sample lesson |
| Everyday Calculator | `/demos/calculator/` | Basic/scientific calculators and currency interface |
| Evergreen Catalog | `/demos/evergreencatalog/` | Search/filter resources and save favourites |
| Framehouse | `/demos/framehouse/` | Poster filters and artwork detail dialogs |
| Gather Forum | `/demos/gatherforum/` | Agenda, session dialogs, and shortlist |
| ScopeCraft | `/demos/scopecraft/` | Change pages/extras and preview an illustrative estimate |
| Signal Studio | `/demos/signalstudio/` | Service/work pages and a contact form preview |

These paths are public after uploading; do not password-protect the demos folder.
The currency converter uses an external rate provider. Some samples use Google
Fonts, with local fallback fonts if that service is unavailable. Evergreen's
existing photos are bundled locally and documented in `IMAGE_SOURCES.txt`.

## Demo behaviour

A small banner links back to Projects and labels each site as a portfolio sample.
Contact and interest forms are previews: they do not send email, register people,
or create paid orders. Their form controls stay disabled without JavaScript;
with JavaScript, a shared guard prevents network submission while retaining the
sample interactions. Native dialog-closing forms are allowed because they do
not send data. Visitors should use fictional details for testing.

Saved calculator history, catalog favourites, and workshop shortlists stay in
the visitor's browser where the sample supports local storage. No customer
accounts, server database, or Node.js runtime are needed for these static builds.

## Hosting repairs included

- Built Framehouse's React/Radix gallery with relative asset paths.
- Replaced its placeholder portfolio URL in the deployment copy.
- Restored ScopeCraft's referenced CSS/JS/font/icon directory layout.
- Included Bridge Arabic's greeting recording inside its public folder.
- Corrected Evergreen's links to the actual catalog index and bundled the photos
  it already referenced, avoiding dependency on the remote image server.
- Changed Signal Studio's demo success message so it does not promise a real reply.
- Captured actual desktop screenshots rather than using fabricated mockups.

## Maintain and rebuild

Project metadata: `content/demo-projects.json` and `content/projects.json`.
Preparation: `scripts/prepare_demo_sites.py`.
Prepared static files: `demos/`.

When sample source changes, refresh its downloaded snapshot first. For Framehouse,
build the snapshot with `npm ci` and `npm run build`. Then, from `My-Portfolio`:

```powershell
python scripts/prepare_demo_sites.py
python scripts/check_demo_sites.py --capture
python scripts/add_demo_projects.py
python scripts/sync_content.py
python scripts/check_demo_sites.py --projects-only
python scripts/check_site.py
python scripts/check_languages.py
python scripts/prepare_namecheap.py
python scripts/prepare_demos_update.py
```

The browser checks require the local portfolio server at port 5176 and installed
Microsoft Edge. They cover demo desktop/mobile layouts, local assets, gallery
and session dialogs, calculator controls, Projects filtering, and real navigation.
The package builder resolves page/CSS/project-media dependencies and verifies
them against the last full release manifest before packaging.
