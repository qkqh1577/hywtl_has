package com.howoocast.hywtl_has.project_collection.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
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
@Table(name = ProjectCollectionStage.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectCollectionStage extends CustomEntity {

    public static final String KEY = "project_collection_stage";

    @ManyToOne
    private ProjectCollection projectCollection;

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
    //@migration : 예상일이 없는 데이터가 많습니다.
//    @NotNull
//    @Column(nullable = false)
    private LocalDate expectedDate;

    private Integer seq;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectCollectionStageVersion> versionList;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectCollectionStageStatus> statusList;

    public static ProjectCollectionStage of(
        ProjectCollection projectCollection,
        String name,
        Long amount,
        //@migration expectedDate nullable로 들어감.
        @Nullable LocalDate expectedDate,
        String note,
        Integer seq
    ) {
        ProjectCollectionStage instance = new ProjectCollectionStage();
        instance.projectCollection = projectCollection;
        instance.name = name;
        instance.amount = amount;
        instance.expectedDate = expectedDate;
        instance.note = note;
        instance.seq = seq;
        return instance;
    }

    public void updateVersionList(ProjectCollectionStageVersion version) {
        if (Objects.isNull(this.versionList)) {
            this.versionList = new ArrayList<>();
        }
        this.versionList.add(version);
    }

    public List<EventEntity> change(
        @Nullable Boolean dirty,
        String name,
        Long amount,
        LocalDate expectedDate,
        String note,
        String reason,
        List<ProjectCollectionStageStatus> statusList
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        if (Boolean.TRUE.equals(dirty)) {
            if (!Objects.equals(this.name, name)) {
                eventList.add(EventEntity.of(
                    "기성명 변경",
                    this.name,
                    name
                ));
                this.name = name;
            }
            if (!Objects.equals(this.amount, amount)) {
                eventList.add(EventEntity.of(
                    "청구액 변경",
                    this.amount,
                    amount
                ));
                this.amount = amount;
            }
            if (!Objects.equals(this.expectedDate, expectedDate)) {
                eventList.add(EventEntity.of(
                    "예정일 변경",
                    this.expectedDate,
                    expectedDate
                ));
                this.expectedDate = expectedDate;
            }
            if (!Objects.equals(this.note, note)) {
                eventList.add(EventEntity.of(
                    "기성 조건 변경",
                    this.note,
                    note
                ));
                this.note = note;
            }
            ProjectCollectionStageVersion version = ProjectCollectionStageVersion.of(this, reason, statusList);
            if (Objects.isNull(this.versionList)) {
                this.versionList = new ArrayList<>();
            }
            this.versionList.add(version);
        }
        this.statusList = statusList;
        eventList.add(EventEntity.of(
            "수금 현황 변경",
            "복합 내용은 일시 정보만 기록함",
            "복합 내용은 일시 정보만 기록함"
        ));
        return eventList;
    }

    public List<EventEntity> change(
        @Nullable Boolean dirty,
        LocalDate expectedDate,
        String reason,
        List<ProjectCollectionStageStatus> statusList
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        if (Boolean.TRUE.equals(dirty)) {
            if (!Objects.equals(this.expectedDate, expectedDate)) {
                eventList.add(EventEntity.of(
                    "예정일 변경",
                    this.expectedDate,
                    expectedDate
                ));
                this.expectedDate = expectedDate;

                ProjectCollectionStageVersion version = ProjectCollectionStageVersion.of(this, reason, statusList);
                if (Objects.isNull(this.versionList)) {
                    this.versionList = new ArrayList<>();
                }
                this.versionList.add(version);
            }
        }
        return eventList;
    }

    public void changeSeq(Integer seq) {
        this.seq = seq;
    }


    public ProjectCollectionStage updateCollectionStageStatusList(List<ProjectCollectionStageStatus> projectCollectionStageStatusList) {
        this.statusList = projectCollectionStageStatusList;
        return this;
    }
}
