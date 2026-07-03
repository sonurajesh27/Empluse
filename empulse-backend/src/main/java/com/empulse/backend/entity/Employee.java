package com.empulse.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String employeeCode;

    @Column(nullable = false)
    private String name;

    private String sector;
    private String role;
    private String roleType;
    private String pin;
    private LocalDateTime createdAt;

    public Employee() {}

    public Employee(UUID id, String employeeCode, String name, String sector, String role, String roleType, String pin, LocalDateTime createdAt) {
        this.id = id;
        this.employeeCode = employeeCode;
        this.name = name;
        this.sector = sector;
        this.role = role;
        this.roleType = roleType;
        this.pin = pin;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getEmployeeCode() { return employeeCode; }
    public void setEmployeeCode(String employeeCode) { this.employeeCode = employeeCode; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getRoleType() { return roleType; }
    public void setRoleType(String roleType) { this.roleType = roleType; }
    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static EmployeeBuilder builder() { return new EmployeeBuilder(); }

    public static class EmployeeBuilder {
        private UUID id;
        private String employeeCode;
        private String name;
        private String sector;
        private String role;
        private String roleType;
        private String pin;
        private LocalDateTime createdAt;

        public EmployeeBuilder id(UUID id) { this.id = id; return this; }
        public EmployeeBuilder employeeCode(String employeeCode) { this.employeeCode = employeeCode; return this; }
        public EmployeeBuilder name(String name) { this.name = name; return this; }
        public EmployeeBuilder sector(String sector) { this.sector = sector; return this; }
        public EmployeeBuilder role(String role) { this.role = role; return this; }
        public EmployeeBuilder roleType(String roleType) { this.roleType = roleType; return this; }
        public EmployeeBuilder pin(String pin) { this.pin = pin; return this; }
        public EmployeeBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Employee build() {
            return new Employee(id, employeeCode, name, sector, role, roleType, pin, createdAt);
        }
    }
}
