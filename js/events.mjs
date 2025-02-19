import { updateBudget, displayTravelNews, pinFavoriteBudget, displayPinnedBudget } from "./ui.mjs";

export function attachEventListeners() {
    console.log("attachEventListeners() function is running...");

    if (document.getElementById("convert-budget")) {
        document.getElementById("convert-budget").addEventListener("click", () => {
            updateBudget();
        });
    }

    // Only attach "Pin Favorite" button if we are on budget.html
    const pinButton = document.getElementById("pin-favorite");
    if (pinButton) {
        console.log("Pin Favorite button found. Attaching event listener...");
        pinButton.addEventListener("click", pinFavoriteBudget);
    } else {
        console.log("Pin Favorite button not found. Skipping event attachment.");
    }

    // Load pinned budget on page load ONLY on budget.html
    if (window.location.pathname.includes("budget.html")) {
        displayPinnedBudget();
    }
}
