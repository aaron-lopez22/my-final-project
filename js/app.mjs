import { populateCurrencyDropdown, displayTravelNews } from "./ui.mjs";
import { attachEventListeners } from "./events.mjs";

document.addEventListener("DOMContentLoaded", () => {
    attachEventListeners(); // Attach button event listeners
    populateCurrencyDropdown(); // Populate currency dropdown
    displayTravelNews(); // Fetch and display travel news
});