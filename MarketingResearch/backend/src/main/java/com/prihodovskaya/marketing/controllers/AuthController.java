package com.prihodovskaya.marketing.controllers;

import com.prihodovskaya.marketing.models.auth.User;
import com.prihodovskaya.marketing.payload.response.JwtLoginResponse;
import com.prihodovskaya.marketing.repository.UserRepository;
import com.prihodovskaya.marketing.security.jwt.JwtUtils;
import com.prihodovskaya.marketing.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> params) {
        if (!params.containsKey("username") || !params.containsKey("password") )
            return ResponseEntity.badRequest().body("Не достаточно параметров");

        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(params.get("username"), params.get("password"));
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            User user = userRepository.getById(userDetails.getId());

            return ResponseEntity.ok(new JwtLoginResponse(jwt, user));
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception);
        }
    }

    @GetMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestHeader Map<String, String> headers) {
        String token, userName;
        try {
            token = headers.get("authorization").split(" ")[1];
            userName = jwtUtils.getUserNameFromJwtToken(token);
            if (token == "undefined")
                return null;

            User user = userRepository.findByUsername(userName).get();

            return ResponseEntity.ok(new JwtLoginResponse(token, user));
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestHeader Map<String, String> headers, @RequestBody Map<String, String> params) {
        String token, userName;
        if (!params.containsKey("password"))
            return ResponseEntity.badRequest().body("Не достаточно параметров");

        try {
            token = headers.get("authorization").split(" ")[1];
            userName = jwtUtils.getUserNameFromJwtToken(token);
            User _user = userRepository.findByUsername(userName).get();
            _user.password = encoder.encode(params.get("password"));
            userRepository.save(_user);

            return ResponseEntity.ok("Пароль успешно изменен");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка");
        }
    }

    @PostMapping("/changeEmail")
    public ResponseEntity<?> changeEmail(@RequestHeader Map<String, String> headers, @RequestBody Map<String, String> params) {
        String token, userName;
        if (!params.containsKey("email"))
            return ResponseEntity.badRequest().body("Не достаточно параметров");

        try {
            token = headers.get("authorization").split(" ")[1];
            userName = jwtUtils.getUserNameFromJwtToken(token);
            User _user = userRepository.findByUsername(userName).get();
            _user.email = params.get("email");
            userRepository.save(_user);

            return ResponseEntity.ok("Email успешно изменен");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка");
        }
    }
}