const root = document.documentElement;
root.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// WorksWheel geometry adapted for the site's dependency-free HTML renderer.
document.querySelectorAll(".works-wheel").forEach((wheel) => {
	const stage = wheel.querySelector(".works-wheel-stage");
	const rotor = wheel.querySelector(".works-wheel-rotor");
	const cards = [...wheel.querySelectorAll(".works-wheel-card")];
	const label = wheel.querySelector(".works-wheel-label");
	if (!cards.length) return;
	let turn = 0, target = 0, frame = 0, settle = 0, drag = null, moved = false;
	let width = 0, height = 0;
	const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
	const draw = () => {
		frame = 0;
		turn += (target - turn) * (reducedMotion.matches ? 1 : 0.12);
		if (Math.abs(target - turn) < 0.0005) turn = target;
		const m = clamp(turn, 0, 1), pos = Math.max(0, turn - 1);
		const cardW = Math.min(height * 0.38 * 1.45, width * (width < 600 ? 0.52 : 0.34));
		const cardH = cardW / 1.45, radius = cardH * 2.22;
		const ringScale = clamp((2 * Math.PI * cardH * 1.14 / cards.length * 0.82) / (cardW || 1), 0.16, 1);
		stage.style.perspective = `${cardH * 2.7}px`;
		rotor.style.transform = `translateZ(${-m * radius}px)`;
		cards.forEach((card, i) => {
			const d = i - pos, degrees = d * (360 / cards.length);
			const hidden = m > 0.5 && Math.abs(d) > 1.6;
			card.style.width = `${cardW}px`;
			card.style.height = `${cardH}px`;
			card.style.marginLeft = `${-cardW / 2}px`;
			card.style.marginTop = `${-cardH / 2}px`;
			card.style.transform = `translateX(${-m * cardH * 1.82 * (1 - Math.cos(degrees * Math.PI / 180))}px) rotateZ(${(1 - m) * d * 360 / cards.length}deg) translateY(${-(1 - m) * cardH * 1.14}px) rotateX(${m * degrees}deg) translateZ(${m * radius}px)`;
			card.style.opacity = hidden ? "0" : "1";
			card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
			card.inert = hidden;
			card.firstElementChild.style.transform = `scale(${ringScale + (1 - ringScale) * m})`;
			card.classList.toggle("is-front", m > 0.9 && i === Math.round(pos));
		});
		label.style.opacity = String(1 - m);
		wheel.querySelector("[data-wheel-prev]").disabled = target === 0;
		wheel.querySelector("[data-wheel-next]").disabled = target === cards.length;
		if (turn !== target) frame = requestAnimationFrame(draw);
	};
	const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
	const to = (next) => { target = clamp(next, 0, cards.length); schedule(); };
	const snap = () => to(Math.round(target));
	new ResizeObserver(() => {
		width = stage.clientWidth; height = stage.clientHeight; schedule();
	}).observe(stage);
	wheel.classList.add("is-enhanced");
	stage.addEventListener("wheel", (event) => {
		if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
		const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1);
		if ((delta < 0 && target === 0) || (delta > 0 && target === cards.length)) return;
		event.preventDefault();
		to(target + delta / 900);
		clearTimeout(settle); settle = setTimeout(snap, 140);
	}, { passive: false });
	stage.addEventListener("keydown", (event) => {
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault(); to(Math.round(target) + (event.key === "ArrowDown" ? 1 : -1));
		}
	});
	stage.addEventListener("pointerdown", (event) => {
		if (event.button !== 0) return;
		drag = { y: event.clientY, start: event.clientY, id: event.pointerId }; moved = false;
	});
	stage.addEventListener("pointermove", (event) => {
		if (!drag || drag.id !== event.pointerId) return;
		if (Math.abs(event.clientY - drag.start) > 6) {
			moved = true; stage.setPointerCapture(event.pointerId);
		}
		if (moved) to(target + (drag.y - event.clientY) / 420);
		drag.y = event.clientY;
	});
	const endDrag = () => { drag = null; snap(); };
	stage.addEventListener("pointerup", endDrag);
	stage.addEventListener("pointercancel", endDrag);
	stage.addEventListener("lostpointercapture", endDrag);
	stage.addEventListener("pointerleave", () => { if (!moved) drag = null; });
	stage.addEventListener("click", (event) => { if (moved) { event.preventDefault(); moved = false; } });
	cards.forEach((card, i) => card.addEventListener("focus", () => to(i + 1)));
	wheel.querySelector("[data-wheel-prev]").addEventListener("click", () => to(Math.round(target) - 1));
	wheel.querySelector("[data-wheel-next]").addEventListener("click", () => to(Math.round(target) + 1));
});
const toastRegion = document.querySelector(".toast-region");
let toastTimer;

function showToast(message) {
	if (!toastRegion) return;
	toastRegion.textContent = message;
	window.clearTimeout(toastTimer);
	toastTimer = window.setTimeout(() => {
		toastRegion.textContent = "";
	}, 2800);
}

const themeButtons = Array.from(document.querySelectorAll(".theme-toggle"));
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme = null;

// A saved visitor choice wins; otherwise the operating-system preference is used.
try {
	const preference = window.localStorage.getItem("aor-theme");
	savedTheme = ["light", "dark"].includes(preference) ? preference : null;
} catch {
	savedTheme = null;
}

function setTheme(theme, persist = false) {
	root.dataset.theme = theme;
	const isDark = theme === "dark";
	const themeColor = document.querySelector('meta[name="theme-color"]');
	if (themeColor) themeColor.content = isDark ? "#141b19" : "#f7f9f7";
	themeButtons.forEach((button) => {
		button.setAttribute("aria-pressed", String(isDark));
		button.textContent = isDark ? "Light theme" : "Dark theme";
		button.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
	});

	if (persist) {
		savedTheme = theme;
		try {
			window.localStorage.setItem("aor-theme", theme);
		} catch {
			showToast("Theme will reset when this page closes.");
		}
	}
}

setTheme(savedTheme || (systemTheme.matches ? "dark" : "light"));
systemTheme.addEventListener("change", (event) => {
	if (!savedTheme) setTheme(event.matches ? "dark" : "light");
});
themeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
		setTheme(nextTheme, true);
		showToast(`${nextTheme === "dark" ? "Dark" : "Light"} theme enabled.`);
	});
});

const navToggle = document.querySelector(".nav-toggle");
const navLabels = document.querySelector("#primary-navigation");

function updateHeaderHeight() {
	const header = document.querySelector(".site-header");
	if (header) root.style.setProperty("--header-height", `${header.offsetHeight + 20}px`);
}

if ("ResizeObserver" in window) {
	const header = document.querySelector(".site-header");
	if (header) new ResizeObserver(updateHeaderHeight).observe(header);
}

updateHeaderHeight();

function setMenuOpen(isOpen) {
	if (!navToggle || !navLabels) return;
	navToggle.setAttribute("aria-expanded", String(isOpen));
	navToggle.textContent = isOpen ? "\u00D7 Close" : "\u2630 Menu";
	navLabels.classList.toggle("is-open", isOpen);
}

navToggle?.addEventListener("click", () => {
	setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
});

navLabels?.addEventListener("click", (event) => {
	if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
		setMenuOpen(false);
		navToggle.focus();
	}
});

const currentFile = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
document.querySelectorAll(".nav-labels a").forEach((link) => {
	const targetFile = decodeURIComponent(new URL(link.href, window.location.href).pathname.split("/").pop() || "index.html");
	if (targetFile === currentFile) link.setAttribute("aria-current", "page");
});

const progressBar = document.querySelector(".scroll-progress span");
const backToTop = document.querySelector(".back-to-top");
let scrollUpdateQueued = false;

function updateScrollUI() {
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
	if (progressBar) progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
	const showBackToTop = window.scrollY > 500;
	backToTop?.classList.toggle("is-visible", showBackToTop);
	backToTop?.setAttribute("tabindex", showBackToTop ? "0" : "-1");
	backToTop?.setAttribute("aria-hidden", String(!showBackToTop));
	scrollUpdateQueued = false;
}

window.addEventListener("scroll", () => {
	if (scrollUpdateQueued) return;
	scrollUpdateQueued = true;
	window.requestAnimationFrame(updateScrollUI);
}, { passive: true });

updateScrollUI();
backToTop?.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});

function safeMediaUrl(path) {
	if (typeof path !== "string" || !path.trim()) return null;
	try {
		const url = new URL(path, document.baseURI);
		if (!["http:", "https:", "file:"].includes(url.protocol)) return null;
		return url.href;
	} catch {
		return null;
	}
}

function createProjectCard(project) {
	const card = document.createElement("article");
	card.className = "project-card filter-card";
	card.dataset.category = Array.isArray(project.categories) && project.categories.length
		? project.categories.join(" ")
		: project.category || "other";
	card.id = `project-${contentSlug(project)}`;

	const imageUrl = safeMediaUrl(project.image);
	const videoUrl = safeMediaUrl(project.video);
	const projectUrl = safeMediaUrl(project.external_url);

	if (imageUrl) {
		const image = document.createElement("img");
		image.src = imageUrl;
		image.alt = project.image_alt || `${project.title || "Project"} cover image`;
		image.loading = "lazy";
		image.decoding = "async";
		image.className = project.image_fit === "cover" ? "media-cover" : "media-contain";

		if (projectUrl) {
			const link = document.createElement("a");
			link.href = projectUrl;
			if (new URL(projectUrl).origin !== window.location.origin) {
				link.target = "_blank";
				link.rel = "noopener noreferrer";
			}
			link.append(image);
			card.append(link);
		} else {
			card.append(image);
		}
	}

	if (videoUrl && !imageUrl) {
		const video = document.createElement("video");
		video.src = videoUrl;
		video.controls = true;
		video.preload = "none";
		video.playsInline = true;
		const posterUrl = safeMediaUrl(project.poster);
		if (posterUrl) video.poster = posterUrl;
		video.setAttribute("aria-label", project.title || "Project video");
		card.append(video);
	}

	const title = document.createElement("h3");
	title.textContent = project.title || "Untitled project";
	card.append(title);

	if (project.description) {
		const description = document.createElement("p");
		description.textContent = project.description;
		card.append(description);
	}

	[project.category, project.status, project.tool].filter(Boolean).forEach((label) => {
		const tag = document.createElement("span");
		tag.className = "content-tag";
		tag.textContent = label.replaceAll("-", " ");
		card.append(tag);
	});

	if (projectUrl) {
		const link = document.createElement("a");
		link.className = "project-link";
		link.href = projectUrl;
		link.textContent = "View project";
		card.append(link);
	}

	const caseStudy = document.createElement("details");
	caseStudy.className = "project-details";
	const summary = document.createElement("summary");
	summary.textContent = "Project details";
	caseStudy.append(summary);

	const caseStudyFields = [
		["Brief", project.brief],
		["My role", project.role],
		["Process", project.process],
		["Outcome and lessons", project.outcome],
		["Tools used", project.tools],
		["Project information", project.details]
	];

	caseStudyFields.forEach(([label, value]) => {
		if (!value || !String(value).trim()) return;

		const heading = document.createElement("h4");
		heading.textContent = label;
		caseStudy.append(heading);
		appendPlainText(caseStudy, value);
	});

	if (caseStudy.children.length > 1) card.append(caseStudy);

	const items = projectMediaItems(project);
	if (items.length > 2) {
		const link = document.createElement("a");
		link.className = "collection-link";
		link.href = `project-${contentSlug(project)}.html`;
		link.textContent = `View collection (${items.length} items)`;
		card.append(link);
	} else if (items.length === 2) {
		card.append(createProjectGallery(items.slice(1)));
	}

	return card;
}

function projectMediaItems(project) {
	const items = [];
	if (project.image) items.push({ image: project.image, image_alt: project.image_alt });
	if (project.video) items.push({ video: project.video, poster: project.poster, caption: project.title });
	for (const item of Array.isArray(project.gallery) ? project.gallery : []) {
		if (item.image) items.push({ image: item.image, image_alt: item.image_alt, caption: item.caption });
		if (item.video) items.push({ video: item.video, poster: item.poster, caption: item.caption });
	}
	return items;
}

function createProjectGallery(items) {
	const details = document.createElement("details");
	details.className = "project-gallery";
	const summary = document.createElement("summary");
	summary.textContent = `Explore collection (${items.length} items)`;
	const grid = document.createElement("div");
	grid.className = "project-gallery-grid";

	items.forEach((item) => {
		const figure = document.createElement("figure");
		const imageUrl = safeMediaUrl(item.image);
		const videoUrl = safeMediaUrl(item.video);

		if (imageUrl) {
			const link = document.createElement("a");
			link.href = imageUrl;
			const image = document.createElement("img");
			image.src = imageUrl;
			image.alt = item.image_alt || item.caption || "Design sample";
			image.loading = "lazy";
			image.decoding = "async";
			link.append(image);
			figure.append(link);
		}

		if (videoUrl) {
			const video = document.createElement("video");
			video.src = videoUrl;
			video.controls = true;
			video.playsInline = true;
			video.preload = "none";
			video.setAttribute("aria-label", item.caption || "Collection video");
			const poster = safeMediaUrl(item.poster);
			if (poster) video.poster = poster;
			figure.append(video);
		}

		if (item.caption) {
			const caption = document.createElement("figcaption");
			caption.textContent = item.caption;
			figure.append(caption);
		}

		grid.append(figure);
	});

	details.append(summary, grid);
	return details;
}

function contentSlug(item) {
	return String(item.slug || item.title || "item")
		.toLocaleLowerCase()
		.replace(/[^\p{L}\p{N}-]+/gu, "-")
		.replace(/^-+|-+$/g, "");
}

function restoreContentAnchor() {
	if (!window.location.hash) return;

	let target;
	try {
		target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
	} catch {
		return;
	}

	if (!target) return;
	target.querySelector("details")?.setAttribute("open", "");
	window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
}

const projectContainers = Array.from(document.querySelectorAll("[data-projects-source]"));
if (projectContainers.length && window.location.protocol !== "file:") {
	fetch("content/projects.json", { cache: "no-cache" })
		.then((response) => {
			if (!response.ok) throw new Error("Project data request failed.");
			return response.json();
		})
		.then((content) => {
			if (!Array.isArray(content.projects)) throw new Error("Project data has an invalid format.");
			projectContainers.forEach((container) => {
				const projects = container.dataset.projectsSource === "featured"
					? content.projects.filter((project) => project.featured).slice(0, 6)
					: content.projects;
				container.replaceChildren(...projects.map(createProjectCard));
			});
			document.dispatchEvent(new Event("aor:projects-updated"));
			restoreContentAnchor();
		})
		.catch(() => showToast("Showing the saved project list. Please try again later for updates."));
}

function appendPlainText(container, text) {
	String(text).split(/\n\s*\n/).forEach((paragraphText) => {
		if (!paragraphText.trim()) return;
		const paragraph = document.createElement("p");
		paragraphText.split("\n").forEach((line, index) => {
			if (index > 0) paragraph.append(document.createElement("br"));
			paragraph.append(document.createTextNode(line));
		});
		container.append(paragraph);
	});
}

function appendArticleBody(container, text) {
	String(text).split(/\n\s*\n/).forEach((block) => {
		const content = block.trim();
		if (!content) return;

		const heading = content.match(/^(#{2,3})\s+(.+)$/);
		if (heading) {
			const element = document.createElement(heading[1].length === 2 ? "h4" : "h5");
			element.textContent = heading[2];
			container.append(element);
			return;
		}

		const lines = content.split("\n");
		const isBulletList = lines.every((line) => /^-\s+/.test(line));
		const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line));

		if (isBulletList || isNumberedList) {
			const list = document.createElement(isBulletList ? "ul" : "ol");
			if (isNumberedList) list.start = Number.parseInt(lines[0], 10);

			lines.forEach((line) => {
				const item = document.createElement("li");
				item.textContent = line.replace(/^(?:-|\d+\.)\s+/, "");
				list.append(item);
			});

			container.append(list);
			return;
		}

		appendPlainText(container, content);
	});
}

function createArticleCard(article, includeBody) {
	const card = document.createElement("article");
	card.className = "article-item filter-card";
	card.dataset.category = article.category || "other";
	card.id = `article-${contentSlug(article)}`;

	const imageUrl = safeMediaUrl(article.image);
	if (imageUrl) {
		const image = document.createElement("img");
		image.src = imageUrl;
		image.alt = article.image_alt || `${article.title || "Article"} cover image`;
		image.loading = "lazy";
		image.decoding = "async";
		card.append(image);
	}

	const content = document.createElement("div");
	content.className = "article-content";
	const title = document.createElement("h3");
	title.textContent = article.title || "Untitled article";
	content.append(title);

	if (article.summary) {
		const summary = document.createElement("p");
		summary.textContent = article.summary;
		content.append(summary);
	}

	const body = String(article.body || "").trim();
	const isPublished = article.published !== false && Boolean(body);

	if (article.date && isPublished) {
		const date = new Date(`${article.date}T00:00:00`);
		if (!Number.isNaN(date.valueOf())) {
			const time = document.createElement("time");
			time.dateTime = article.date;
			time.textContent = new Intl.DateTimeFormat(root.lang, { dateStyle: "long" }).format(date);
			content.append(time);
		}
	}

	if (article.category) {
		const category = document.createElement("span");
		category.className = "content-tag";
		category.textContent = article.category.replaceAll("-", " ");
		content.append(category);
	}

	if (includeBody && isPublished) {
		const details = document.createElement("details");
		details.className = "article-details";
		const summary = document.createElement("summary");
		summary.textContent = "Read article";
		const bodyContent = document.createElement("div");
		bodyContent.className = "article-body";
		appendArticleBody(bodyContent, body);
		const wordCount = body.split(/\s+/).length;
		const readingTime = document.createElement("p");
		readingTime.className = "article-reading-time";
		readingTime.textContent = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
		details.append(summary, readingTime, bodyContent);

		const feedbackTemplate = document.querySelector("#article-feedback-template");
		if (feedbackTemplate) {
			const feedback = feedbackTemplate.content.cloneNode(true);
			const slug = contentSlug(article);

			feedback.querySelectorAll("[id], [for], [aria-labelledby], [aria-describedby], form").forEach((element) => {
				["id", "for", "aria-labelledby", "aria-describedby", "name"].forEach((attribute) => {
					const value = element.getAttribute(attribute);
					if (value) element.setAttribute(attribute, value.replaceAll("__SLUG__", slug));
				});
			});

			details.append(feedback);
		}

		content.append(details);
	} else if (isPublished) {
		const link = document.createElement("a");
		link.className = "article-link";
		link.href = `articles.html#article-${contentSlug(article)}`;
		link.textContent = "Read article";
		content.append(link);
	} else {
		const status = document.createElement("p");
		status.className = "article-status";
		status.textContent = "Coming soon";
		content.append(status);
	}

	card.append(content);
	return card;
}

const articleContainers = Array.from(document.querySelectorAll("[data-articles-source]"));
if (articleContainers.length && window.location.protocol !== "file:") {
	fetch("content/articles.json", { cache: "no-cache" })
		.then((response) => {
			if (!response.ok) throw new Error("Article data request failed.");
			return response.json();
		})
		.then((content) => {
			if (!Array.isArray(content.articles)) throw new Error("Article data has an invalid format.");
			articleContainers.forEach((container) => {
				const articles = container.dataset.articlesSource === "featured"
					? content.articles.filter((article) => article.featured)
					: content.articles;
				container.replaceChildren(...articles.map((article) => createArticleCard(article, container.dataset.articlesSource === "all")));
			});
			document.dispatchEvent(new Event("aor:articles-updated"));
			restoreContentAnchor();
		})
		.catch(() => showToast("Showing the saved article list. Please try again later for updates."));
}

const revealTargets = document.querySelectorAll("main > section");
// Keep content visible if this enhancement is unavailable or motion is reduced.
if ("IntersectionObserver" in window && !reducedMotion.matches) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add("is-visible");
			observer.unobserve(entry.target);
		});
	}, { threshold: 0 });

	revealTargets.forEach((element) => {
		element.classList.add("reveal");
		revealObserver.observe(element);
	});
} else {
	revealTargets.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".content-filters").forEach((filterGroup) => {
	const filterButtons = Array.from(filterGroup.querySelectorAll("[data-filter]"));
	const targetList = document.querySelector("[data-projects-source], [data-articles-source]");
	const filterCards = () => Array.from(targetList?.querySelectorAll(".filter-card") || []);
	const filterSearch = filterGroup.querySelector(".filter-search");
	const filterResults = document.querySelector(".filter-results");
	const filterEmpty = document.querySelector(".filter-empty");
	let selectedFilter = "all";

	const applyFilters = () => {
		const query = filterSearch?.value.trim().toLocaleLowerCase() ?? "";
		let visibleCount = 0;

		filterCards().forEach((card) => {
			const categories = (card.dataset.category || "other").split(/\s+/);
			const matchesCategory = selectedFilter === "all" || selectedFilter.split(/\s+/).some((category) => categories.includes(category));
			const matchesQuery = !query || card.textContent.toLocaleLowerCase().includes(query);
			const isVisible = matchesCategory && matchesQuery;
			card.hidden = !isVisible;
			visibleCount += Number(isVisible);
		});

		if (filterResults) filterResults.textContent = `${visibleCount} ${visibleCount === 1 ? "item" : "items"} shown.`;
		if (filterEmpty) filterEmpty.hidden = visibleCount !== 0;
	};

	filterButtons.forEach((button) => {
		button.addEventListener("click", () => {
			selectedFilter = button.dataset.filter;

			filterButtons.forEach((filterButton) => {
				filterButton.setAttribute("aria-pressed", String(filterButton === button));
			});
			applyFilters();
		});
	});

	filterSearch?.addEventListener("input", applyFilters);
	document.addEventListener("aor:projects-updated", applyFilters);
	document.addEventListener("aor:articles-updated", applyFilters);
	applyFilters();
});

window.addEventListener("hashchange", restoreContentAnchor);
restoreContentAnchor();

document.addEventListener("click", async (event) => {
	const button = event.target.closest("[data-article-action]");
	if (!button) return;
	const article = button.closest(".article-item");
	const section = button.closest(".article-feedback");
	const status = section.querySelector(".article-action-status");
	const link = new URL("articles.html", document.baseURI);
	link.hash = article.id;
	const title = article.querySelector("h3").textContent;
	status.textContent = "";
	if (["like", "comment"].includes(button.dataset.articleAction)) {
		await openArticleDiscussion(article, section, link.href, title);
		return;
	}

	if (button.dataset.articleAction !== "share") return;
	if (navigator.share) {
		try {
			await navigator.share({ title, url: link.href });
			return;
		} catch (error) {
			if (error.name === "AbortError") return;
		}
	}
	try {
		await navigator.clipboard.writeText(link.href);
		status.textContent = "Article link copied. Paste it into your preferred app to share.";
	} catch {
		const field = section.querySelector(".article-link-fallback");
		field.value = link.href;
		field.hidden = false;
		field.focus();
		field.select();
		status.textContent = "Select and copy the article link below.";
	}
});

// Set this public site identifier after registering at Disqus. Never add an API key.
const disqusShortname = "";

async function openArticleDiscussion(article, section, url, title) {
	const status = section.querySelector(".article-action-status");
	const container = section.querySelector(".article-discussion");
	if (!/^[a-z0-9][a-z0-9-]*$/.test(disqusShortname)) {
		status.textContent = "Public comments and reactions are not connected yet. Please check back soon.";
		return;
	}
	if (window.location.protocol === "file:") {
		status.textContent = "Open the website through a web server to use public comments.";
		return;
	}
	container.hidden = false;
	if (!container.querySelector("iframe")) {
		const frame = document.createElement("iframe");
		frame.title = `Comments and reactions: ${title}`;
		frame.className = "article-discussion-frame";
		// A separate document lets every article keep its own Disqus discussion.
		const encode = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
		frame.srcdoc = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0;font-family:system-ui}</style></head><body><div id="disqus_thread"></div><script>var disqus_config = function () { this.page.url = ${encode(url)}; this.page.identifier = ${encode(article.id)}; this.page.title = ${encode(title)}; }; var script = document.createElement('script'); script.src = 'https://${disqusShortname}.disqus.com/embed.js'; script.onerror = function () { document.getElementById('disqus_thread').textContent = 'Comments could not load. Please try again later.'; }; document.body.appendChild(script);<\/script></body></html>`;
		container.append(frame);
	}
	status.textContent = "Use the discussion below to react, comment, or reply. Guest commenting is available when enabled by the site owner.";
	container.focus();
}

const contactForm = document.querySelector("#email-contact-form");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");
const messageCounter = document.querySelector("#message-counter");
const contactFormStatus = document.querySelector("#contact-form-status");

if (contactForm) {
	const requestedService = new URLSearchParams(window.location.search).get("service");
	if (requestedService && subjectInput && !subjectInput.value) {
		subjectInput.value = `Inquiry about ${requestedService}`;
	}

	const serviceInput = contactForm.querySelector("#service");
	if (serviceInput && Array.from(serviceInput.options).some((option) => option.value === requestedService)) {
		serviceInput.value = requestedService;
	}

	const isLocalPreview = window.location.protocol === "file:"
		|| ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
	const submitButton = contactForm.querySelector('button[type="submit"]');

	if (isLocalPreview && submitButton) {
		submitButton.textContent = "Open email to send";
		const formNote = document.querySelector("#contact-form-note");
		if (formNote) formNote.textContent = "During local preview, your email app opens with the message ready to send. Review it there to complete delivery.";
	}

	const updateMessageCounter = () => {
		if (messageInput && messageCounter) {
			messageCounter.textContent = `${messageInput.value.length} / ${messageInput.maxLength} characters`;
		}
	};
	messageInput?.addEventListener("input", updateMessageCounter);
	updateMessageCounter();

	contactForm.addEventListener("invalid", (event) => {
		event.target.setAttribute("aria-invalid", "true");
		if (contactFormStatus) contactFormStatus.textContent = "Please correct the highlighted field before continuing.";
	}, true);

	contactForm.querySelectorAll("input, textarea, select").forEach((field) => {
		field.addEventListener("input", () => {
			field.removeAttribute("aria-invalid");
			if (contactFormStatus) contactFormStatus.textContent = "";
		});
	});

	contactForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		if (!contactForm.reportValidity()) return;

		const formData = new FormData(contactForm);
		if (formData.get("bot-field")) return;

		if (!isLocalPreview) {
			submitButton.disabled = true;
			submitButton.textContent = "Sending...";
			contactForm.setAttribute("aria-busy", "true");
			contactFormStatus.textContent = "Sending your message.";

			try {
				const response = await fetch(contactForm.action, {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: new URLSearchParams(formData).toString(),
					signal: AbortSignal.timeout(15000)
				});

				if (!response.ok) throw new Error("Message submission failed.");
				contactForm.reset();
				updateMessageCounter();
				contactFormStatus.textContent = "Thank you. Your message has been submitted.";
			} catch {
				contactFormStatus.textContent = "Your message could not be sent. Please try again or use the email link below. Your message is still here.";
			} finally {
				submitButton.disabled = false;
				submitButton.textContent = "Send message";
				contactForm.removeAttribute("aria-busy");
			}

			return;
		}

		// Local files and preview servers use the visitor's email application.
		const message = [
			`Name: ${formData.get("name")}`,
			`Email: ${formData.get("email")}`,
			`Subject: ${formData.get("subject")}`,
			`Service: ${formData.get("service") || "Not specified"}`,
			`Timeline: ${formData.get("timeline") || "Not specified"}`,
			"",
			formData.get("message")
		].join("\n");
		const emailUrl = new URL("mailto:abdulhakeemoladaporaji@gmail.com");
		emailUrl.searchParams.set("subject", String(formData.get("subject")));
		emailUrl.searchParams.set("body", message);
		if (contactFormStatus) contactFormStatus.textContent = "Opening your email app. Review the message there and send it to complete delivery.";
		window.location.href = emailUrl.toString();
	});
}
