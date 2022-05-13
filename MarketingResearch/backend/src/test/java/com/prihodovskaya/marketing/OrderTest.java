package com.prihodovskaya.marketing;

import java.util.Iterator;
import java.util.List;

import com.prihodovskaya.marketing.models.auth.Company;
import com.prihodovskaya.marketing.models.subject.Order;
import com.prihodovskaya.marketing.payload.response.JwtCompanyResponse;
import com.prihodovskaya.marketing.payload.response.OrderResponse;
import com.prihodovskaya.marketing.services.CompanyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

@SpringBootTest
public class OrderTest {
    @Autowired
    private OrderResponse ordersResponce;
    @Autowired
    private CompanyService companyServ;

    @Test
    void checkQuestions() {
        List<Order> orders = this.ordersResponce.getListOfOrders();
        Iterator var2 = orders.iterator();

        while(var2.hasNext()) {
            Order order = (Order)var2.next();
            Assert.isTrue(!order.toString().equals(""));
        }

    }

    @Test
    void checkCompanies() {
        List<Company> companies = this.companyServ.getAllCompanies();
        Iterator var2 = companies.iterator();

        while(var2.hasNext()) {
            Company company = (Company)var2.next();
            Assert.isTrue(!company.toString().equals(""));
        }

    }
}
