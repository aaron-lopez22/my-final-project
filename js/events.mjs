import { updateBudget, displayTravelNews, pinFavoriteBudget, displayPinnedBudget } from "./ui.mjs";

export function attachEventListeners() {
    console.log("Attaching event listeners...");

    if (document.getElementById("plan-trip")) {
        document.getElementById("plan-trip").addEventListener("click", () => {
            updateBudget();
            displayTravelNews();
        });
    }

    if (document.getElementById("convert-budget")) {
        document.getElementById("convert-budget").addEventListener("click", () => {
            updateBudget();
        });
    }

    if (window.location.pathname.includes("budget.html")) {
        const saveFavoriteBtn = document.getElementById("save-favorite");
        if (saveFavoriteBtn) {
            console.log("Adding event listener to Save Favorite button...");
            saveFavoriteBtn.addEventListener("click", pinFavoriteBudget);
        } else {
            console.warn("Save Favorite button not found in the DOM.");
        }

        const removePinnedBtn = document.getElementById("remove-pinned");
        if (removePinnedBtn) {
            console.log("Adding event listener to Remove Pinned button...");
            removePinnedBtn.addEventListener("click", () => {
                localStorage.removeItem("pinnedBudget");
                displayPinnedBudget();
            });
        } else {
            console.warn("Remove Pinned button not found in the DOM.");
        }
    }
}