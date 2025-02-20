export function loadFooter() {
    document.getElementById("footer").innerHTML = `
        <div class="footer-container">
            <p>&copy; 2025 Smart Trip Planner | <a href="privacy.html">Privacy Policy</a> | <a href="terms.html">Terms of Service</a></p>
            <div class="footer-social">
                <a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="https://facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="https://instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
            <button id="toggle-dark-mode"><i class="fas fa-moon"></i> Dark Mode</button>
        </div>
    `;
    
    // Add event listener to toggle dark mode
    document.getElementById("toggle-dark-mode").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Preserve Dark Mode state on reload
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}