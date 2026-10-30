async function loadDashboard() {
    try {
        const data = await apiRequest("/dashboard");

        document.getElementById("totalEmployees").textContent = data.totalEmployees;
        document.getElementById("totalDepartments").textContent = data.totalDepartments;

        const tbody = document.getElementById("recentBody");

        if (data.recentEmployees.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="empty">No employees yet</td></tr>';
            return;
        }

        tbody.innerHTML = data.recentEmployees.map(emp => `
            <tr>
                <td><a href="employee-details.html?id=${emp.id}">
                    ${escapeHtml(emp.firstName)} ${escapeHtml(emp.lastName)}</a></td>
                <td>${escapeHtml(emp.designation)}</td>
                <td>${emp.department ? escapeHtml(emp.department.name) : "-"}</td>
                <td>${escapeHtml(emp.joiningDate)}</td>
            </tr>
        `).join("");
    } catch (error) {
        showMessage(error.message, "error");
    }
}

loadDashboard();