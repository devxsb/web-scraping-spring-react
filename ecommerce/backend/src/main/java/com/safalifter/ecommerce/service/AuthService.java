package com.safalifter.ecommerce.service;

import com.safalifter.ecommerce.dto.AuthRequest;
import com.safalifter.ecommerce.dto.AuthResponse;
import com.safalifter.ecommerce.exc.AuthException;
import com.safalifter.ecommerce.model.Role;
import com.safalifter.ecommerce.model.User;
import com.safalifter.ecommerce.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    public AuthService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil, UserDetailsService userDetailsService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    public AuthResponse authenticate(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (Exception ex) {
            throw new AuthException("Login failed.");
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        return new AuthResponse(userDetails.getUsername(), userDetails.getAuthorities().toString(), jwt);
    }

    @Bean
    public void register() {
        User user = User.builder()
                .username("admin")
                .password("admin55")
                .role(Role.ADMIN).build();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User inDB = userService.getUser(user.getUsername());
        if (inDB == null)
            System.out.println(userService.register(user));
    }
}