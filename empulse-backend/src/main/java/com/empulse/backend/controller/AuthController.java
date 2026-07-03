package com.empulse.backend.controller;

import com.empulse.backend.entity.Employee;
import com.empulse.backend.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final EmployeeRepository employeeRepository;

    public AuthController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String pin = body.get("pin");
        if (pin == null || pin.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "PIN is required"));
        }

        return employeeRepository.findByPin(pin)
                .map(employee -> ResponseEntity.ok((Object) employee))
                .orElse(ResponseEntity.status(401).build());
    }
}
