package com.howoocast.hywtl_has.project_complex.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project.domain.Project;
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

@Slf4j
@Getter
@Entity
@Table(name = ProjectComplexBuilding.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectComplexBuilding.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
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
    private List<String> specialWindWeightConditionList;

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
        String name,
        ProjectComplexSite site,
        String shape,
        Integer floorCount,
        Double height,
        Double baseArea,
        ProjectDocument buildingDocument,
        List<String> specialWindWeightConditionList,
        Boolean inTest,
        List<TestType> testTypeList,
        String estimateFigureDifficulty,
        String estimateTestDifficulty,
        String estimateEvaluationDifficulty,
        String estimateReportDifficulty
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
        this.specialWindWeightConditionList = specialWindWeightConditionList;
        this.inTest = inTest;
        this.testTypeList = testTypeList;
        this.estimateFigureDifficulty = estimateFigureDifficulty;
        this.estimateTestDifficulty = estimateTestDifficulty;
        this.estimateEvaluationDifficulty = estimateEvaluationDifficulty;
        this.estimateReportDifficulty = estimateReportDifficulty;
//        if (Objects.nonNull(name) && !name.isEmpty()) {
//            this.name = name;
//        }
//        if (Objects.nonNull(site)) {
//            this.site = site;
//        }
//        if (Objects.nonNull(shape) && !shape.isEmpty()) {
//            this.shape = shape;
//        }
//        if (Objects.nonNull(floorCount)) {
//            this.floorCount = floorCount;
//        }
//        if (Objects.nonNull(height)) {
//            this.height = height;
//        }
//        if (Objects.nonNull(baseArea)) {
//            this.baseArea = baseArea;
//        }
//        if (Objects.nonNull(this.baseArea) && Objects.nonNull(this.height)) {
//            if (this.baseArea > 0) {
//                this.ratio = this.height / Math.sqrt(this.baseArea);
//            } else {
//                this.ratio = null;
//            }
//        }
//        if (Objects.nonNull(buildingDocument)) {
//            this.buildingDocument = buildingDocument;
//        }
//        if (Objects.nonNull(specialWindWeightConditionList)) {
//            if (Objects.isNull(this.specialWindWeightConditionList)) {
//                this.specialWindWeightConditionList = specialWindWeightConditionList;
//            } else {
//                List<String> result = new ArrayList<>();
//                for (String item : specialWindWeightConditionList) {
//                    if (result.contains(item)) {
//                        continue;
//                    }
//                    result.add(item);
//                }
//                for (String item : this.specialWindWeightConditionList) {
//                    if (result.contains(item)) {
//                        continue;
//                    }
//                    result.add(item);
//                }
//                this.specialWindWeightConditionList = result;
//            }
//        }
//        if (Objects.nonNull(inTest)) {
//            this.inTest = inTest;
//        }
//        if (Objects.nonNull(testTypeList)) {
//            if (Objects.isNull(this.testTypeList)) {
//                this.testTypeList = testTypeList;
//            } else {
//                List<TestType> result = new ArrayList<>();
//                for (TestType item : testTypeList) {
//                    if (result.contains(item)) {
//                        continue;
//                    }
//                    result.add(item);
//                }
//                for (TestType item : this.testTypeList) {
//                    if (result.contains(item)) {
//                        continue;
//                    }
//                    result.add(item);
//                }
//                this.testTypeList = result;
//            }
//        }
//        if (Objects.nonNull(estimateFigureDifficulty) && !estimateFigureDifficulty.isEmpty()) {
//            this.estimateFigureDifficulty = estimateFigureDifficulty;
//        }
//        if (Objects.nonNull(estimateTestDifficulty) && !estimateTestDifficulty.isEmpty()) {
//            this.estimateTestDifficulty = estimateTestDifficulty;
//        }
//        if (Objects.nonNull(estimateEvaluationDifficulty) && !estimateEvaluationDifficulty.isEmpty()) {
//            this.estimateEvaluationDifficulty = estimateEvaluationDifficulty;
//        }
//        if (Objects.nonNull(estimateReportDifficulty) && !estimateReportDifficulty.isEmpty()) {
//            this.estimateReportDifficulty = estimateReportDifficulty;
//        }
    }
}
