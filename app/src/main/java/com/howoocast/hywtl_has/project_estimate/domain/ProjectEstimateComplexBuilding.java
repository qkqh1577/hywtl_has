package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import java.util.List;
import java.util.Objects;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectEstimateComplexBuilding.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateComplexBuilding extends CustomEntity {

    public static final String KEY = "project_estimate_complex_building";

    private String name;

    @ManyToOne
    private ProjectEstimateComplexSite site;

    private String shape;

    private Integer floorCount;

    private Double height;

    private Double baseArea;

    private Double ratio;

    @ManyToOne
    @JoinColumn(name = "building_document_id")
    private ProjectDocument buildingDocument;

    @ElementCollection
    private List<String> conditionList;

    private Boolean inTest;

    @ElementCollection
    private List<TestType> testTypeList;

    private String estimateFigureDifficulty;

    private String estimateTestDifficulty;

    private String estimateEvaluationDifficulty;

    private String estimateReportDifficulty;

    public static ProjectEstimateComplexBuilding of(
        @Nullable String name,
        @Nullable ProjectEstimateComplexSite site,
        @Nullable String shape,
        @Nullable Integer floorCount,
        @Nullable Double height,
        @Nullable Double baseArea,
        @Nullable ProjectDocument buildingDocument,
        @Nullable List<String> conditionList,
        @Nullable Boolean inTest,
        @Nullable List<TestType> testTypeList,
        @Nullable String estimateFigureDifficulty,
        @Nullable String estimateTestDifficulty,
        @Nullable String estimateEvaluationDifficulty,
        @Nullable String estimateReportDifficulty
    ) {
        ProjectEstimateComplexBuilding instance = new ProjectEstimateComplexBuilding();
        instance.name = name;
        instance.site = site;
        instance.shape = shape;
        instance.floorCount = floorCount;
        instance.height = height;
        instance.baseArea = baseArea;
        if (Objects.nonNull(instance.height)
            && Objects.nonNull(instance.baseArea)
            && instance.height > 0
            && instance.baseArea > 0
        ) {
            instance.ratio = instance.height / Math.sqrt(instance.baseArea);
        } else {
            instance.ratio = null;
        }
        instance.buildingDocument = buildingDocument;
        instance.conditionList = conditionList;
        instance.inTest = inTest;
        instance.testTypeList = testTypeList;
        instance.estimateFigureDifficulty = estimateFigureDifficulty;
        instance.estimateTestDifficulty = estimateTestDifficulty;
        instance.estimateEvaluationDifficulty = estimateEvaluationDifficulty;
        instance.estimateReportDifficulty = estimateReportDifficulty;
        return instance;
    }

    /**
     * @migration
     * @param list
     */
    public void updateTestTypeList(List<TestType> list) {
        this.testTypeList = list;
    }
}
