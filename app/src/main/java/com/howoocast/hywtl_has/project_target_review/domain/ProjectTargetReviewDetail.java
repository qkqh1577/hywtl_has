package com.howoocast.hywtl_has.project_target_review.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = "project_target_review_detail")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_target_review_detail set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetReviewDetail extends CustomEntity {

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
        Double ratio = height / Math.sqrt(area);
        return new ProjectTargetReviewDetail(
            buildingName,
            floorCount,
            baseCount,
            height,
            area,
            ratio,
            specialWindLoadConditionList,
            testList,
            memo1,
            memo2
        );
    }
}
