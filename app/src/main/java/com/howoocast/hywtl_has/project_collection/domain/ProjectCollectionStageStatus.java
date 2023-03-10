package com.howoocast.hywtl_has.project_collection.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectCollectionStageStatus.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectCollectionStageStatus extends CustomEntity {

    public static final String KEY = "project_collection_stage_status";

    /**
     * 현황 구분
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectCollectionStageStatusType type;
    /**
     * 예정일
     */
    @Column
    private LocalDate expectedDate;

    /**
     * 요청 일자
     */
    @Column
    private LocalDate requestedDate;

    /**
     * 변경 예정일
     */
    @Column
    private LocalDate delayedDate;

    /**
     * 금액
     */
    private Long amount;

    /**
     * 비고
     */
    private String note;

    // @migration @Nullable 추가
    public static ProjectCollectionStageStatus of(
        ProjectCollectionStageStatusType type,
        @Nullable LocalDate requestedDate,
        Long amount,
        @Nullable String note,
        @Nullable LocalDate delayedDate,
        @Nullable LocalDate expectedDate
    ) {
        ProjectCollectionStageStatus instance = new ProjectCollectionStageStatus();
        instance.type = type;
        instance.requestedDate = requestedDate;
        instance.amount = amount;
        instance.note = note;
        instance.delayedDate = delayedDate;
        instance.expectedDate = expectedDate;
        return instance;
    }
}
