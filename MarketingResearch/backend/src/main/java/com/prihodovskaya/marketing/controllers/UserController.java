package com.prihodovskaya.marketing.controllers;

import com.prihodovskaya.marketing.models.auth.User;
import com.prihodovskaya.marketing.models.subject.Answer;
import com.prihodovskaya.marketing.models.subject.Order;
import com.prihodovskaya.marketing.payload.request.AnswerRequest;
import com.prihodovskaya.marketing.payload.request.DoneOrderRequest;
import com.prihodovskaya.marketing.payload.response.OrderResponse;
import com.prihodovskaya.marketing.repository.AnswersRepository;
import com.prihodovskaya.marketing.repository.OrdersRepository;
import com.prihodovskaya.marketing.repository.QuestionRepository;
import com.prihodovskaya.marketing.repository.UserRepository;
import com.prihodovskaya.marketing.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserController {

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    AnswersRepository answersRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader Map<String, String> headers) {
        String token, userName;
        try {
            token = headers.get("authorization").split(" ")[1];
            userName = jwtUtils.getUserNameFromJwtToken(token);
            User _user = userRepository.findByUsername(userName).get();

            return ResponseEntity.ok(_user);
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка");
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders() {
        List<OrderResponse> responseList = new ArrayList<>();
        for (Order order : ordersRepository.findAll()) {
            responseList.add(new OrderResponse(order.id, order.company.name,order.method.name, order.method.questions));
        }
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        try {
            Order order = ordersRepository.findById(id).get();
            OrderResponse orderResponse = new OrderResponse(order.id, order.company.name, order.method.name, order.method.questions);

            return ResponseEntity.ok(orderResponse);
        }
        catch (Exception exception) {
            return ResponseEntity.internalServerError().body(exception.getMessage());
        }
    }

    @PostMapping("/orders/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @Valid @RequestBody DoneOrderRequest doneOrderRequest) {
        try {
            Order order = ordersRepository.findById(doneOrderRequest.orderId).get();

            for (AnswerRequest answerRequest : doneOrderRequest.answers)
                order.answers.add(new Answer(answerRequest.answerName, order, questionRepository.findById(answerRequest.questionId).get()));

            order.passedPeople++;

            answersRepository.saveAll(order.answers);

            ordersRepository.save(order);

            return ResponseEntity.ok("Успешно");
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(exception.getMessage());
        }
    }
}
