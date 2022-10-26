package com.howoocast.hywtl_has.project_collection.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = ProjectCollectionStageVersion.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectCollectionStageVersion extends CustomEntity {

    public static final String KEY = "project_collection_stage_version";

    /**
     * 기성명
     */
    @NotBlank
    @Column(nullable = false)
    private String name;

    /**
     * 청구액(원)
     */
    @NotNull
    @Column(nullable = false)
    private Long amount;

    /**
     * 기성 조건
     */
    private String note;

    /**
     * 예정일
     */
    @NotNull
    @Column(nullable = false)
    private LocalDate expectedDate;

    /**
     * 기성행 변경 사유
     */
    @NotBlank
    @Column(nullable = false)
    private String reason;


    public static ProjectCollectionStageVersion of(
        String name,
        Long amount,
        LocalDate expectedDate,
        String note,
        String reason
    ) {
        ProjectCollectionStageVersion instance = new ProjectCollectionStageVersion();
        instance.name = name;
        instance.amount = amount;
        instance.expectedDate = expectedDate;
        instance.note = note;
        instance.reason = reason;
        return instance;
    }

    public static ProjectCollectionStageVersion of(
        ProjectCollectionStage prevInstance,
        String reason
    ) {
        ProjectCollectionStageVersion instance = new ProjectCollectionStageVersion();
        instance.name = prevInstance.getName();
        instance.amount = prevInstance.getAmount();
        instance.expectedDate = prevInstance.getExpectedDate();
        instance.note = prevInstance.getNote();
        instance.reason = reason;
        return instance;
    }
}
