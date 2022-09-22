package com.howoocast.hywtl_has.project_complex.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import java.util.List;
import java.util.Objects;
import javax.annotation.Nullable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = ProjectComplexBuilding.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectComplexBuilding extends CustomEntity {

    public static final String KEY = "project_complex_building";

    private String name;

    @OneToOne
    @JoinColumn(name = "site_id")
    private ProjectComplexSite site;

    private String shape;

    private Integer floorCount;

    private Double height;

    private Double baseArea;

    private Double ratio;

    @OneToOne
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

    @ManyToOne
    private Project project;

    public static ProjectComplexBuilding of(
        Project project
    ) {
        ProjectComplexBuilding instance = new ProjectComplexBuilding();
        instance.project = project;
        return instance;
    }


    public void update(
        @Nullable String name,
        @Nullable ProjectComplexSite site,
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
        if (Objects.nonNull(name)) {
            this.name = name;
        }
        if (Objects.nonNull(site)) {
            this.site = site;
        }
        if (Objects.nonNull(shape)) {
            this.shape = shape;
        }
        if (Objects.nonNull(floorCount)) {
            this.floorCount = floorCount;
        }
        if (Objects.nonNull(height)) {
            this.height = height;
        }
        if (Objects.nonNull(baseArea)) {
            this.baseArea = baseArea;
        }
        if (Objects.nonNull(this.height)
            && Objects.nonNull(this.baseArea)
            && this.height > 0
            && this.baseArea > 0
        ) {
            this.ratio = this.height / Math.sqrt(this.baseArea);
        } else {
            this.ratio = null;
        }
        if (Objects.nonNull(buildingDocument)) {
            this.buildingDocument = buildingDocument;
        }
        if (Objects.nonNull(conditionList)) {
            this.conditionList = conditionList;
        }
        if (Objects.nonNull(inTest)) {
            this.inTest = inTest;
        }
        if (Objects.nonNull(testTypeList)) {
            this.testTypeList = testTypeList;
        }
        if (Objects.nonNull(estimateFigureDifficulty)) {
            this.estimateFigureDifficulty = estimateFigureDifficulty;
        }
        if (Objects.nonNull(estimateTestDifficulty)) {
            this.estimateTestDifficulty = estimateTestDifficulty;
        }
        if (Objects.nonNull(estimateEvaluationDifficulty)) {
            this.estimateEvaluationDifficulty = estimateEvaluationDifficulty;
        }
        if (Objects.nonNull(estimateReportDifficulty)) {
            this.estimateReportDifficulty = estimateReportDifficulty;
        }
    }
}
