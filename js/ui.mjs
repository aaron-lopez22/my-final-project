import { fetchExchangeRates, fetchTravelNews } from "./api.mjs";

/**
 * Populate the currency dropdown dynamically
 */
export async function populateCurrencyDropdown() {
    const selectElement = document.getElementById("currency");

    const rates = await fetchExchangeRates("USD");
    if (!rates) {
        console.error("Failed to fetch exchange rates.");
        selectElement.innerHTML = `
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
        `;
        return;
    }

    selectElement.innerHTML = Object.keys(rates)
        .map(currency => `<option value="${currency}">${currency}</option>`)
        .join("");
}

/**
 * Update the budget display with converted currency values
 */
export async function updateBudget() {
    const amount = parseFloat(document.getElementById("budget").value);
    const currency = document.getElementById("currency").value;
    const convertedAmountElement = document.getElementById("converted-amount");

    if (!amount || !currency) {
        alert("Please enter a valid budget amount and select a currency.");
        return;
    }

    const rates = await fetchExchangeRates("USD");
    if (!rates || !rates[currency]) {
        alert("Error fetching currency data.");
        return;
    }

    const convertedAmount = (amount * rates[currency]).toFixed(2);

    // Smooth number animation
    let start = 0;
    let step = Math.max(1, Math.floor(convertedAmount / 50)); 
    let animationSpeed = 20; 

    function animateCounter() {
        start += step;
        if (start >= convertedAmount) {
            convertedAmountElement.innerText = `${convertedAmount} ${currency}`;
            return;
        }
        convertedAmountElement.innerText = `${start} ${currency}`;
        setTimeout(animateCounter, animationSpeed);
    }

    // Show and animate the card
    document.getElementById("budget-card").classList.add("show");
    animateCounter();
}

/**
 * Display travel news
 */
export async function displayTravelNews() {
    const destination = document.getElementById("destination").value.trim();
    const newsContainer = document.getElementById("news");

    if (!destination) {
        newsContainer.innerHTML = "<p>Please enter a destination to see news.</p>";
        return;
    }

    newsContainer.innerHTML = "<div class='loading-animation'></div>";

    const articles = await fetchTravelNews(destination);
    if (articles.length === 0) {
        newsContainer.innerHTML = `<p>No recent travel news found for "${destination}".</p>`;
        return;
    }

    newsContainer.innerHTML = articles
        .map(article => `
            <div class="news-article">
                <img src="${article.image_url || 'assets/images/news-placeholder.jpg'}" class="news-image">
                <div class="news-content">
                    <p><a href="${article.link}" target="_blank">${article.title}</a></p>
                </div>
            </div>
        `)
        .join("");

    document.querySelectorAll(".news-article").forEach((article, index) => {
        setTimeout(() => article.classList.add("show"), index * 200);
    });
}