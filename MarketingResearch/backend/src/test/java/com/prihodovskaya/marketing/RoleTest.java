package com.prihodovskaya.marketing;

import com.prihodovskaya.marketing.models.auth.Role;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

@SpringBootTest
public class RoleTest {

    @Test
    void testRoleCOMPANY() {
        Role role = Role.COMPANY;
        Assert.isTrue(Role.valueOf("COMPANY") == role);
    }

    @Test
    void testRoleUSER() {
        Role role = Role.USER;
        Assert.isTrue(Role.valueOf("USER") == role);
    }
}
