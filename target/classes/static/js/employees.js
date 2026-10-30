let selectedEmployeeId = null;

const tbody = document.getElementById("employeeBody");
const searchInput = document.getElementById("searchInput");
const deleteModal = document.getElementById("deleteModal");

async function loadEmployees(name = "") {
    try {
        const path = name
            ? "/employees/search?name=" + encodeURIComponent(name)
            : "/employees";
        const employees = await apiRequest(path);
        renderEmployees(employees);
    } catch (error) {
        showMessage(error.message, "error");
    }
}

function renderEmployees(employees) {
    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty">No employees found</td></tr>';
        return;
    }

    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${escapeHtml(emp.firstName)} ${escapeHtml(emp.lastName)}</td>
            <td>${escapeHtml(emp.email)}</td>
            <td>${emp.department ? escapeHtml(emp.department.name) : "-"}</td>
            <td>${escapeHtml(emp.designation)}</td>
            <td>${formatSalary(emp.salary)}</td>
            <td>
                <a href="employee-details.html?id=${emp.id}" class="btn btn-secondary btn-small">View</a>
                <a href="employee-form.html?id=${emp.id}" class="btn btn-primary btn-small">Edit</a>
                <button class="btn btn-danger btn-small btn-delete"
                        data-id="${emp.id}"
                        data-name="${escapeHtml(emp.firstName + ' ' + emp.lastName)}">Delete</button>
            </td>
        </tr>
    `).join("");
}

// ---- Delete with confirmation ----
tbody.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-delete");
    if (!button) return;

    selectedEmployeeId = button.dataset.id;
    document.getElementById("deleteText").textContent =
        "Are you sure you want to delete " + button.dataset.name + "? This cannot be undone.";
    deleteModal.classList.remove("hidden");
});

function closeModal() {
    deleteModal.classList.add("hidden");
    selectedEmployeeId = null;
}

document.getElementById("cancelDelete").addEventListener("click", closeModal);

document.getElementById("confirmDelete").addEventListener("click", async () => {
    try {
        await apiRequest("/employees/" + selectedEmployeeId, { method: "DELETE" });
        closeModal();
        showMessage("Employee deleted successfully", "success");
        loadEmployees(searchInput.value.trim());
    } catch (error) {
        closeModal();
        showMessage(error.message, "error");
    }
});

// ---- Search ----
document.getElementById("searchBtn").addEventListener("click", () => {
    loadEmployees(searchInput.value.trim());
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        loadEmployees(searchInput.value.trim());
    }
});

document.getElementById("clearBtn").addEventListener("click", () => {
    searchInput.value = "";
    loadEmployees();
});

loadEmployees();