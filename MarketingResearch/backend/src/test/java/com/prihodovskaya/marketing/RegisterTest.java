package com.prihodovskaya.marketing;

import com.prihodovskaya.marketing.controllers.CompanyController;
import com.prihodovskaya.marketing.controllers.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

@SpringBootTest
public class RegisterTest {
    @Autowired
    private UserController userController;
    @Autowired
    private CompanyController companyController;

    @Test
    void checkLogin() {
        Assert.isTrue(this.userController.login().equals("home"));
    }


    @Test
    void checkRedirectToRegistrationForm() {
        Assert.isTrue(this.userController.redirectToRegistrationForm().equals("register"));
    }

    @Test
    void checkRedirectToCompanyPage() {
        Assert.isTrue(this.userController.redirectToCompanyPage().equals("company"));
    }
}
