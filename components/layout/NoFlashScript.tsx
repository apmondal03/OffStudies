const SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem("vocab:theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export function NoFlashScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
