# Business website launch audit

Audit date: 4 November 2026 (Asia/Riyadh).
Target: `My-Portfolio`, its generated `dist/` package, and the prepared Namecheap contact handler and Apache configuration.

## Decision

**Hold the public launch. The site is a usable portfolio foundation, but lead delivery, privacy disclosure, mobile conversion, and release verification need work before it becomes a dependable business website.**

This is not a claim that every missing checklist item is mandatory. A cookie banner, analytics, a CV, and a sticky button are different kinds of decisions. The important question is whether customers can understand the offer, trust the work, contact you reliably, and understand what happens to their information.

Do not upload the current ZIP as the final launch version. Complete the priority work below and regenerate it. The domain and mailbox have been configured through cPanel screenshots; the actual website package has not been verified on that server.

## Scope and evidence

- Static inspection of 39 packaged HTML files: 13 pages at the root and in each language directory.
- Five populated projects and six published articles in the current content files.
- Existing structural, language, collection, and package privacy checks passed. The packaged-link check covered 1,873 references.
- Rendered Edge checks and screenshots are recorded in `audit/launch-evidence.json` and `audit/*.png`. The browser collector is `scripts/audit_launch.py`.
- Completed 130 rendered views: all 13 pages in English and Arabic at 320, 375, 768, 1024 and 1440px. No horizontal overflow was observed in light or dark mode, no loaded image with an assigned source was reported broken, and no JavaScript runtime exceptions were recorded. This does not confirm that every lazy image below the fold loaded or that either theme meets contrast requirements.
- Mobile menu opening/Escape and invalid-email rejection passed. With JavaScript disabled, the Arabic projects page retained five cards and a visible navigation menu.
- Isolated hosted-form UI simulations passed for success, HTTP failure, and network failure: `node scripts/audit_form.cjs`. These simulations never send mail and do not exercise PHP.
- Repository inspection confirms a Git repository in `My-Portfolio` with an origin pointing to `https://github.com/AbdulhakeemOR/My-Portfolio.git`. Remote availability, visibility, permissions, and backup freshness were not verified.
- PHP is not installed locally. PHP execution, inbox delivery, DNS/mail authentication, Apache rules, HTTP status codes, and server caching remain live acceptance checks.
- This review does not establish WCAG conformance, legal compliance, video-content clearance, or real-device performance. Layout emulation is useful evidence, not a substitute for Safari, Firefox, actual phones, screen-reader testing, and a hosted mail test.

## Your 20-item checklist

| # | Item | Status | Assessment and action |
|---|---|---|---|
| 1 | Custom 404 | Present; live verification needed | Localized pages exist. `.htaccess` configures `ErrorDocument 404 /404.html`. Test an unknown URL on Namecheap and confirm an actual HTTP 404, not just a page that says 404. |
| 2 | CTA above the fold | Partial | Homepage shows “View selected work.” Desktop also has “Let's talk.” Mobile hides the header contact CTA; add a direct inquiry action in the hero. |
| 3 | Meta title per page | Present; improve | All 39 pages have titles. Main-page titles such as “Services \| AOR” are generic; add descriptive service/name context. |
| 4 | Meta description per page | Present; content mismatch | All 39 pages have descriptions. Services metadata advertises tutoring and consultancy while the visible page presents three other service groups. Align the offer. |
| 5 | Open Graph image | Missing | No `og:image` on any of the 39 pages. Add a branded default and appropriate project images, with absolute production URLs. |
| 6 | Favicon | Missing | No icon declaration on any of the 39 pages. Add the brand favicon and, optionally, an Apple touch icon. |
| 7 | robots.txt | Present in package | Points to the final domain's sitemap. It is not access control; it cannot keep a review site private. |
| 8 | sitemap.xml | Present in package | Includes canonical English/Arabic main and project URLs. Check it after upload and submit it to Search Console. |
| 9 | Alt text on every image | Attribute coverage passes; quality needs review | No static packaged image is missing an `alt` attribute. Empty alt is correct for decorative icons and images whose linked captions supply the name. Check informative gallery images manually; attribute presence alone is not accessibility. |
| 10 | Mobile breakpoints | Local layout checks pass | 130 rendered views across both languages and five widths had no horizontal overflow in either theme. Actual-device, keyboard and contrast acceptance checks remain. |
| 11 | Sticky mobile CTA | Missing | Header is sticky, but `.header-cta` is hidden below 480px. Consider a compact inquiry action that does not cover content or the mobile keyboard. This is a conversion improvement, not a universal requirement. |
| 12 | Loading states | Partial | Form has “Sending...” and disables its submit button. Media and dynamic areas need a clearer loading/error review. Avoid adding artificial spinners to already readable static content. |
| 13 | Form error states | Partial | Native validation and `aria-invalid` work. Simulated failures preserve the message and re-enable sending. All hosted failures currently show the same generic message, including rate limits. Native no-JavaScript server errors are plain text. |
| 14 | Thank-you page | Exists; flow incomplete | Localized success pages exist. PHP redirects to the root English success page. JavaScript follows the redirect inside `fetch` and shows inline success instead of navigating. Choose a consistent, localized confirmation flow. |
| 15 | Privacy policy | Missing; resolve before collecting leads | The short form note is not a full privacy notice. Add bilingual notices linked beside the form and in the footer, based on actual data handling. |
| 16 | Terms page | Missing; define business policies | Add proportionate website/service terms. Agree project scope, payment, revisions, cancellations, rights and delivery in the proposal/contract too; a footer page alone is not a service agreement. |
| 17 | Cookie banner | Conditional | No analytics integration was identified; Disqus is unconfigured. Theme/language preferences use localStorage. Inventory actual cookies and storage on the hosted site before deciding whether consent controls are needed. Do not add a meaningless banner. |
| 18 | Analytics installed | Missing; optional choice | No client-side analytics integration was identified. Hosting logs may still exist. Choose a minimal measurement plan and reflect any new service in the privacy notice. |
| 19 | Real contact address | Present; receipt not verified | Gmail is linked throughout the site. The `website@abdulhakeemor.com` sender mailbox was created in cPanel. Verify receipt, replies, spam placement, SPF/DKIM and normal inbox monitoring. A private home address is not automatically needed. |
| 20 | GitHub repo | Local repo and origin confirmed | `My-Portfolio` has a Git repository and GitHub origin. Verify that the latest source is backed up. GitHub is optional for manual cPanel publication. |

## Priority 1: complete before a public business launch

### P1-01 — Lead delivery has not been proved

Evidence: `hosting/namecheap/contact.php`, `assets/js/script.js`, `NAMECHEAP_SETUP.md`.

The handler uses PHP `mail()` to send to Gmail from the new domain mailbox. A successful return means the hosting mail transport accepted the message; it does not prove receipt. No real end-to-end message has been received as part of this work. A site that silently loses inquiries can lose business without an obvious visible error.

Required acceptance:

1. Confirm a supported PHP version on Namecheap and validate the handler syntax there.
2. Check SPF/DKIM in cPanel Email Deliverability and the domain's mail routing.
3. Send a real inquiry from the English page and another from Arabic, including Arabic text.
4. Confirm Gmail receipt, sensible formatting, correct Reply-To and spam placement.
5. Verify invalid input, rate limits, mail transport failure and browser network failure; preserve a useful way to recover the inquiry.
6. Monitor cPanel Track Delivery and provide the working direct email link as fallback.

If PHP mail proves unreliable, use authenticated SMTP through a maintained mail library. Do not store credentials in public files or Git. Avoid introducing a second mail integration until there is a reason to change the transport.

### P1-02 — No complete privacy notice

Evidence: `contact.html` has only a short purpose statement; there is no privacy page or footer policy link. The handler collects contact details and message content; its rate limiter keeps hashed IP keys/counters temporarily. Hosting and email providers may retain logs or messages beyond that limiter window.

Add a readable English/Arabic notice covering the operator and privacy contact, fields collected, purposes, actual legal basis where applicable, hosting/email processors, international handling where relevant, retention practices, rights/request route, and storage/third-party services actually used. Decide retention and provider details before writing factual promises. Do not promise that all data disappears after one hour: that is only the limiter's expiry, not email or hosting retention.

Saudi SDAIA guidance describes making a privacy notice available before collecting personal data. Applicability and the final notice need assessment against the actual business and data flows, rather than a generic pasted template: [SDAIA privacy-policy guidance](https://sdaia.gov.sa/Documents/PrivacyPolicyGuideline.pdf).

### P1-03 — The deployment privacy gate omits all uploads

Evidence: `scripts/check_privacy.py: hashes()` checks `assets/images`, `assets/certificates`, and `assets/videos`. `scripts/build_site.py` copies the entire assets tree, including `assets/uploads`.

The uploads directory contains **71 files, approximately 134.8 MiB; none is covered by the reviewed-hash manifest**. This is a coverage gap, not proof of a privacy leak. Passing the current privacy check does not establish that all shipped media was reviewed.

Extend the review inventory to uploads, review the actual new files (including video frames/audio and metadata as appropriate), then record hashes only after review. Keep private source files outside all deployed assets. Make subsequent additions fail the build until reviewed. Do not simply regenerate the manifest to make the warning disappear.

### P1-04 — Public controls advertise an unavailable function

Evidence: `assets/js/script.js` contains `const disqusShortname = ""`; article Like/Comment actions invoke the discussion code and report that the service is not connected.

Recommendation: remove or hide Like/Comment until a supported discussion service and moderation plan exist; keep Share. This reduces maintenance and avoids adding a third-party privacy dependency just to complete a checklist. If comments are important, deliberately configure moderation, loading/error states and privacy/consent behaviour before enabling them.

### P1-05 — Mobile visitors lack a direct hero inquiry action

Evidence: at 375px the homepage hero shows “View selected work,” while `assets/css/style.css` hides `.header-cta` at widths below 480px. The sticky header measured about 162px high at 375px, compared with about 120px on desktop.

Add a primary or secondary “Discuss your project” action in the hero and keep selected work accessible. Reduce mobile navigation height or visual weight where practical. A compact persistent contact action is worth testing, but it must not obscure content, focused fields or validation messages.

The headline “Helping organisations communicate, create and grow” is broad. State the primary customer, concrete services and useful outcome more specifically. This is an editorial conversion recommendation; no A/B evidence has yet proved which wording performs best.

### P1-06 — No real release acceptance run or private review environment

The local build is not evidence that Apache, SSL redirects, PHP, caching, 404 status and email will work on Namecheap. Existing screenshots establish domain certificates, not the behaviour of this package.

Use a protected review environment, such as a cPanel-protected staging directory/subdomain, and share it privately. Test production-origin restrictions in the contact handler deliberately: its current allowlist permits only the main domain and www, so a staging hostname needs an explicitly approved test configuration. Do not treat robots.txt or noindex as password protection.

Agree the review URL and access controls first; no protection has been enabled by this audit. Public launch should follow the live acceptance checklist at the end.

## Priority 2: improve before launch where possible

### P2-01 — Missing social previews and favicon

All 39 HTML files lack `og:image` and icon declarations. Add a recognizable favicon and useful sharing image. Main titles should include a descriptive name/offer rather than relying on “AOR” alone. Add image dimensions and suitable Twitter card metadata. Test real shared URLs after deployment; tag presence is not proof of a platform's final cached preview.

Use unique descriptions for major pages and projects. In particular, remove tutoring/consultancy from the Services description unless those services are visibly offered. Google's guidance recommends useful page-specific descriptions: [Google Search Central](https://developers.google.com/search/docs/appearance/snippet).

### P2-02 — Service scope is too vague for purchasing decisions

The Services page provides three broad cards and a five-step process, but little about concrete deliverables, what's included, revisions, client responsibilities, typical project fit, handover, or what happens after an inquiry.

Add a short scope for each actual service, relevant work examples, a useful inquiry route and a realistic response expectation you can maintain. Decide whether tutoring and consultancy remain part of the offer and align metadata/form options. Pricing is not mandatory; clear scope and a proposal process matter more than publishing invented starting prices.

### P2-03 — Portfolio proof is honest but concentrated in concepts

There are four concept projects and one graduation campaign marked approved but not implemented. Keep those distinctions visible. The graduation entry includes role, process, tools and outcome; do not convert it into a claim of delivered campaign impact.

The site sells website development, but its current five projects are campaign-oriented, including an Evergreen catalog campaign concept. Add a truthful website implementation case study (this portfolio could be one) with a working example, technical contribution, responsive screenshots and practical decisions. Add verified testimonials or measured outcomes only when available and permitted. A personal portrait and optional CV can improve trust, but are not universal launch requirements; the current initials treatment is intentional.

### P2-04 — Media packaging and performance need attention

The current ZIP is about 199.2 MiB. The largest video is about 21.4 MiB, and several PNGs are 2–4 MiB. There are approximately **38 filename-reference candidates totalling 17.5 MiB** that do not occur in packaged HTML/CSS/JS/JSON. These are candidates for review, not permission to delete: dynamic or indirect use needs checking.

The package size is not a page-load measurement. Audit the actual initial mobile request waterfall and largest visible image. Create appropriately sized WebP/AVIF copies where useful, responsive image candidates and video posters; keep video preload conservative. Some article uploads have both large PNG and small WebP versions, and all are currently shipped.

There is no explicit cache policy in the Namecheap `.htaccess`; Netlify's cache configuration does not transfer to cPanel. Set and verify a cache strategy that works with manual updates. Assets often keep the same filenames, so long immutable caching requires content-hashed names or another reliable versioning strategy. Measure hosted Core Web Vitals after deployment; this audit does not invent Lighthouse scores or field results.

### P2-05 — Confirmation and error handling need a finished user flow

The contact UI handles basic failure without clearing the message, which is good. It does not distinguish invalid data, too many attempts, or service failure. Provide an actionable rate-limit message and retry guidance. Ensure failed mail calls are logged safely without exposing addresses/message content in public error output.

Choose either a localized thank-you navigation or deliberate inline confirmation. Today, PHP always redirects to root `contact-success.html`; JavaScript consumes that response internally. With no JavaScript, a server error produces a plain text page and the success page is not language-aware. The form also uses a 15-second timeout; delivery after a timeout is ambiguous, so a retry can duplicate an inquiry. Consider an idempotency strategy if duplicates become material.

Test request-size and field-length limits with long Arabic and multi-byte text: the PHP limits are in bytes while browser maxlength is based on UTF-16 code units, and URL encoding changes request size. Do not assume every browser-valid message fits the server's 32 KiB request cap.

### P2-06 — Accessibility needs interaction and media checks

Positive foundations: skip link, explicit page language/RTL, labeled form fields, visible focus styling, native controls, reduced-motion handling and static content fallbacks.

Remaining work: manually inspect keyboard order/focus visibility across the project fan, expanding cards, course folders and lightbox; test Escape, focus restoration and a screen reader. Confirm text/button contrast in both themes. Measure small controls with their surrounding spacing before declaring a target-size failure. WCAG 2.2 AA uses a 24 CSS-pixel target-size rule with defined exceptions, not a blanket 44px rule: [W3C explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).

No packaged `<track>` elements were found. Determine which videos contain meaningful speech/audio, then provide captions/transcripts or another suitable alternative. Absence of tracks is not proof every silent/decorative video needs spoken captions. Some static images lack HTML width/height attributes; add stable sizing where CSS does not already reserve space. A full layout-shift assessment remains pending.

### P2-07 — The existing browser regression script is out of date

`scripts/check_browser.py` contains expectations for 13 project cards, five articles and older project/gallery slugs. Current content has five projects and six articles. Its previous success messages cannot be used as evidence for this version.

Update it to derive meaningful expectations from current content while retaining checks that can catch real regressions. The new audit collector records observations; it is not a replacement for assertion-based tests. The local server cannot exercise the PHP endpoint.

### P2-08 — Release maintenance and recovery need a clear home

The outer AOR folder and nested `My-Portfolio` contain different versions and two identically named upload ZIPs. This is a realistic deployment-error risk. Use `My-Portfolio` as the documented source of truth. Label release artifacts with version/date and a checksum; retain a known-good backup. Do not delete the alternate folder until its unique material is reviewed.

Manual uploads overwrite matching files but do not remove obsolete pages/assets. Record additions, replacements and removals for releases. Keep GitHub as source history if useful, and verify the latest work is pushed; publication through cPanel does not require pushing every change. No commit, push, or cleanup was performed by this audit.

## Priority 3: useful improvements after the essentials

- Choose a small measurement plan: inquiries submitted, direct-email clicks, service-page visits and useful project views. Avoid sending message bodies or visitor email addresses to analytics. Analytics is optional; reliable lead delivery is not.
- Add accurate Person/ProfessionalService structured data only where supported by the real business facts. There are currently no JSON-LD blocks in the packaged pages. Never invent business registration, reviews, a street address, prices or service coverage.
- Consider individual article URLs: articles currently share one listing page with fragment links, limiting article-specific sharing metadata and search presentation.
- Check social profile destinations manually, including the Facebook share-style URL, and retain only professionally relevant, maintained profiles.
- Make certificate browsing supplementary to the main business offer rather than the central proof of service quality. Review every public certificate for deliberate disclosure and useful relevance.
- Monitor SSL expiry/renewal. Screenshots show the main and www certificate expiring 20 May 2027 and not being renewed through AutoSSL; verify the actual renewal route with Namecheap rather than assuming it is automatic.

## Corrected sequence for your Namecheap hosting

The old Netlify-specific sequence no longer matches this deployment. Netlify deployment protection, Forms notifications and its supplied production URL are not features of the cPanel upload workflow.

1. Keep `My-Portfolio` as the main source and preserve a backup.
2. Complete the local priority corrections and decide privacy/business-policy facts.
3. Review all deployed media, including uploads, and close the hash-review gap.
4. Regenerate the Namecheap package; verify the domain metadata, favicon, sharing image and language output.
5. Set up a protected hosted review area with a deliberate contact-handler configuration.
6. Validate PHP, mail, headers, redirects, 404 responses, caching and actual contact delivery.
7. Invite colleagues privately and test actual phones/browsers and Arabic reading quality.
8. Prepare a rollback copy and publish the reviewed production files.
9. Verify the final public URL and only then share it widely.

## Live launch acceptance checklist

- [ ] Main and www TLS are valid; HTTP/www redirect to the intended HTTPS hostname without loops.
- [ ] Unknown URLs return HTTP 404; the root, English and Arabic pages remain usable.
- [ ] Production canonical/hreflang URLs, robots.txt and sitemap.xml reference the intended public domain.
- [ ] English and Arabic inquiries reach Gmail and can be replied to correctly.
- [ ] Form failure, invalid fields, timeout and rate limits have recoverable, localized outcomes.
- [ ] Privacy notice is accurate, bilingual and linked before submission; business/service terms are agreed.
- [ ] No unconfigured Like/Comment controls are exposed.
- [ ] Main mobile hero has an inquiry path; menus/forms are usable on actual iOS and Android devices.
- [ ] Images/videos load; important audio has an appropriate alternative; keyboard/focus checks are completed.
- [ ] Favicon and social previews are verified using the final URLs.
- [ ] Every deployed media file is inventoried and reviewed; private source files and uploaded ZIPs are not public.
- [ ] Hosted performance and update caching are checked; no invented performance score is used as sign-off.
- [ ] Source and last known-good release are backed up; rollback and obsolete-file removal are understood.
- [ ] Any analytics/comments/cookies actually introduced match the privacy and consent implementation.

## Work performed by this audit

Added audit collectors, simulated form checks, screenshots, evidence JSON and this report. No website corrections, mail submissions, hosting changes, commits, pushes or deployments were performed. The existing upload ZIP is unchanged and should be rebuilt after corrections.
