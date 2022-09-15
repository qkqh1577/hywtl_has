package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateComplexBuildingParameter {

    private Long id;
    private String name;
    private Long siteId;
    private String shape;
    private Integer floorCount;
    private Double height;
    private Double baseArea;
    private Double ratio;
    private Long buildingDocumentId;
    private List<String> conditionList;
    private Boolean inTest;
    private List<TestType> testTypeList;
    private String estimateFigureDifficulty;
    private String estimateTestDifficulty;
    private String estimateEvaluationDifficulty;
    private String estimateReportDifficulty;

}