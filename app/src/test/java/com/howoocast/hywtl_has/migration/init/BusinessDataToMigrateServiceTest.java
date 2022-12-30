package com.howoocast.hywtl_has.migration.init;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BusinessDataToMigrateServiceTest {

    @Autowired
    private BusinessDataToMigrateService businessDataToMigrateService;

    @Test
    public void test(){
        businessDataToMigrateService.migrate();
    }
}
