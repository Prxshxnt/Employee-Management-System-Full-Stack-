package com.employee_management_system.ems.service;

import com.employee_management_system.ems.entity.Department;
import com.employee_management_system.ems.exception.DuplicateResourceException;
import com.employee_management_system.ems.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public Department createDepartment(Department department) {
        if (departmentRepository.existsByNameIgnoreCase(department.getName())) {
            throw new DuplicateResourceException(
                    "Department already exists: " + department.getName());
        }
        department.setId(null);
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll(Sort.by("id"));
    }
}