import { updateBudget, displayTravelNews } from "./ui.mjs";


export function attachEventListeners() {
    document.getElementById("plan-trip").addEventListener("click", () => {
        const destination = document.getElementById("destination").value;
        const budget = document.getElementById("budget").value;
        const currency = document.getElementById("currency").value;

        // Store in localStorage
        localStorage.setItem("destination", destination);
        localStorage.setItem("budget", budget);
        localStorage.setItem("currency", currency);

        updateBudget();
        displayTravelNews();
    });
}