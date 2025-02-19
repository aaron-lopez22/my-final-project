const EXCHANGE_API_KEY = "b4c39cecbc7e54c6518710e5"; // Exchange Rate API Key
const NEWSDATA_API_KEY = "pub_704836c939a75b367bfaa9b58e83c4c1af4e8";


/**
 * Fetch exchange rates for currency conversion
 * @param {string} baseCurrency - The base currency (e.g., "USD")
 * @returns {Promise<object>} - Exchange rates data
 */
export async function fetchExchangeRates(baseCurrency = "USD") {
    const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${baseCurrency}`;
    try {
        console.log(`Fetching exchange rates from: ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Exchange API error: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Exchange Rates:", data);
        return data.conversion_rates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
    }
}

/**
 * Fetch travel news for a specific destination using NewsData.io
 * @param {string} destination - The destination entered by the user
 * @returns {Promise<Array>} - List of travel news articles
 */
export async function fetchTravelNews(destination) {
    if (!destination) return [];

    // Build API request URL using only the destination
    const url = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}
        &q=${encodeURIComponent(destination)}
        &language=en`
        .replace(/\s+/g, ""); // Clean up spaces

    try {
        console.log(`Fetching travel news for: ${destination} from: ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`NewsData.io error: ${response.status} - ${response.statusText}`);

        const data = await response.json();
        console.log("Fetched Travel News:", data);

        return data.results || [];
    } catch (error) {
        console.error("Error fetching travel news:", error);
        return [];
    }
}