package com.employee_management_system.ems.dto;


import com.employee_management_system.ems.entity.Employee;

import java.util.List;

public record DashboardResponse(
        long totalEmployees,
        long totalDepartments,
        List<Employee> recentEmployees) {
}
