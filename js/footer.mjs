export function loadFooter() {
    const footerHTML = `
        <footer>
            <p>&copy; 2025 Smart Trip Planner</p>
        </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
}
