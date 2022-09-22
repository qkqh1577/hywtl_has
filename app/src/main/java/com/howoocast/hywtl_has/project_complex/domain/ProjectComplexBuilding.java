package com.howoocast.hywtl_has.project_complex.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
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


    public List<EventEntity> update(
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
        List<EventEntity> eventList = new ArrayList<>();
        if (Objects.nonNull(name)) {
            eventList.add(EventEntity.of(
                "이름 변경",
                this.name,
                name
            ));
            this.name = name;
        }
        if (Objects.nonNull(site)) {
            eventList.add(EventEntity.of(
                "대지 모형 변경",
                this.site,
                site
            ));
            this.site = site;
        }
        if (Objects.nonNull(shape)) {
            eventList.add(EventEntity.of(
                "평면 형상 변경",
                this.shape,
                shape
            ));
            this.shape = shape;
        }
        if (Objects.nonNull(floorCount)) {
            eventList.add(EventEntity.of(
                "층 수 변경",
                this.floorCount,
                floorCount
            ));
            this.floorCount = floorCount;
        }
        if (Objects.nonNull(height)) {
            eventList.add(EventEntity.of(
                "높이 변경",
                this.height,
                height
            ));
            this.height = height;
        }
        if (Objects.nonNull(baseArea)) {
            eventList.add(EventEntity.of(
                "기준 층 바닥 면적 변경",
                this.baseArea,
                baseArea
            ));
            this.baseArea = baseArea;
        }
        if (Objects.nonNull(this.height)
            && Objects.nonNull(this.baseArea)
            && this.height > 0
            && this.baseArea > 0
        ) {
            Double ratio = this.height / Math.sqrt(this.baseArea);
            eventList.add(EventEntity.of(
                "형상비 변경",
                this.ratio,
                ratio
            ));
            this.ratio = ratio;
        } else {
            eventList.add(EventEntity.of(
                "형상비 변경",
                this.ratio,
                null
            ));
            this.ratio = null;
        }
        if (Objects.nonNull(buildingDocument)) {
            eventList.add(EventEntity.of(
                "형상비 검토 파일 변경",
                this.buildingDocument,
                buildingDocument
            ));
            this.buildingDocument = buildingDocument;
        }
        if (Objects.nonNull(conditionList)) {
            eventList.add(EventEntity.of(
                "특별 풍하중 조건 변경",
                this.conditionList,
                conditionList
            ));
            this.conditionList = conditionList;
        }
        if (Objects.nonNull(inTest)) {
            eventList.add(EventEntity.of(
                "실험 대상 여부 변경",
                this.inTest,
                inTest
            ));
            this.inTest = inTest;
        }
        if (Objects.nonNull(testTypeList)) {
            eventList.add(EventEntity.of(
                "실험 종류 변경",
                Optional.ofNullable(this.testTypeList).map(
                    list -> list.stream().map(TestType::getName)
                        .collect(Collectors.toList())
                ).orElse(null),
                Optional.of(testTypeList).map(
                    list -> list.stream().map(TestType::getName)
                        .collect(Collectors.toList())
                ).orElse(null)));
            this.testTypeList = testTypeList;
        }
        if (Objects.nonNull(estimateFigureDifficulty)) {
            eventList.add(EventEntity.of(
                "견적 제작 난이도 변경",
                this.estimateFigureDifficulty,
                estimateFigureDifficulty
            ));
            this.estimateFigureDifficulty = estimateFigureDifficulty;
        }
        if (Objects.nonNull(estimateTestDifficulty)) {
            eventList.add(EventEntity.of(
                "견적 실험 난이도 변경",
                this.estimateTestDifficulty,
                estimateTestDifficulty
            ));
            this.estimateTestDifficulty = estimateTestDifficulty;
        }
        if (Objects.nonNull(estimateEvaluationDifficulty)) {
            eventList.add(EventEntity.of(
                "견적 평가 난이도 변경",
                this.estimateEvaluationDifficulty,
                estimateEvaluationDifficulty
            ));
            this.estimateEvaluationDifficulty = estimateEvaluationDifficulty;
        }
        if (Objects.nonNull(estimateReportDifficulty)) {
            eventList.add(EventEntity.of(
                "견적 보고서 난이도 변경",
                this.estimateReportDifficulty,
                estimateReportDifficulty
            ));
            this.estimateReportDifficulty = estimateReportDifficulty;
        }
        return eventList;
    }
}
