package com.arbeit.backend.service;

import com.arbeit.backend.dto.AuthRequest;
import com.arbeit.backend.dto.AuthResponse;
import com.arbeit.backend.dto.BusinessRegistrationRequest;
import com.arbeit.backend.dto.LoginResponse;
import com.arbeit.backend.model.Company;
import com.arbeit.backend.repository.CompanyRepository;
import com.arbeit.backend.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BusinessAuthService {

    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public BusinessAuthService(CompanyRepository companyRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public LoginResponse login(AuthRequest request) {
        String normalizedEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null;
        Optional<Company> companyOptional = companyRepository.findByCompanyEmailIgnoreCase(normalizedEmail);

        if (companyOptional.isEmpty()) {
            throw new RuntimeException("Company email does not exist");
        }

        Company company = companyOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), company.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate single access token (30 min)
        String accessToken = jwtUtils.generateAccessToken(company.getCompanyEmail(), company.getRole());

        return new LoginResponse("Business successfully logged in", company.getBid(), company.getCompanyEmail(), company.getRole(), accessToken, null);
    }

    public AuthResponse register(BusinessRegistrationRequest request) {
        String normalizedCompanyEmail = request.getCompanyEmail() != null ? request.getCompanyEmail().trim().toLowerCase() : null;
        if (companyRepository.existsByCompanyEmailIgnoreCase(normalizedCompanyEmail)) {
            throw new RuntimeException("Company email already exists");
        }

        Company company = new Company();
        company.setName(request.getName());
        company.setEmail(request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null);
        company.setCompanyName(request.getCompanyName());
        company.setAddress(request.getAddress());
        company.setCity(request.getCity());
        company.setState(request.getState());
        company.setCountry(request.getCountry());
        company.setZipCode(request.getZipCode());
        company.setPhone(request.getPhone());
        company.setWebsite(request.getWebsite());
        company.setCompanyEmail(normalizedCompanyEmail);
        company.setPassword(passwordEncoder.encode(request.getPassword()));
        company.setRole("business");
        company.setVerified(true);
        company.setCreatedAt(LocalDateTime.now());
        company.setUpdatedAt(LocalDateTime.now());

        // Generate unique BID
        company.setBid(generateUniqueBid());

        Company savedCompany = companyRepository.save(company);

        return new AuthResponse("Business registered successfully", savedCompany.getBid(), savedCompany.getCompanyEmail(), savedCompany.getRole());
    }

    // Refresh disabled

    private String generateUniqueBid() {
        String bid;
        do {
            // Generate a random 4-digit number prefixed with 'B'
            bid = 'B' + String.format("%04d", (int)(Math.random() * 10000));
        } while (companyRepository.existsByBid(bid));

        return bid;
    }
}
