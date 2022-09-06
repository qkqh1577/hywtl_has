package com.howoocast.hywtl_has.project_complex.view;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project.document.view.ProjectDocumentShortView;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectComplexBuildingView {

    private Long id;
    private String name;
    private String shape;
    private Integer floorCount;
    private Double height;
    private Double baseArea;
    private Double ratio;

    private ProjectComplexSiteView site;
    private ProjectDocumentShortView buildingDocument;
    private List<String> specialWindWeightConditionList;
    private Boolean inTest;
    private List<TestType> testTypeList;
    private String estimateFigureDifficulty;
    private String estimateTestDifficulty;
    private String estimateEvaluationDifficulty;
    private String estimateReportDifficulty;
    private LocalDateTime modifiedAt;

    public static ProjectComplexBuildingView assemble(ProjectComplexBuilding source) {
        ProjectComplexBuildingView target = new ProjectComplexBuildingView();
        target.id = source.getId();
        target.name = source.getName();
        target.shape = source.getShape();
        target.floorCount = source.getFloorCount();
        target.height = source.getHeight();
        target.baseArea = source.getBaseArea();
        target.ratio = source.getRatio();
        if (Objects.nonNull(source.getSite())) {
            target.site = ProjectComplexSiteView.assemble(source.getSite());
        }
        if (Objects.nonNull(source.getBuildingDocument())) {
            target.buildingDocument = ProjectDocumentShortView.assemble(source.getBuildingDocument());
        }
        target.specialWindWeightConditionList = source.getSpecialWindWeightConditionList();
        target.inTest = source.getInTest();
        target.testTypeList = source.getTestTypeList();
        target.estimateFigureDifficulty = source.getEstimateFigureDifficulty();
        target.estimateTestDifficulty = source.getEstimateTestDifficulty();
        target.estimateEvaluationDifficulty = source.getEstimateEvaluationDifficulty();
        target.estimateReportDifficulty = source.getEstimateReportDifficulty();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
