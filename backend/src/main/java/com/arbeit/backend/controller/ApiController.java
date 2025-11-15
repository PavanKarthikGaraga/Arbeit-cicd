package com.arbeit.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ApiController {

    @GetMapping("/")
    public ResponseEntity<?> apiInfo() {
        return ResponseEntity.ok(Map.of(
            "message", "Arbeit API Server",
            "version", "1.0.0",
            "status", "running",
            "public_endpoints", Map.of(
                "api", List.of("/ (GET)", "/api/ (GET)", "/health (GET)"),
                "auth", List.of("/auth/login (POST)", "/auth/register (POST)", "/auth/logout (POST)",
                               "/auth/change-password (POST)", "/auth/verify-email (POST)", "/auth/verify-email (PUT)"),
                "jobs", List.of("/jobs (GET)", "/jobs (POST)"),
                "applications", List.of("/applications (POST)"),
                "mentorship", List.of("/mentorship/**"),
                "project", List.of("/project/**"),
                "scanner", List.of("/scanner/**")
            ),
            "protected_endpoints", Map.of(
                "business", List.of("/business/** (BUSINESS role required)"),
                "profile", List.of("/profile (GET/PUT, USER/BUSINESS role required)")
            )
        ));
    }

    @GetMapping("/api/")
    public ResponseEntity<?> apiDetails() {
        return apiInfo();
    }

    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "timestamp", System.currentTimeMillis(),
            "service", "Arbeit API"
        ));
    }
}
