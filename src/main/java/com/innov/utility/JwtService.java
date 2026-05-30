package com.innov.utility;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpServletRequest;

import com.innov.model.Customer;
import com.innov.service.CustomerService;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
@Component
public class JwtService {

    @Value("${jwt.secret.access}")
    private String accessSecretKey;
    
    @Autowired
    private CustomerService customerService;

    private final Map<String, Date> invalidatedTokens = new ConcurrentHashMap<>();

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(accessSecretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1300 * 1000))
                .signWith(Keys.hmacShaKeyFor(accessSecretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7L * 24 * 60 * 60 * 1000))
                .signWith(Keys.hmacShaKeyFor(accessSecretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token){
        return extractAllClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    public void invalidateToken(String token) {
        Date expiration = extractExpiration(token);
        invalidatedTokens.put(token, expiration);
    }

    public boolean isTokenInvalidated(String token) {
        clearExpiredInvalidatedTokens();
        return invalidatedTokens.containsKey(token);
    }

    private void clearExpiredInvalidatedTokens() {
        Date now = new Date();
        invalidatedTokens.entrySet().removeIf(entry -> entry.getValue().before(now));
    }
    
    /**
     * Extract userId (loginId) from Authorization header (Bearer token)
     * @param request HttpServletRequest containing the Authorization header
     * @return loginId of the authenticated user
     * @throws IllegalArgumentException if Authorization header is missing or invalid
     * @throws NullPointerException if user not found
     */
    public int getUserId(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing or invalid authorization header");
        }
        
        String token = authHeader.substring(7);
        String email = extractUsername(token);
        
        Customer customer = customerService.findByEmail(email);
        if (customer == null) {
            throw new NullPointerException("User not found");
        }
        
        return customer.getLoginId();
    }
}