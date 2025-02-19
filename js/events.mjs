import { updateBudget, displayTravelNews } from "./ui.mjs";

export function attachEventListeners() {
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
}