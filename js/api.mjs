const EXCHANGE_API_KEY = "b4c39cecbc7e54c6518710e5"; // Your API key

/**
 * Fetch exchange rates for currency conversion
 * @param {string} baseCurrency - The base currency (e.g., "USD")
 * @returns {Promise<object>} - Exchange rates data
 */
export async function fetchExchangeRates(baseCurrency = "USD") {
    const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${baseCurrency}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Exchange API error: ${response.status}`);
        }
        const data = await response.json();
        return data.conversion_rates; // Return exchange rates
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
    }
}