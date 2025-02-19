import { loadHeader } from "./header.mjs";
import { loadFooter } from "./footer.mjs";
import { attachEventListeners } from "./events.mjs";
import { populateCurrencyDropdown } from "./ui.mjs";

document.addEventListener("DOMContentLoaded", () => {
    // Load Header and Footer dynamically
    loadHeader();
    loadFooter();

    // Attach event listeners and populate currency dropdown
    attachEventListeners();
    populateCurrencyDropdown();

    // Retrieve saved data from LocalStorage
    const savedDestination = localStorage.getItem("destination");
    const savedBudget = localStorage.getItem("budget");
    const savedCurrency = localStorage.getItem("currency");

    // Pre-fill inputs if saved data exists
    if (savedDestination) document.getElementById("destination").value = savedDestination;
    if (savedBudget) document.getElementById("budget").value = savedBudget;
    if (savedCurrency) document.getElementById("currency").value = savedCurrency;
});
