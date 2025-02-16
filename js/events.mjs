import { updateBudget } from "./ui.mjs"; // ✅ Ensure this matches `ui.mjs`

export function attachEventListeners() {
    document.getElementById("plan-trip").addEventListener("click", () => {
        updateBudget();
    });
}