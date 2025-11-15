package com.arbeit.backend.controller;

import com.arbeit.backend.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/scanner")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ScannerController {

    private final GeminiService geminiService;

    public ScannerController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyze(@RequestBody Map<String, String> body) {
        try {
            String resumeText = body.get("resumeText");
            if (resumeText == null || resumeText.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "resumeText is required"));
            }

            // Use Gemini to analyze the resume
            String analysis = geminiService.analyzeResume(resumeText);

            return ResponseEntity.ok(Map.of("analysis", analysis));
        } catch (RuntimeException e) {
            if (e.getMessage().contains("API key")) {
                return ResponseEntity.status(503)
                        .body(Map.of("error", "AI service configuration error"));
            } else if (e.getMessage().contains("Failed to")) {
                return ResponseEntity.status(503)
                        .body(Map.of("error", "AI service temporarily unavailable"));
            } else {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", e.getMessage()));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Failed to analyze resume"));
        }
    }
}


