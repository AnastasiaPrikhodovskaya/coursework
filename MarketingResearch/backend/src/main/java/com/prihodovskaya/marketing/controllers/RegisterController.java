package com.prihodovskaya.marketing.controllers;

import com.prihodovskaya.marketing.models.auth.Company;
import com.prihodovskaya.marketing.models.auth.ERole;
import com.prihodovskaya.marketing.models.auth.Role;
import com.prihodovskaya.marketing.models.auth.User;
import com.prihodovskaya.marketing.payload.request.SignupCompanyRequest;
import com.prihodovskaya.marketing.payload.request.SignupRequest;
import com.prihodovskaya.marketing.repository.CompanyRepository;
import com.prihodovskaya.marketing.repository.RoleRepository;
import com.prihodovskaya.marketing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/register")
public class RegisterController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
        ResponseEntity<?> result = checkUsernamePassword(request.username, request.email);
        if (result != null)
            return result;

        User user = new User(request.username, request.email, encoder.encode(request.password), request.firstName, request.lastName);

        if (saveUserToRepository(user).id == 0)
            return ResponseEntity.internalServerError().body("Ошибка регистрации пользователя.");

        return ResponseEntity.ok("Пользователь " + user.username + " успешно создан.");
    }

    @PostMapping("/company")
    public ResponseEntity<?> registerCompany(@Valid @RequestBody SignupCompanyRequest request) {
        ResponseEntity<?> result = checkUsernamePassword(request.username, request.email);
        if (result != null)
            return result;

        User user = new User(request.username, request.email, encoder.encode(request.password), request.firstName, request.lastName);
        Company company = new Company(request.companyName, request.companyProblem, request.employeeCount);

        Role companyRole = roleRepository.findByName(ERole.ROLE_COMPANY).get();
        Set<Role> roles = new HashSet<>();
        roles.add(companyRole);
        user.roles = roles;

        if (saveUserToRepository(user, company).id == 0)
            return ResponseEntity.internalServerError().body("Ошибка регистрации компании.");

        return ResponseEntity.ok("Компания " + company.name + " успешно создана.");
    }

    private ResponseEntity<?> checkUsernamePassword(String username, String email) {
        if (userRepository.existsByUsername(username))
            return ResponseEntity
                    .badRequest()
                    .body("Ошибка: Имя пользователя уже используется!");

        if (userRepository.existsByEmail(email))
            return ResponseEntity
                    .badRequest()
                    .body("Ошибка: Email уже используется!");

        return null;
    }

    private User saveUserToRepository(User user) {
        return saveUserToRepository(user, null);
    }

    private User saveUserToRepository(User user, Company company) {
        try {
            Set<Role> roles = new HashSet<>();
            ERole role = ERole.ROLE_USER;

            if (company != null) {
                role = ERole.ROLE_COMPANY;
                user.company = company;
            }

            Role companyRole = roleRepository.findByName(role)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(companyRole);
            user.roles = roles;

            return userRepository.save(user);

        } catch (Exception exception) {
            if (company != null)
                companyRepository.delete(company);
            userRepository.delete(user);

            return null;
        }
    }
}