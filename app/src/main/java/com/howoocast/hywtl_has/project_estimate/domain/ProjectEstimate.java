package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DiscriminatorFormula;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Getter
@Entity
@Table(name = ProjectEstimate.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorFormula("case when type ='SYSTEM' then 'SYSTEM' else 'CUSTOM' end")
public abstract class ProjectEstimate extends CustomEntity {

    public static final String KEY = "project_estimate";
    /**
     * 견적 번호
     */
    @NotBlank
    @Column(nullable = false)
    private String code;

    /**
     * 견적 구분
     */
    @NotBlank
    @Column(nullable = false)
    private String type;

    /**
     * 송부 여부
     */
    @NotNull
    @Column(nullable = false)
    private Boolean isSent;

    /**
     * 최종 여부
     */
    @NotNull
    @Column(nullable = false)
    private Boolean confirmed;

    /**
     * 송신처
     */
    @NotBlank
    @Column(nullable = false)
    private String recipient;

    /**
     * LH 여부
     */
    private Boolean isLh;

    /**
     * 비고
     */
    private String note;

    /**
     * 작성자
     */
    @ManyToOne
    private User writer;

    @ManyToOne
    private Project project;

    @Embedded
    private ProjectEstimatePlan plan;

    @ManyToOne
    private Business business;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectEstimateComplexSite> siteList;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectEstimateComplexBuilding> buildingList;

    protected ProjectEstimate(
        String code,
        ProjectEstimateType type,
        Boolean isSent,
        String recipient,
        @Nullable Boolean isLh,
        String note,
        User writer,
        Project project,
        Business business
    ) {
        this.project = project;
        this.code = code;
        this.type = type.name();
        this.recipient = recipient;
        this.isLh = Optional.ofNullable(isLh).orElse(project.getBasic().getIsLh());
        this.note = note;
        this.writer = writer;
        this.isSent = isSent;
        this.confirmed = false;
        this.business = business;
    }

    private ProjectEstimate(
        String code,
        User writer,
        Project project
    ) {
        this.project = project;
        this.code = code;
        this.writer = writer;
    }

    public static ProjectEstimate of(
        String code,
        User writer,
        Project project
    ) {
        return new ProjectEstimate(
            code,
            writer,
            project
        ) {
        };
    }

    public List<EventEntity> change(
        Boolean isSent,
        String recipient,
        Boolean isLh,
        String note,
        Business business
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "송부 여부 변경",
            this.isSent,
            isSent
        ));
        this.isSent = isSent;
        eventList.add(EventEntity.of(
            "송신처 변경",
            this.recipient,
            recipient
        ));
        this.recipient = recipient;
        eventList.add(EventEntity.of(
            "LH 여부 변경",
            this.isLh,
            isLh
        ));
        this.isLh = isLh;
        eventList.add(EventEntity.of(
            "비고 변경",
            this.note,
            note
        ));
        this.note = note;
        eventList.add(EventEntity.of(
            "견적 업체 변경",
            this.business,
            business
        ));
        this.business = business;
        return eventList;
    }

    public List<EventEntity> changePlan(@Nullable ProjectEstimatePlan plan) {
        List<EventEntity> eventList = new ArrayList<>();

        eventList.add(EventEntity.of(
            "견적 일자 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getEstimateDate).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getEstimateDate).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "착수 가능일 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getExpectedServiceDate).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getExpectedServiceDate).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "설풍 납품 가능 주 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getExpectedTestDeadline).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getExpectedTestDeadline).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "최종 보고서 납품 가능 주 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getExpectedFinalReportDeadline).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getExpectedFinalReportDeadline).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "풍동 금액 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getTestAmount).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getTestAmount).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "구검 금액 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getReviewAmount).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getReviewAmount).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "특별 할인 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getDiscountAmount).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getDiscountAmount).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "합계 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getTotalAmount).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getTotalAmount).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "견적 담당자1 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getManager1).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getManager1).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "견적 담당자2 변경",
            Optional.ofNullable(this.plan).map(ProjectEstimatePlan::getManager2).orElse(null),
            Optional.ofNullable(plan).map(ProjectEstimatePlan::getManager2).orElse(null)
        ));

        this.plan = plan;
        return eventList;
    }

    public List<EventEntity> changeSiteList(List<ProjectEstimateComplexSite> siteList) {
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "대지 모형 목록 변경",
            Objects.isNull(this.siteList) || this.siteList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함",
            siteList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함"
        ));
        this.siteList = siteList;
        return eventList;
    }

    public List<EventEntity> changeBuildingList(List<ProjectEstimateComplexBuilding> buildingList) {
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "동 목록 변경",
            Objects.isNull(this.buildingList) || this.buildingList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함",
            buildingList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함"
        ));
        this.buildingList = buildingList;
        return eventList;
    }

    public void changeConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }
}
