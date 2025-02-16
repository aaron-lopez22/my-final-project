import { updateBudget, displayTravelNews } from "./ui.mjs";

export function attachEventListeners() {
    document.getElementById("plan-trip").addEventListener("click", () => {
        updateBudget();
        displayTravelNews(); // Fetch travel news for the entered destination
    });
}