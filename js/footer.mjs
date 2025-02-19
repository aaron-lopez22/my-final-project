export function loadFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `<p>&copy; 2025 Smart Trip Planner</p>`;
    document.body.appendChild(footer);
}