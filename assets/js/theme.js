// Mark scripting as available before the first paint, so pages can hide content that
// scripts are about to rearrange (e.g. the Projects grid) instead of flashing it.
document.documentElement.classList.add("js");

// Apply the visitor's theme before the stylesheet is displayed.
try {
  const savedTheme = window.localStorage.getItem("aor-theme");
  const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  document.documentElement.dataset.theme = ["light", "dark"].includes(savedTheme)
    ? savedTheme
    : systemIsDark ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
