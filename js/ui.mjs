import { fetchExchangeRates } from "./api.mjs";

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
 * Populate the currency dropdown dynamically
 */
export async function populateCurrencyDropdown() {
    const selectElement = document.getElementById("currency");

    // Fetch exchange rates to get available currency options
    const rates = await fetchExchangeRates("USD");
    if (!rates) {
        console.error("Failed to load currency data.");
        return;
    }

    // Clear any existing options before populating
    selectElement.innerHTML = "";

    // Add all available currencies to the dropdown
    for (const currency in rates) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        selectElement.appendChild(option);
    }
}