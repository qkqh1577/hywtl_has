package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import java.util.List;
import java.util.Objects;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectCustomEstimateComplexBuilding.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectCustomEstimateComplexBuilding.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectCustomEstimateComplexBuilding extends CustomEntity {

    public static final String KEY = "project_custom_estimate_complex_building";


    private String name;

    @OneToOne
    @JoinColumn(name = "site_id")
    private ProjectCustomEstimateComplexSite site;

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
    private ProjectCustomEstimate estimate;

    public static ProjectCustomEstimateComplexBuilding of(
        ProjectCustomEstimate estimate
    ) {
        ProjectCustomEstimateComplexBuilding instance = new ProjectCustomEstimateComplexBuilding();
        instance.estimate = estimate;
        return instance;
    }

    public void change(
        @Nullable String name,
        @Nullable ProjectCustomEstimateComplexSite site,
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
        this.name = name;
        this.site = site;
        this.shape = shape;
        this.floorCount = floorCount;
        this.height = height;
        this.baseArea = baseArea;
        if (Objects.nonNull(this.height)
            && Objects.nonNull(this.baseArea)
            && this.height > 0
            && this.baseArea > 0
        ) {
            this.ratio = this.height / Math.sqrt(this.baseArea);
        } else {
            this.ratio = null;
        }
        this.buildingDocument = buildingDocument;
        this.conditionList = conditionList;
        this.inTest = inTest;
        this.testTypeList = testTypeList;
        this.estimateFigureDifficulty = estimateFigureDifficulty;
        this.estimateTestDifficulty = estimateTestDifficulty;
        this.estimateEvaluationDifficulty = estimateEvaluationDifficulty;
        this.estimateReportDifficulty = estimateReportDifficulty;
    }
}
