package com.innov.utility;

import com.innov.repository.ICustomerRepo;
import com.innov.model.Customer;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthFilter.class);

    private final JwtService jwtService;
    private final ICustomerRepo customerRepo;

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain filterChain
    ) throws IOException, ServletException {

        String path = req.getRequestURI();
        LOGGER.info("URL" + path);

        // ✅ SKIP PUBLIC ENDPOINTS (VERY IMPORTANT)
        if (path.startsWith("/v3/api-docs") ||
                path.startsWith("/swagger-ui") ||
                path.startsWith("/swagger-ui.html") ||
                path.startsWith("/favicon.ico") ||
                path.startsWith("/test/")) {

            LOGGER.info("keep process swagger");

            filterChain.doFilter(req, res);
            return;
        }

        String authHeader = req.getHeader("Authorization");

        // ✅ NO TOKEN = JUST CONTINUE (DO NOT BLOCK)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(req, res);
            return;
        }

        try {
            String token = authHeader.substring(7);

            if (jwtService.isTokenInvalidated(token)) {
                LOGGER.warn("JWT token is invalidated (logged out)");
                SecurityContextHolder.clearContext();
                filterChain.doFilter(req, res);
                return;
            }

            LOGGER.info("keep process swagger authorization");

            String email = jwtService.extractUsername(token);

            Customer customer = customerRepo.findByEmail(email);

            if (customer != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = User
                        .withUsername(customer.getEmail())
                        .password("")
                        .authorities("ROLE_USER")
                        .build();

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        } catch (Exception e) {
            LOGGER.warn("Invalid JWT token: {}", e.getMessage());

            // ✅ DO NOT BREAK RESPONSE (VERY IMPORTANT FOR SWAGGER)
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(req, res);
    }
}