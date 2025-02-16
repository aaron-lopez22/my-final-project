import { fetchExchangeRates } from "./api.mjs";

/**
 * Update the budget display with converted currency values
 */
export async function updateBudget() { // ✅ Ensure function is exported
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