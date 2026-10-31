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
