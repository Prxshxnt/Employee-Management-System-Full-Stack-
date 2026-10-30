package com.employee_management_system.ems.service;


import com.employee_management_system.ems.entity.Department;
import com.employee_management_system.ems.entity.Employee;
import com.employee_management_system.ems.exception.DuplicateResourceException;
import com.employee_management_system.ems.exception.ResourceNotFoundException;
import com.employee_management_system.ems.repository.DepartmentRepository;
import com.employee_management_system.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public Employee createEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new DuplicateResourceException(
                    "Employee with email " + employee.getEmail() + " already exists");
        }
        employee.setId(null);
        employee.setDepartment(findDepartmentOrNull(employee.getDepartment()));
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll(Sort.by("id"));
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + id));
    }

    public Employee updateEmployee(Long id, Employee details) {
        Employee existing = getEmployeeById(id);

        if (employeeRepository.existsByEmailAndIdNot(details.getEmail(), id)) {
            throw new DuplicateResourceException(
                    "Employee with email " + details.getEmail() + " already exists");
        }

        existing.setFirstName(details.getFirstName());
        existing.setLastName(details.getLastName());
        existing.setEmail(details.getEmail());
        existing.setPhoneNumber(details.getPhoneNumber());
        existing.setDesignation(details.getDesignation());
        existing.setSalary(details.getSalary());
        existing.setJoiningDate(details.getJoiningDate());
        existing.setDepartment(findDepartmentOrNull(details.getDepartment()));

        return employeeRepository.save(existing);
    }

    public void deleteEmployee(Long id) {
        Employee existing = getEmployeeById(id);
        employeeRepository.delete(existing);
    }

    public List<Employee> searchEmployees(String name) {
        return employeeRepository.searchByName(name.trim());
    }

    public Employee assignDepartment(Long employeeId, Long departmentId) {
        Employee employee = getEmployeeById(employeeId);
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Department not found with id: " + departmentId));
        employee.setDepartment(department);
        return employeeRepository.save(employee);
    }

    // The client sends only {"id": 2}. We load the full department from the database.
    private Department findDepartmentOrNull(Department department) {
        if (department == null || department.getId() == null) {
            return null;
        }
        return departmentRepository.findById(department.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Department not found with id: " + department.getId()));
    }
}
