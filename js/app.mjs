import { loadHeader } from "./header.mjs";
import { loadFooter } from "./footer.mjs";
import { attachEventListeners } from "./events.mjs";
import { populateCurrencyDropdown, displayPinnedBudget } from "./ui.mjs";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    // Load Header and Footer dynamically
    loadHeader();
    loadFooter();

    // Attach event listeners and populate currency dropdown
    attachEventListeners();
    populateCurrencyDropdown();

    // Run pinned budget logic ONLY on budget.html
    if (window.location.pathname.includes("budget.html")) {
        console.log("Running budget-specific features...");
        displayPinnedBudget();
    }

    // Retrieve saved data from LocalStorage (only on budget.html)
    if (window.location.pathname.includes("budget.html")) {
        const savedBudget = localStorage.getItem("budget");
        const savedCurrency = localStorage.getItem("currency");

        const budgetInput = document.getElementById("budget");
        const currencySelect = document.getElementById("currency");

        if (budgetInput && savedBudget) {
            budgetInput.value = savedBudget;
        }

        if (currencySelect && savedCurrency) {
            currencySelect.value = savedCurrency;
        }
    }
});
