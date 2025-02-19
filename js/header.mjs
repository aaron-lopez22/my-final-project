export function loadHeader() {
    const header = document.createElement("header");
    header.innerHTML = `
        <h1>Smart Trip Planner</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="budget.html">Budget</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        <section class="hero">
            <div class="hero-overlay">
                <h2>Plan Your Perfect Trip</h2>
                <p>Convert your budget and explore new destinations with ease</p>
            </div>
        </section>
    `;
    document.body.prepend(header);
}