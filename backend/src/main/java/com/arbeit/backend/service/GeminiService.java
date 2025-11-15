package com.arbeit.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

import java.util.Map;
import java.util.HashMap;

@Service
public class GeminiService {

    @Value("${app.gemini.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    public String generateRoadmap(String dreamRole, String currentSkills) {
        String prompt = String.format(
            "Create a detailed career roadmap for someone who wants to become a %s. " +
            "Their current skills are: %s.\n\n" +
            "IMPORTANT: Structure your response in the following EXACT format that the application can parse:\n\n" +
            "**Milestone 1: [Milestone Title]**\n" +
            "Goals:\n" +
            "1. [Specific actionable goal]\n" +
            "2. [Specific actionable goal]\n" +
            "3. [Specific actionable goal]\n\n" +
            "Resources:\n" +
            "- [Certification or course name]\n" +
            "- [Book or resource]\n" +
            "- [Platform or tool]\n\n" +
            "Time Estimate: [X months/weeks]\n\n" +
            "**Milestone 2: [Milestone Title]**\n" +
            "[Repeat the same structure]\n\n" +
            "Guidelines:\n" +
            "- Create 4-6 milestones total\n" +
            "- Each milestone should have 3-5 specific, actionable goals\n" +
            "- Include practical resources and certifications\n" +
            "- Provide realistic time estimates for each milestone\n" +
            "- Focus on progressive skill development from current skills to target role\n" +
            "- Make goals measurable and specific",
            dreamRole,
            currentSkills != null && !currentSkills.trim().isEmpty() ? currentSkills : "None specified"
        );

        return callGeminiAPI(prompt);
    }

    public String generateProjectPlan(String title, String description) {
        String prompt = String.format(
            "Create a detailed project plan for a project titled '%s'. " +
            "Project description: %s. " +
            "Please provide a structured project plan with phases, tasks, deliverables, " +
            "time estimates, and success criteria. Format it clearly with phases and actionable items.",
            title, description
        );

        return callGeminiAPI(prompt);
    }

    public String analyzeResume(String resumeText) {
        String prompt = String.format(
            "Analyze the following resume text and provide a comprehensive ATS (Applicant Tracking System) " +
            "compatibility analysis. Include:\n" +
            "1. Overall ATS score (0-100)\n" +
            "2. Keyword optimization analysis\n" +
            "3. Format and structure evaluation\n" +
            "4. Content quality assessment\n" +
            "5. Specific improvement suggestions\n\n" +
            "Resume text:\n%s",
            resumeText
        );

        return callGeminiAPI(prompt);
    }

    private String callGeminiAPI(String prompt) {
        try {
            String url = GEMINI_API_URL + "?key=" + apiKey;

            // Create request body
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> contents = new HashMap<>();
            Map<String, Object> parts = new HashMap<>();

            parts.put("text", prompt);
            contents.put("parts", new Map[]{parts});
            requestBody.put("contents", new Map[]{contents});

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Make API call
            @SuppressWarnings("unchecked")
            ResponseEntity<Map<String, Object>> response = (ResponseEntity<Map<String, Object>>) (ResponseEntity<?>) restTemplate.postForEntity(url, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return extractTextFromResponse(response.getBody());
            } else {
                throw new RuntimeException("Failed to get response from Gemini API");
            }

        } catch (RestClientException e) {
            throw new RuntimeException("Failed to call Gemini API: " + e.getMessage());
        } catch (Exception e) {
            if (e.getMessage().contains("API key") || e.getMessage().contains("403")) {
                throw new RuntimeException("API configuration error");
            }
            throw new RuntimeException("Service temporarily unavailable");
        }
    }

    @SuppressWarnings("unchecked")
    private String extractTextFromResponse(Map<String, Object> response) {
        try {
            Object candidates = response.get("candidates");
            if (candidates instanceof java.util.List) {
                java.util.List<Map<String, Object>> candidateList = (java.util.List<Map<String, Object>>) candidates;
                if (!candidateList.isEmpty()) {
                    Map<String, Object> candidate = candidateList.get(0);
                    Object content = candidate.get("content");
                    if (content instanceof Map) {
                        Map<String, Object> contentMap = (Map<String, Object>) content;
                        Object parts = contentMap.get("parts");
                        if (parts instanceof java.util.List) {
                            java.util.List<Map<String, Object>> partsList = (java.util.List<Map<String, Object>>) parts;
                            if (!partsList.isEmpty()) {
                                return (String) partsList.get(0).get("text");
                            }
                        }
                    }
                }
            }
            throw new RuntimeException("No response text found");
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini API response: " + e.getMessage());
        }
    }
}