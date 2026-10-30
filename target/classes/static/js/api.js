// Same server serves the pages and the API, so a relative URL works.
const API_BASE = "/api";

// One function that every page uses to talk to the backend.
async function apiRequest(path, options = {}) {
    const response = await fetch(API_BASE + path, {
        headers: { "Content-Type": "application/json" },
        ...options
    });

    // 204 No Content (used by DELETE) has no body to read.
    if (response.status === 204) {
        return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        let message = (data && data.message) ? data.message : "Something went wrong";
        if (data && data.errors) {
            message = Object.values(data.errors).join(", ");
        }
        throw new Error(message);
    }
    return data;
}

// Prevents user-typed text from being treated as HTML.
function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatSalary(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
}

function showMessage(text, type = "success") {
    const box = document.getElementById("message");
    if (!box) return;
    box.textContent = text;
    box.className = "message " + type;
    setTimeout(() => { box.className = "message hidden"; }, 4000);
}