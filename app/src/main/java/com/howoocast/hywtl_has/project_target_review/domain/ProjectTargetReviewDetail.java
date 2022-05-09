package com.howoocast.hywtl_has.project_target_review.domain;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetReviewDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String buildingName; // 건물(동)

    @NotNull
    @Column(nullable = false)
    private Integer floorCount; // 층 수

    private Integer baseCount; // 지하층 수

    @NotNull
    @Column(nullable = false)
    private Double height; // 높이(m)

    @NotNull
    @Column(nullable = false)
    private Double area; // 면적(㎡)

    @NotNull
    @Column(nullable = false)
    private Double ratio; // 형상비

    @ElementCollection
    private List<String> specialWindLoadConditionList; // 특별풍하중 조건

    @ElementCollection
    private List<String> testList; // 실험 종류

    private String memo1; // 비고1

    private String memo2; // 비고2

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectTargetReviewDetail of(
        String buildingName,
        Integer floorCount,
        Integer baseCount,
        Double height,
        Double area,
        List<String> specialWindLoadConditionList,
        List<String> testList,
        String memo1,
        String memo2
    ) {
        ProjectTargetReviewDetail instance = new ProjectTargetReviewDetail();
        instance.buildingName = buildingName;
        instance.floorCount = floorCount;
        instance.baseCount = baseCount;
        instance.height = height;
        instance.area = area;
        instance.ratio = height / Math.sqrt(area);
        instance.specialWindLoadConditionList = specialWindLoadConditionList;
        instance.testList = testList;
        instance.memo1 = memo1;
        instance.memo2 = memo2;
        return instance;
    }
    //////////////////////////////////
    //// finder
    //////////////////////////////////

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////

}
