package com.howoocast.hywtl_has.user.domain;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import static com.howoocast.hywtl_has.common.util.RandomDataUtil.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Sql("classpath:truncate.sql")
@Slf4j
public class UserDomainTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Test
    void test() {
        Department department = Department.of(
            departmentRepository,
            text(),
            getRandomItem(DepartmentCategory.values()),
            null,
            text()
        );

        String username = username();
        User user = User.of(
            userRepository,
            username,
            text(),
            name(),
            String.format("%s@%s", username, domain()),
            department,
            getRandomItem(UserRole.values())
        );

        assertNotNull(user);
    }
}
