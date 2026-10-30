// If the URL is employee-form.html?id=5, we are in EDIT mode. Otherwise ADD mode.
const params = new URLSearchParams(window.location.search);
const employeeId = params.get("id");
const form = document.getElementById("employeeForm");

async function loadDepartments() {
    const departments = await apiRequest("/departments");
    const select = document.getElementById("department");

    departments.forEach(dep => {
        const option = document.createElement("option");
        option.value = dep.id;
        option.textContent = dep.name;
        select.appendChild(option);
    });
}

async function loadEmployeeForEdit() {
    const emp = await apiRequest("/employees/" + employeeId);

    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("phoneNumber").value = emp.phoneNumber || "";
    document.getElementById("designation").value = emp.designation || "";
    document.getElementById("salary").value = emp.salary;
    document.getElementById("joiningDate").value = emp.joiningDate;
    document.getElementById("department").value = emp.department ? emp.department.id : "";
}

async function init() {
    try {
        await loadDepartments();

        if (employeeId) {
            document.getElementById("formTitle").textContent = "Edit Employee";
            document.getElementById("submitBtn").textContent = "Update Employee";
            await loadEmployeeForEdit();
        }
    } catch (error) {
        showMessage(error.message, "error");
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();   // stop the browser's default page reload

    const departmentValue = document.getElementById("department").value;

    const employee = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        salary: Number(document.getElementById("salary").value),
        joiningDate: document.getElementById("joiningDate").value,
        department: departmentValue ? { id: Number(departmentValue) } : null
    };

    try {
        if (employeeId) {
            await apiRequest("/employees/" + employeeId, {
                method: "PUT",
                body: JSON.stringify(employee)
            });
        } else {
            await apiRequest("/employees", {
                method: "POST",
                body: JSON.stringify(employee)
            });
        }
        showMessage("Employee saved successfully", "success");
        setTimeout(() => { window.location.href = "employees.html"; }, 1000);
    } catch (error) {
        showMessage(error.message, "error");
    }
});

init();