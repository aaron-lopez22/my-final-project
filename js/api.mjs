const EXCHANGE_API_KEY = "b4c39cecbc7e54c6518710e5"; // Exchange Rate API Key
const NEWS_API_KEY = "6b2f9a8027f4465eb57f4b454d77a33f"; // News API Key

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
 * Fetch travel news from the News API
/**
 * Fetch travel news for a specific destination
 * @param {string} destination - The destination entered by the user
 * @returns {Promise<Array>} - List of travel news articles
 */
export async function fetchTravelNews(destination) {
    if (!destination) return []; // Prevent API call if no destination is provided

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(destination)}&apiKey=${NEWS_API_KEY}`;
    try {
        console.log(`Fetching travel news for: ${destination} from: ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`News API error: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Travel News:", data);
        return data.articles.slice(0, 5); // Return only the first 5 news articles
    } catch (error) {
        console.error("Error fetching travel news:", error);
        return [];
    }
}