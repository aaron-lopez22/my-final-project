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
    const amount = document.getElementById("budget").value;
    const currency = document.getElementById("currency").value;

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
    document.getElementById("converted-budget").innerText = `Converted Budget: ${convertedAmount} ${currency}`;
}

/**
 * Display travel news on the page
 */
/**
 * Display travel news based on user input
 */
export async function displayTravelNews() {
    const destination = document.getElementById("destination").value.trim();
    const newsContainer = document.getElementById("news");

    if (!destination) {
        newsContainer.innerHTML = "<p>Please enter a destination to see related news.</p>";
        return;
    }

    newsContainer.innerHTML = "<p>Loading latest travel news...</p>";

    const articles = await fetchTravelNews(destination);
    if (articles.length === 0) {
        newsContainer.innerHTML = `<p>No recent travel news found for "${destination}".</p>`;
        return;
    }

    newsContainer.innerHTML = articles
        .map(article => `<p><a href="${article.url}" target="_blank">${article.title}</a></p>`)
        .join("");
}