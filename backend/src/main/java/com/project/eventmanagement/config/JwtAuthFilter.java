package com.project.eventmanagement.config;



import com.project.eventmanagement.service.CustomUserDetailsService;
import com.project.eventmanagement.util.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Get the Authorization Header (e.g., "Bearer eyJhbGciOi...")
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        // 2. Validate Header Format
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Extract Token
        jwtToken = authHeader.substring(7); // Remove "Bearer "
        userEmail = jwtUtils.extractUsername(jwtToken); // Extract Email from Token

        // 4. Validate Token & Set Context
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            if (jwtUtils.validateToken(jwtToken)) {
                // Create Authentication Token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

                // Add details like IP address, Session ID
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Final Step: Set the User in the Security Context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 5. Continue to the next filter (or the Controller)
        filterChain.doFilter(request, response);
    }
}