import { updateBudget, displayTravelNews, pinFavoriteBudget, removePinnedBudget, displayPinnedBudget } from "./ui.mjs";

export function attachEventListeners() {
    console.log("attachEventListeners() function is running...");

    if (document.getElementById("convert-budget")) {
        document.getElementById("convert-budget").addEventListener("click", () => {
            updateBudget();
        });
    }

    // Attach event to Pin Favorite button
    const pinButton = document.getElementById("pin-favorite");
    if (pinButton) {
        console.log("Pin Favorite button found. Attaching event listener...");
        pinButton.addEventListener("click", pinFavoriteBudget);
    }

    // Attach event to Remove Pinned Budget button
    const removeButton = document.getElementById("remove-pinned");
    if (removeButton) {
        console.log("Remove Pinned button found. Attaching event listener...");
        removeButton.addEventListener("click", removePinnedBudget);
    } else {
        console.warn("Remove Pinned button not found in the DOM.");
    }

    // Display pinned budget if available
    displayPinnedBudget();
}