package com.project.eventmanagement.controller;



import com.project.eventmanagement.entity.User;
import com.project.eventmanagement.repository.UserRepository;
import com.project.eventmanagement.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER"); // Default role
        userRepository.save(user);
        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User dbUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return jwtUtils.generateToken(dbUser.getEmail(), dbUser.getRole());
        }
        throw new RuntimeException("Invalid credentials");
    }
}