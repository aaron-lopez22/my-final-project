import { loadHeader } from "./header.mjs";
import { loadFooter } from "./footer.mjs";
import { attachEventListeners } from "./events.mjs";
import { populateCurrencyDropdown, displayPinnedBudget } from "./ui.mjs";

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();

    attachEventListeners();
    populateCurrencyDropdown();

    // Check if we are on budget.html before loading pinned budget
    if (window.location.pathname.includes("budget.html")) {
        displayPinnedBudget();
    }

    // Retrieve saved data
    const savedDestination = localStorage.getItem("destination");
    const savedBudget = localStorage.getItem("budget");
    const savedCurrency = localStorage.getItem("currency");

    if (savedDestination) document.getElementById("destination").value = savedDestination;
    if (savedBudget) document.getElementById("budget").value = savedBudget;
    if (savedCurrency) document.getElementById("currency").value = savedCurrency;
});