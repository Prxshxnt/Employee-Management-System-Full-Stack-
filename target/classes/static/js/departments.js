const departmentBody = document.getElementById("departmentBody");

async function loadDepartments() {
    try {
        const departments = await apiRequest("/departments");

        if (departments.length === 0) {
            departmentBody.innerHTML = '<tr><td colspan="3" class="empty">No departments yet</td></tr>';
            return;
        }

        departmentBody.innerHTML = departments.map(dep => `
            <tr>
                <td>${dep.id}</td>
                <td>${escapeHtml(dep.name)}</td>
                <td>${escapeHtml(dep.description)}</td>
            </tr>
        `).join("");
    } catch (error) {
        showMessage(error.message, "error");
    }
}

document.getElementById("departmentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const department = {
        name: document.getElementById("deptName").value.trim(),
        description: document.getElementById("deptDescription").value.trim()
    };

    try {
        await apiRequest("/departments", {
            method: "POST",
            body: JSON.stringify(department)
        });
        event.target.reset();
        showMessage("Department added successfully", "success");
        loadDepartments();
    } catch (error) {
        showMessage(error.message, "error");
    }
});

loadDepartments();