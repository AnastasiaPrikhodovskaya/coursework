package com.prihodovskaya.marketing;

import com.prihodovskaya.marketing.models.subject.Answer;
import com.prihodovskaya.marketing.payload.request.AnswerRequest;
import com.prihodovskaya.marketing.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;


@SpringBootTest
public class AnswerTest {
    @Autowired
    private AnswerRequest answer;
    @Autowired
    private UserDetailsServiceImpl userServiceImpl;


    @Test
    void checkAnswers() {
        List<Answer> answers = this.answer.getListOfAnswers();
        Iterator var2 = answers.iterator();

        while(var2.hasNext()) {
            Answer ans = (Answer)var2.next();
            Assert.isTrue(!ans.toString().equals(""));
        }

    }

    @Test
    void checkUsers() {
        List<User> users = this.userServiceImpl.getAllUsers();
        Iterator var2 = users.iterator();

        while(var2.hasNext()) {
            User user = (User)var2.next();
            Assert.isTrue(!user.toString().equals(""));
        }

    }
}
