package com.arbeit.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/scanner")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ScannerController {

    @PostMapping("/analyze")
    public ResponseEntity<?> analyze(@RequestBody Map<String, String> body) {
        String resumeText = body.get("resumeText");
        if (resumeText == null || resumeText.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "resumeText is required"));
        }

        // Mock analysis
        String analysis = "Resume analysis score: 92/100\n\n" +
                "Keywords match: High\nFormat: Good\nContent quality: Strong\n\n" +
                "Suggestions:\n- Tailor keywords to job description\n- Quantify achievements";
        return ResponseEntity.ok(Map.of("analysis", analysis));
    }
}


