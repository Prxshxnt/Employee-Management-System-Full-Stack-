const employeeId = new URLSearchParams(window.location.search).get("id");

async function loadEmployee() {
    if (!employeeId) {
        showMessage("No employee ID provided", "error");
        return;
    }

    try {
        const emp = await apiRequest("/employees/" + employeeId);

        document.getElementById("fullName").textContent = emp.firstName + " " + emp.lastName;
        document.getElementById("empId").textContent = emp.id;
        document.getElementById("empEmail").textContent = emp.email;
        document.getElementById("empPhone").textContent = emp.phoneNumber || "-";
        document.getElementById("empDepartment").textContent = emp.department ? emp.department.name : "-";
        document.getElementById("empDesignation").textContent = emp.designation || "-";
        document.getElementById("empSalary").textContent = formatSalary(emp.salary);
        document.getElementById("empJoiningDate").textContent = emp.joiningDate;
        document.getElementById("editLink").href = "employee-form.html?id=" + emp.id;
    } catch (error) {
        document.getElementById("fullName").textContent = "Employee not found";
        showMessage(error.message, "error");
    }
}

loadEmployee();