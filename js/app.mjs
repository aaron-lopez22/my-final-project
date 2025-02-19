import { populateCurrencyDropdown, displayTravelNews } from "./ui.mjs";
import { attachEventListeners } from "./events.mjs";

document.addEventListener("DOMContentLoaded", () => {
    attachEventListeners();
    populateCurrencyDropdown();
});