export function loadHeader() {
    document.getElementById("header").innerHTML = `
        <header>
            <h1>Smart Trip Planner</h1>
            <nav>
                <ul>
                    <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="budget.html"><i class="fas fa-dollar-sign"></i> Budget</a></li>
                    <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
                </ul>
            </nav>
            <section class="hero">
                <div class="hero-overlay">
                    <h2>Plan Your Perfect Trip</h2>
                    <p>Convert your budget and explore new destinations with ease</p>
                </div>
            </section>
        </header>
    `;
}
