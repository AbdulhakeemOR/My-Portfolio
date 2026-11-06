# Launch corrections: code and owner tasks

Working source: `My-Portfolio`. The outer AOR website is a separate version.
This file updates the original findings in `LAUNCH_AUDIT.md`; that report remains a record of the pre-correction audit.

## Coding work completed in this pass

| Finding | Change | Remaining dependency |
|---|---|---|
| Mobile inquiry route | Added a first-position “Discuss your project” hero link; the sticky header contact button now stays visible on phones. | Actual-device feedback. |
| Unconnected article controls | Removed Like/Comment buttons and inactive Disqus integration; retained Share and its copy-link fallback. | None for sharing. Comments can be a separate future project. |
| Favicon and previews | Added a favicon using the existing logo and a 1200×630 sharing image. Generation adds metadata to all pages and absolute production image URLs at packaging. | Final hosted preview check; the default sharing image currently uses English text. |
| Metadata accuracy | Added descriptive main-page titles and aligned Services metadata with its three visible offers; generated Arabic translations. | Your decisions about any additional services. |
| Contact confirmation | Namecheap now returns explicit JSON to JavaScript and redirects native submissions to the correct English/Arabic thank-you page. JavaScript navigates to the localized page only after an explicit success response. | PHP execution and actual Gmail receipt on Namecheap. |
| Contact errors | Added validation, rate-limit, unavailable-service and ambiguous-timeout feedback. Errors preserve the message. Native server errors provide a localized page with a copyable draft. Increased the request allowance for URL-encoded multibyte text and added Unicode character validation. | Live PHP and hosted-failure tests; browser simulations are not a delivery test. |
| Namecheap caching | Added revalidation for unchanged asset filenames; contact responses remain no-store. | Verify effective response headers on the host. |
| Media review coverage | Extended the release check to uploads and brand assets. It lists missing/changed files and blocks packaging before replacing the existing output. Added a pending-review checklist. | Owner approved all 71 pending uploads on 4 November 2026; their hashes are recorded. Any subsequent media changes need review. |
| Stale browser tests | Replaced assumptions about old content with current-catalog checks, mobile inquiry checks, sharing, gallery focus restoration, language navigation and source fallback coverage. | See test outcomes below. |
| Image layout stability | Added intrinsic dimensions to static raster images and a generated dimensions map for JavaScript project/article images. Structural checks now reject missing image dimensions. No images were edited. | Hosted layout-shift/performance measurements remain pending. |
| Release identification and recovery | Future builds create timestamped ZIPs under `releases/` with SHA-256 checksums and file manifests. Previous releases are retained; removed paths are reported for manual server review. ZIP content is verified against the manifest before publication. | Corrected release built and verified; server backup/recovery still needs a live check. |

## Work that needs your facts or decisions

Confirmed by the owner: the business uses the full name **Abdulhakeem Oladapo Raji**; prospective clients include individuals, small businesses and large corporations; the current listed services remain intended offerings; the response target is **one business day**. The Services audience text and Contact response target have been updated in English and Arabic.

Arabic–English document translation and other possible services are future considerations, not currently advertised additions. Exact service deliverables remain to be defined; “everything a service should have” is not an agreed scope or a promise of unlimited work. The existing project-specific scope process remains in place.

Payment, revision and refund/cancellation decisions are still pending. The owner subsequently selected a 12-month inquiry-retention period; the deletion routine still needs implementation. No commercial policies have been invented or published.

Please fill in the answers below or reply in chat. “Not decided” is a useful answer; we will leave unsupported claims out of the live site.

| Needed | Please provide | How it will be used |
|---|---|---|
| Business identity | Public trading/personal name; whether there is a registered entity; public contact email; genuine service locations. Do not send private identity documents. | Accurate contact, privacy and business information. |
| Priority customer and offer | Your main customer type and which services you want to sell first. Confirm whether tutoring or consultancy should be included. | Hero wording, service pages and inquiry options. |
| Service scope | Deliverables, what is excluded, client-supplied materials and handover/support for each service. | Useful buying information instead of vague promises. |
| Commercial policies | Revision allowance, payment/deposit approach, cancellation/refund handling, ownership/licensing and realistic delivery/response times. | Service terms and proposal guidance. These must match how you actually intend to work. |
| Inquiry privacy | How long you will retain inquiries, who can access them, where you will manage them, privacy-request email and any other tools/processors you intend to use. | A factual privacy notice in both languages. Existing Namecheap/Gmail handling must also be described accurately. |
| Portfolio/media clearance | Review `MEDIA_REVIEW_PENDING.md` for private information and intended public use; confirm permission for relevant third-party material. Provide captions/transcripts for meaningful spoken video where needed. | Completion of the release gate and accessible media alternatives. Do not approve files you have not reviewed. |
| Trust material | Optional real portrait, public CV with private details removed, permitted testimonials, working demos and evidence of outcomes. | Stronger proof. Nothing will be invented. |
| Analytics | Whether you want visitor measurement, and which outcomes matter. Keeping analytics off initially is valid. | Tool choice and any corresponding privacy/consent work. No analytics or cookie banner has been added. |

## Live configuration and testing: not solved by local coding

- Confirm PHP 8+ and test the handler on the hosting server.
- Check cPanel Email Deliverability, SPF/DKIM and mail routing; send English and Arabic test messages and confirm receipt and replies in Gmail.
- Choose a protected review URL/access method before inviting colleagues. The handler currently permits only the main domain and www; staging requires deliberate configuration.
- Verify HTTPS redirects, 404 status, cache headers, social previews and sitemap on the final host.
- Check actual iOS/Android browsers, keyboard use and Arabic wording with readers.
- Verify backup freshness and the SSL renewal route before launch.

## Release status

Local verification passed: 260 page/width/theme browser combinations, current content counts, mobile inquiry visibility, sharing, filters, gallery focus restoration, menu/theme/language interactions and no-JavaScript projects. Structural, translation and gallery checks passed. Eight hosted-form simulations passed (including Arabic success navigation, invalid responses, rate limits, server/network failures and timeout recovery). The privacy-gate check also confirmed that packaging stops before replacing existing output.

These checks ran against the corrected source, not the old `dist/` folder. PHP execution, actual delivery and server rules remain unverified until the hosted checks are completed.

**Corrected package built for hosted testing:** [releases/abdulhakeemor-namecheap-20261104T230221177883Z.zip](releases/abdulhakeemor-namecheap-20261104T230221177883Z.zip). The owner approved the 71 pending media files, and all packaged-media hashes and 1,936 local references passed. The archive CRC and SHA-256 checks passed. Privacy/business-policy decisions and actual server/email acceptance checks remain open before public launch.

The new privacy and terms pages are awaiting your factual decisions. We have not published placeholder legal text, invented a retention period, enabled tracking or changed hosting settings.

A refined, non-public privacy draft is available in `PRIVACY_POLICY_DRAFT.md`. It removes duplicated text and features absent from the corrected site. Inquiry retention, account access, provider/location details, applicable legal arrangements and any tutoring of minors still need confirmation. Markdown drafts are excluded from the generated website package.

Latest owner clarification: only the owner accesses inquiries within the business; Namecheap two-factor authentication is enabled. The owner selected **12 months after an inquiry closes** for inquiry retention. A practical mailbox-deletion routine remains to be established; no automated deletion is claimed. The owner is considering Namecheap Webmail instead of Gmail; recipient/public-address changes await confirmation, and current code still sends inquiries to Gmail. Tutoring is excluded for now; a remaining option in the source contact form was removed and the language pages regenerated. Historical campaign references to tutors are project descriptions, not current service offers. The earlier release ZIP predates this change and must be rebuilt for deployment.

## Terms and client agreement drafts

`TERMS_POLICIES_DRAFT.md` and `CLIENT_AGREEMENT_TEMPLATE.md` refine the owner's supplied documents. They remain private Markdown documents excluded from deployment. No `/terms.html` or `/privacy.html` page or legal-policy footer link has been published yet, so the agreement explicitly requires finalized, supplied policy copies before use.

Owner confirmed commercial defaults: 50/50 project payments, two revision rounds, 14-day quote validity, 7-day invoice period and a possible pause after 30 days without needed client feedback. USD is confirmed. The owner reports PayPal and Wise receiving accounts; PayPal is accessible and Wise access needs migration to the new phone. Check access before giving Wise payment instructions. Contracting status and applicable jurisdiction remain unresolved; a possible future relocation does not select Nigeria automatically. General website terms can be drafted without naming a country while actual agreements retain jurisdiction fields for appropriate review. No legal choice has been published.

The drafts replace blanket advance-payment forfeiture with an itemized cancellation settlement proposal, protect mandatory rights, avoid automatic processor-fee surcharges, distinguish custom ownership from background/third-party material and make portfolio permission explicit. These are review proposals, not deployed terms or a legal determination.

The Services process now states that scope, deliverables, fees and timeline are agreed in writing before work starts, in both English and Arabic. The existing ZIP predates that update and the tutoring removal; rebuild after the final launch changes.

## Policy pages now available in local preview

English and Arabic Privacy and Terms pages are generated from `content/policies.json`. Footer links are present site-wide; the contact form links to Privacy and Services links to Terms. Policy pages are included in language navigation, metadata generation and the sitemap. Client agreements remain private Markdown templates and are not linked for public download.

The local pages use confirmed facts and defaults, not the unresolved internal draft notes. The public-facing Terms text leaves cancellation valuation/refunds to the written project agreement and selects no country or exclusive dispute forum. The detailed internal proposals on cancellation, portfolio opt-in and liability remain separate. Privacy legal-basis, provider location/retention/transfer checks, the practical mailbox-deletion routine and live email/server acceptance checks still need review before production publication. Local pages are not a legal-compliance certification.

Preview: `http://127.0.0.1:8000/en/privacy.html` and `http://127.0.0.1:8000/en/terms.html`, with matching `/ar/` pages. Until the new package is uploaded, the public domain continues to serve its existing files.

The policy-page generator now includes the shared back-to-top button, which had been omitted on those new pages. It follows the existing rule: hidden at the top, visible and keyboard-accessible after scrolling more than 500px. The local English and Arabic pages have been regenerated. Rebuild the release ZIP before deploying this latest fix.

## Next stage: protected hosted review

`HOSTED_REVIEW.md` documents cPanel setup for `public_html/review`. The build command
`python scripts/prepare_namecheap.py --review` creates a separately named review
ZIP and `releases/latest-review.json`. Review form actions and native PHP return
paths stay under `/review/`; pages carry noindex metadata. The archive excludes
`.htaccess` so it cannot replace cPanel's Directory Privacy authentication file.
Temporary extraction tests confirmed protection-file preservation, and form UI
simulations confirmed English/Arabic success routes under the review path. Actual
authentication, PHP execution and email delivery still require the hosted tests.

### Hosted mail finding — 5 November 2026

Owner tested the protected review form twice. Both attempts reached the thank-you
page; the second email arrived in Gmail. Track Delivery shows the first attempt
rejected by Gmail with SMTP `550 5.7.25`: sending IP `66.29.146.66` lacked a PTR
record or its corresponding forward DNS did not match. The later attempt is
listed as Accepted. This is evidence of a mail-server DNS problem at the failed
attempt, not a form-field validation failure or proof that delivery is now
consistently fixed. Namecheap must investigate reverse/forward DNS for the
outgoing mail IP(s). Do not change the website A record to the outgoing mail IP.
After support confirms resolution, repeat English/Arabic submissions and verify
receipt, Reply-To and Track Delivery. Public launch remains pending delivery
verification and the other outstanding acceptance checks.

### Hosted delivery retest — 5 November 2026

After Namecheap support reviewed the account, the owner confirmed receipt of both
new English and Arabic contact messages in Gmail, with thank-you pages appearing
for both submissions. The supplied screenshot shows the Arabic confirmation.
These two end-to-end delivery tests passed. Support's messages did not explicitly
document a PTR repair, so that historical rejection is retained above rather than
reported as a proven DNS fix. Correct Reply-To behaviour and the new Track Delivery
results have not yet been confirmed by the owner. Final mobile/content/policy,
production-server and deployment checks remain open.

The owner subsequently confirmed that replying to the received messages works,
completing the requested Reply-To check. Hosted English/Arabic submission,
confirmation, Gmail receipt and reply routing have now been confirmed in the
protected review environment. This is observed test success, not a guarantee of
future inbox placement or independent proof that the historical PTR issue was
repaired. Continue monitoring delivery after launch.

Latest hosted-testing package rebuilt after the tutoring removal and Services process update. The public site has not been replaced. The supplied screen recording shows the public Arabic Projects page with zero projects and question-mark labels; the current local catalog contains five projects. Local preview responds at http://127.0.0.1:8000/en/index.html.

Policy integration verification passed: 300 browser page/width/theme combinations; 45 packaged HTML pages; English/Arabic policy sitemap URLs and 2,265 packaged references. The latest hosted-testing ZIP includes both policies, with no Markdown drafts or private agreement template. Public deployment and live delivery/legal checks remain pending.

Production package rebuilt after the successful hosted delivery/reply tests: abdulhakeemor-namecheap-20261104T230221177883Z.zip. Verified root form routes, empty production base path, inclusion of production Apache configuration and policies, exclusion of review-only marker/noindex rules and private Markdown files. Final actual-device/content/policy review and production deployment remain pending.
# Article conversations update — 5 November 2026

- Implemented shared English/Arabic likes and moderated comments on Namecheap PHP/SQLite; new comments remain pending until approved.
- Added a private moderator dashboard, owner-only deletion, browser-cookie identification, CSRF/origin checks, spam limits and escaped visitor text. Private data stays outside public_html; review and production data are separate.
- Added a 10px date/category gap in both languages. Removed the unused tutoring disclaimer from public privacy and terms text, and added accurate discussion privacy information.
- Setup still required on the hosting account: upload the fresh review package, confirm PDO SQLite, protect the nested feedback-admin folder and create the private aor-moderator user. See COMMENT_MODERATION.md. Hosted acceptance remains pending until those steps are tested.
- Verification passed: real PHP/SQLite API tests, browser submission and approval across both languages, 10px spacing at mobile/desktop widths, language/site checks, both packaging modes, and 300 page/width/theme browser regression combinations.

