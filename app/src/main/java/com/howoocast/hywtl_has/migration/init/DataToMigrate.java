package com.howoocast.hywtl_has.migration.init;

import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataToMigrate {

    private final DepartmentInitDataService departmentInitDataService;
    private final UserInitDataService userInitDataService;
    private final BusinessDataToMigrateService businessDataToMigrateService;

    @PostConstruct
    public void init() {
        departmentInitDataService.init();
        userInitDataService.init();
        businessDataToMigrateService.migrate();
    }
}
