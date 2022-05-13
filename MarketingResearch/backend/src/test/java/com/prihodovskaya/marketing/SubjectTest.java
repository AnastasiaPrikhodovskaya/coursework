package com.prihodovskaya.marketing;

import java.util.List;
import com.prihodovskaya.marketing.models.auth.User;
import com.prihodovskaya.marketing.models.subject.Answer;
import com.prihodovskaya.marketing.models.subject.Question;
import com.prihodovskaya.marketing.models.subject.StandardAnswer;
import com.prihodovskaya.marketing.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

@SpringBootTest
public class SubjectTest {
    @Autowired
    private Question question;
    @Autowired
    private StandardAnswer stAnswer;
    @Autowired
    private Answer answer;
    @Autowired
    private UserDetailsServiceImpl userServiceImpl;

    @Test
    void checkStandardAnswer() {
        List<StandardAnswer> standardAnswer = this.stAnswer.getAllTrueStandartAnswers();
        Assert.isTrue(standardAnswer.size() != 0);
    }

    @Test
    void checkQuestions() {
        List<Question> questions = this.question.getListOfQuestions();
        Assert.isTrue(questions.size() != 0);
    }

    @Test
    void checkUserQuestions() {
        List<Answer> userAnswer = this.answer.findAll();
        Assert.isTrue(userAnswer.size() != 0);
    }

    @Test
    void checkUsers() {
        List<User> users = this.userServiceImpl.getAllUsers();
        Assert.isTrue(users.size() != 0);
    }
}
