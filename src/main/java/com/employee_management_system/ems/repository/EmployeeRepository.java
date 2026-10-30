package com.employee_management_system.ems.repository;

import com.employee_management_system.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    List<Employee> findTop5ByOrderByIdDesc();

    @Query("SELECT e FROM Employee e " +
            "WHERE LOWER(CONCAT(e.firstName, ' ', e.lastName)) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "ORDER BY e.id")
    List<Employee> searchByName(@Param("name") String name);
}
