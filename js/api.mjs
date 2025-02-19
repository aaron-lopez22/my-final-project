const EXCHANGE_API_KEY = "b4c39cecbc7e54c6518710e5"; 
const NEWSDATA_API_KEY = "pub_704836c939a75b367bfaa9b58e83c4c1af4e8";

/**
 * Fetch exchange rates for currency conversion
 */
export async function fetchExchangeRates(baseCurrency = "USD") {
    const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${baseCurrency}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Exchange API error: ${response.status}`);
        const data = await response.json();

        if (!data.conversion_rates) {
            throw new Error("Invalid exchange rate data received.");
        }

        return data.conversion_rates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
    }
}

/**
 * Fetch travel news for a specific destination using NewsData.io
 */
export async function fetchTravelNews(destination) {
    if (!destination) return [];

    const url = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(destination)}&language=en`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`NewsData.io error: ${response.status}`);
        const data = await response.json();

        return data.results || [];
    } catch (error) {
        console.error("Error fetching travel news:", error);
        return [];
    }
}