package com.arbeit.backend.service;

import com.arbeit.backend.dto.AuthRequest;
import com.arbeit.backend.dto.AuthResponse;
import com.arbeit.backend.dto.LoginResponse;
import com.arbeit.backend.dto.UserRegistrationRequest;
import com.arbeit.backend.model.User;
import com.arbeit.backend.repository.UserRepository;
import com.arbeit.backend.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public LoginResponse login(AuthRequest request) {
        String normalizedEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null;
        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(normalizedEmail);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Email does not exist");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate single access token (30 min)
        String accessToken = jwtUtils.generateAccessToken(user.getEmail(), user.getRole());

        return new LoginResponse("User successfully logged in", user.getUserId(), user.getEmail(), user.getRole(), accessToken, null);
    }

    public AuthResponse register(UserRegistrationRequest request) {
        String normalizedEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null;
        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setRole("user");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // Generate unique user ID
        user.setUserId(generateUniqueUserId());

        User savedUser = userRepository.save(user);

        return new AuthResponse("User successfully registered", savedUser.getUserId(), savedUser.getEmail(), savedUser.getRole());
    }

    // Refresh disabled

    public void changePassword(String username, String currentPassword, String newPassword) {
        String normalizedEmail = username != null ? username.trim().toLowerCase() : null;
        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(normalizedEmail);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    private String generateUniqueUserId() {
        String userId;
        do {
            // Generate a random 3-digit number
            userId = String.valueOf(100 + (int)(Math.random() * 900));
        } while (userRepository.existsByUserId(userId));

        return userId;
    }
}
