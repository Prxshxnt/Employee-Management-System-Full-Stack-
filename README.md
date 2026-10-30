# 👥 Employee Management System

A beginner-friendly full-stack web app to manage employees and departments, built with Spring Boot, PostgreSQL and vanilla JavaScript.

## ✨ Features
- Add, view, update and delete employees
- Search employees by name
- Employee details page
- Create departments and assign them to employees
- Dashboard with total employees, total departments and recently added employees
- Input validation, duplicate email check and clear error messages
- Delete confirmation popup
- Responsive design (desktop, tablet, mobile)

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
- **Backend:** Java 21, Spring Boot 4, Spring Web, Spring Data JPA, Hibernate, Maven
- **Database:** PostgreSQL
- **Tools:** IntelliJ IDEA, Postman, pgAdmin 4, Git, GitHub

## 🏗️ Architecture
```
Browser (HTML/CSS/JS) → Controller → Service → Repository → PostgreSQL
```

## 📁 Project Structure
```
src/main
├── java/com/example/ems
│   ├── controller    # REST endpoints
│   ├── service       # business logic
│   ├── repository    # database access (JPA)
│   ├── entity        # Employee, Department
│   ├── dto           # DashboardResponse
│   └── exception     # custom exceptions + global handler
└── resources
    ├── application.properties
    └── static        # frontend (HTML, css/, js/)
```

## 🗄️ Database
- `department` (id, name, description)
- `employee` (id, first_name, last_name, email, phone_number, designation, salary, joining_date, department_id)
- One department has many employees (foreign key `department_id`); email is unique.

## ⚙️ Setup
1. Install JDK 17+, Maven and PostgreSQL.
2. Create a database:
   ```sql
   CREATE DATABASE employee_management;
   ```
3. Set your database password as an environment variable:
   ```
   DB_PASSWORD=your_password
   ```
   (Username defaults to `postgres`; change it in `application.properties` if needed.)
4. Run the app:
   ```
   mvn spring-boot:run
   ```
   or run `EmsApplication` from IntelliJ.
5. Open http://localhost:8080

Tables are created automatically on first run.

## 🔗 API Endpoints
| Method | URL | Description |
|---|---|---|
| POST | `/api/employees` | Add employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/employees/search?name=` | Search by name |
| PUT | `/api/employees/{id}/department/{deptId}` | Assign department |
| POST | `/api/departments` | Add department |
| GET | `/api/departments` | Get all departments |
| GET | `/api/dashboard` | Dashboard data |

**Sample request** (`POST /api/employees`):
```json
{
  "firstName": "Asha",
  "lastName": "Verma",
  "email": "asha.verma@company.com",
  "phoneNumber": "9876543210",
  "designation": "Software Engineer",
  "salary": 65000,
  "joiningDate": "2026-10-01",
  "department": { "id": 1 }
}
```

**Status codes:** `200` OK, `201` Created, `204` No Content, `400` Validation error, `404` Not found, `409` Duplicate.



## 👨‍💻 Author
**Prashant**
GitHub: [Prxshxnt](https://github.com/Prxshxnt)
