package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_document.view.ProjectDocumentShortView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexBuilding;
import java.util.List;
import java.util.Objects;
import lombok.Getter;

@Getter
public class ProjectEstimateComplexBuildingView {

    private Long id;
    private String name;
    private ProjectEstimateComplexSiteView site;
    private String shape;
    private Integer floorCount;
    private Double height;
    private Double baseArea;
    private Double ratio;
    private ProjectDocumentShortView buildingDocument;
    private List<String> conditionList;
    private Boolean inTest;
    private List<TestType> testTypeList;
    private String estimateFigureDifficulty;
    private String estimateTestDifficulty;
    private String estimateEvaluationDifficulty;
    private String estimateReportDifficulty;

    public static ProjectEstimateComplexBuildingView assemble(ProjectEstimateComplexBuilding source) {
        ProjectEstimateComplexBuildingView target = new ProjectEstimateComplexBuildingView();
        target.id = source.getId();
        target.name = source.getName();
        if (Objects.nonNull(source.getSite())) {
            target.site = ProjectEstimateComplexSiteView.assemble(source.getSite());
        }
        target.shape = source.getShape();
        target.floorCount = source.getFloorCount();
        target.height = source.getHeight();
        target.baseArea = source.getBaseArea();
        target.ratio = source.getRatio();
        if (Objects.nonNull(source.getBuildingDocument())) {
            target.buildingDocument = ProjectDocumentShortView.assemble(source.getBuildingDocument());
        }
        target.conditionList = source.getConditionList();
        target.inTest = source.getInTest();
        target.testTypeList = source.getTestTypeList();
        target.estimateFigureDifficulty = source.getEstimateFigureDifficulty();
        target.estimateTestDifficulty = source.getEstimateTestDifficulty();
        target.estimateEvaluationDifficulty = source.getEstimateEvaluationDifficulty();
        target.estimateReportDifficulty = source.getEstimateReportDifficulty();
        return target;
    }
}
