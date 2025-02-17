import { fetchExchangeRates, fetchTravelNews } from "./api.mjs";

/**
 * Populate the currency dropdown dynamically
 */
export async function populateCurrencyDropdown() {
    const selectElement = document.getElementById("currency");

    // Fetch exchange rates to get available currency options
    const rates = await fetchExchangeRates("USD");
    if (!rates) {
        console.error("Failed to load currency data.");
        selectElement.innerHTML = `
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
        `;
        return;
    }

    // Clear existing options
    selectElement.innerHTML = "";

    // Populate all available currencies
    for (const currency in rates) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        selectElement.appendChild(option);
    }
}

/**
 * Update the budget display with converted currency values
 */
export async function updateBudget() {
    const amount = parseFloat(document.getElementById("budget").value);
    const currency = document.getElementById("currency").value;
    const budgetCard = document.getElementById("budget-card");
    const convertedAmountElement = document.getElementById("converted-amount");

    if (!amount) {
        alert("Please enter a budget amount.");
        return;
    }

    const rates = await fetchExchangeRates("USD");
    if (!rates || !rates[currency]) {
        alert("Error fetching currency data.");
        return;
    }

    const convertedAmount = (amount * rates[currency]).toFixed(2);
    
    // Faster animation
    let start = 0;
    let step = Math.max(1, Math.floor(convertedAmount / 50)); // Adjust step size based on amount
    let animationSpeed = 20; // Lower = faster

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
    budgetCard.classList.add("show");
    animateCounter();
}

/**
 * Display travel news based on user input with staggered animation
 */
export async function displayTravelNews() {
    const destination = document.getElementById("destination").value.trim();
    const newsContainer = document.getElementById("news");

    if (!destination) {
        newsContainer.innerHTML = "<p>Please enter a destination to see related news.</p>";
        return;
    }

    newsContainer.innerHTML = `<div class="loading-animation"></div>`;

    const articles = await fetchTravelNews(destination);
    if (articles.length === 0) {
        newsContainer.innerHTML = `<p>No recent travel news found for "${destination}".</p>`;
        return;
    }

    newsContainer.innerHTML = articles
        .map(article => `
            <div class="news-article">
                <img src="${article.urlToImage || 'assets/images/news-placeholder.jpg'}" alt="News Image" class="news-image">
                <div class="news-content">
                    <p><a href="${article.url}" target="_blank">${article.title}</a></p>
                </div>
            </div>
        `)
        .join("");

    // Trigger animation with staggered effect
    setTimeout(() => {
        document.querySelectorAll(".news-article").forEach((article, index) => {
            setTimeout(() => {
                article.classList.add("show");
            }, index * 200); // Delay each card by 200ms
        });
    }, 100);
}