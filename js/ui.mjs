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

export function pinFavoriteBudget() {
    const convertedAmountElement = document.getElementById("converted-amount");
    const convertedAmountText = convertedAmountElement ? convertedAmountElement.innerText : null;

    if (!convertedAmountText || convertedAmountText === "-") {
        alert("Convert a budget first before pinning.");
        return;
    }

    // Save pinned budget to localStorage
    localStorage.setItem("pinnedBudget", convertedAmountText);

    // Update the pinned budget display
    displayPinnedBudget();
}
export function displayPinnedBudget() {
    console.log("displayPinnedBudget() function is running...");

    const pinnedAmount = localStorage.getItem("pinnedBudget");
    console.log("Retrieved pinnedAmount from localStorage:", pinnedAmount);

    const pinnedElement = document.getElementById("pinned-amount");
    const pinnedCard = document.getElementById("favorite-budget-card");

    if (!pinnedElement || !pinnedCard) {
        console.warn("Pinned budget elements not found in the DOM. Skipping display.");
        return;
    }

    if (pinnedAmount) {
        pinnedElement.innerText = pinnedAmount;
        pinnedCard.classList.add("show");  // ✅ Use .show class to ensure it's visible
        pinnedCard.classList.remove("hidden"); // ✅ Remove hidden class if it exists
        pinnedCard.style.display = "block";  // ✅ Extra fallback in case CSS is blocking it
        console.log("Pinned budget displayed successfully.");
    } else {
        pinnedCard.classList.remove("show");  // ✅ Remove show class if no pinned budget
        pinnedCard.classList.add("hidden");   // ✅ Add hidden class to hide it
        pinnedCard.style.display = "none";
        console.log("No pinned budget found, hiding the card.");
    }
}









