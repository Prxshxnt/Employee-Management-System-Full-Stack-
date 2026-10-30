package com.employee_management_system.ems.service;


import com.employee_management_system.ems.dto.DashboardResponse;
import com.employee_management_system.ems.repository.DepartmentRepository;
import com.employee_management_system.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public DashboardResponse getDashboard() {
        return new DashboardResponse(
                employeeRepository.count(),
                departmentRepository.count(),
                employeeRepository.findTop5ByOrderByIdDesc());
    }
}
