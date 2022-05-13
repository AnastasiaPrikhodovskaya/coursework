package com.prihodovskaya.marketing.controllers;

import com.prihodovskaya.marketing.models.auth.User;
import com.prihodovskaya.marketing.models.subject.Answer;
import com.prihodovskaya.marketing.models.subject.Method;
import com.prihodovskaya.marketing.models.subject.Order;
import com.prihodovskaya.marketing.models.subject.Question;
import com.prihodovskaya.marketing.repository.*;
import com.prihodovskaya.marketing.security.jwt.JwtUtils;
import com.prihodovskaya.marketing.services.ReportService;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/company")
@PreAuthorize("hasRole('COMPANY')")
public class CompanyController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    MethodRepository methodRepository;

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    StandardAnswerRepository standardAnswerRepository;

    @Autowired
    AnswersRepository answersRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader Map<String, String> headers) {
        String token, userName;
        try {
            token = headers.get("authorization").split(" ")[1];
            userName = jwtUtils.getUserNameFromJwtToken(token);
            User _user = userRepository.findByUsername(userName).get();
            if (_user.company != null) {
                return ResponseEntity.ok(_user);
            }

            return ResponseEntity.internalServerError().body("Это не компания");
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка");
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(@RequestHeader Map<String, String> headers) {
        String token, userName;
        List<Order> orders;
        try {
            token = headers.get("authorization").split(" ")[1];
            userName = jwtUtils.getUserNameFromJwtToken(token);
            long companyId = userRepository.findByUsername(userName).get().company.id;
            orders = ordersRepository.findByCompanyId(companyId);

            if (token == "undefined")
                return null;
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка получения");
        }

        return ResponseEntity.ok(orders);
    }

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestHeader Map<String, String> headers, @RequestBody Map<String, String> params) {
        Order order = new Order();

        String token, userName;
        try {
            token = headers.get("authorization").split(" ")[1];
            userName = jwtUtils.getUserNameFromJwtToken(token);
            order.company = userRepository.findByUsername(userName).get().company;
            order.method = methodRepository.findByName(params.get("method")).get();
            order.comment = params.get("comment");
            order.personCount = Integer.parseInt(params.get("personCount"));
            ordersRepository.save(order);

            if (token == "undefined")
                return null;
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка создания");
        }

        return ResponseEntity.ok(order);
    }

    @GetMapping("/methods")
    public  ResponseEntity<?> getMethods(@RequestHeader Map<String, String> headers) {
        List<Method> methods;

        try {
            methods = methodRepository.findAll();
            return ResponseEntity.ok(methods);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка");
        }
    }

    @GetMapping("/standardAnswers")
    public ResponseEntity<?> getMethods(@RequestParam String method) {
        try {
            Method _method = methodRepository.findByName(method).get();
            Set<Question> questions = _method.questions;

            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка");
        }
    }

    @GetMapping("/answers")
    public ResponseEntity<?> getAnswers(@RequestParam long order) {
        try {
            Order _order = ordersRepository.findById(order).get();
            Set<Answer> _answers = _order.answers;

            return ResponseEntity.ok(_answers);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Ошибка");
        }
    }

    @GetMapping("/reports/export/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=answers_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        ReportService reportService = ReportService.getInstance(null);

        InputStream inp = new FileInputStream("D:\\Учеба\\6 семестр\\Coursework\\Report.xlsx");
        Workbook wb = WorkbookFactory.create(inp);

        ServletOutputStream outputStream = response.getOutputStream();
        wb.write(outputStream);
        wb.close();
    }
}
