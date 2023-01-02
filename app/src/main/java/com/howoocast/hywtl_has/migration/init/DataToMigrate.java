package com.howoocast.hywtl_has.migration.init;

import com.howoocast.hywtl_has.migration.service.BusinessDataToMigrateService;
import com.howoocast.hywtl_has.migration.service.ComparedEstimateDataToMigrateService;
import com.howoocast.hywtl_has.migration.service.ContractBasicInitDataService;
import com.howoocast.hywtl_has.migration.service.ContractCollectionInitDataService;
import com.howoocast.hywtl_has.migration.service.ContractConditionInitDataService;
import com.howoocast.hywtl_has.migration.service.DepartmentInitDataService;
import com.howoocast.hywtl_has.migration.service.EstimateContentInitDataService;
import com.howoocast.hywtl_has.migration.service.EstimateTemplateInitDataService;
import com.howoocast.hywtl_has.migration.service.ProjectDesignDataToMigrateService;
import com.howoocast.hywtl_has.migration.service.ProjectStatusDataToMigrateService;
import com.howoocast.hywtl_has.migration.service.UserInitDataService;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataToMigrate {

    private final DepartmentInitDataService departmentInitDataService;
    private final UserInitDataService userInitDataService;
    private final BusinessDataToMigrateService businessDataToMigrateService;
    private final ProjectStatusDataToMigrateService projectStatusDataToMigrateService;
    private final ProjectDesignDataToMigrateService projectDesignDataToMigrateService;
    private final ComparedEstimateDataToMigrateService comparedEstimateDataToMigrateService;
    private final ContractBasicInitDataService contractBasicInitDataService;
    private final ContractCollectionInitDataService contractCollectionInitDataService;
    private final ContractConditionInitDataService contractConditionInitDataService;
    private final EstimateContentInitDataService estimateContentInitDataService;
    private final EstimateTemplateInitDataService estimateTemplateInitDataService;

    @PostConstruct
    public void init() {
        departmentInitDataService.init();
        userInitDataService.init();
        businessDataToMigrateService.migrate();
        projectStatusDataToMigrateService.migrate();
        projectDesignDataToMigrateService.migrate();
        comparedEstimateDataToMigrateService.migrate();
        contractBasicInitDataService.init();
        contractCollectionInitDataService.init();
        contractConditionInitDataService.init();
        estimateContentInitDataService.init();
        estimateTemplateInitDataService.init();
    }
}
