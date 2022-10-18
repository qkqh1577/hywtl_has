package com.howoocast.hywtl_has.project_contract.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectContract.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectContract extends CustomEntity {

    public static final String KEY = "project_contract";

    @ManyToOne
    private Project project;

    @ManyToOne
    private ProjectEstimate estimate;

    /**
     * 계약 번호
     */
    private String code;

    /**
     * 송부 여부
     */
    private Boolean isSent;

    /**
     * 송신처
     */
    private String recipient;

    /**
     * 비고
     */
    private String note;

    /**
     * 확정 여부
     */
    private Boolean confirmed;

    @OneToOne
    @JoinColumn(name = "pdf_file_id")
    private FileItem pdfFile;

    @OneToOne(cascade = CascadeType.ALL)
    private ProjectContractBasic basic;

    @OneToOne(cascade = CascadeType.ALL)
    private ProjectContractCollection collection;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectContractCondition> conditionList;

    @ManyToOne
    private User writer;

    public static ProjectContract of(
        Project project,
        ProjectEstimate estimate,
        String code,
        Boolean isSent,
        String recipient,
        String note,
        ProjectContractBasic basic,
        ProjectContractCollection collection,
        List<ProjectContractCondition> conditionList,
        User writer
    ) {
        ProjectContract instance = new ProjectContract();
        instance.project = project;
        instance.estimate = estimate;
        instance.code = code;
        instance.isSent = isSent;
        instance.recipient = recipient;
        instance.note = note;
        instance.basic = basic;
        instance.collection = collection;
        instance.conditionList = conditionList;
        instance.writer = writer;
        return instance;
    }

    public List<EventEntity> change(
        ProjectEstimate estimate,
        Boolean isSent,
        String recipient,
        String note,
        ProjectContractBasic basic,
        ProjectContractCollection collection,
        List<ProjectContractCondition> conditionList
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "견적서 변경",
            this.estimate,
            estimate
        ));
        this.estimate = estimate;
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
            "비고 변경",
            this.note,
            note
        ));
        this.note = note;
        eventList.add(EventEntity.of(
            "비고 변경",
            this.note,
            note
        ));
        eventList.addAll(this.changeBasic(basic));
        eventList.addAll(this.changeCollection(collection));
        eventList.add(EventEntity.of(
            "용역 계약 조건 변경",
            Objects.isNull(this.conditionList) || this.conditionList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함",
            "복합 내용은 일시 정보만 기록함"
        ));
        this.conditionList = conditionList;

        return eventList;
    }

    public List<EventEntity> changePdfFile(
        @Nullable FileItem pdfFile
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "최종 날인본 변경",
            this.pdfFile,
            pdfFile
        ));
        this.pdfFile = pdfFile;
        return eventList;
    }

    public void changeConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    private List<EventEntity> changeBasic(
        @Nullable ProjectContractBasic after
    ) {
        ProjectContractBasic before = this.basic;
        List<EventEntity> eventList = new ArrayList<>();

        eventList.add(EventEntity.of(
            "용역명 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getServiceName).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getServiceName).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "용역 기간 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getServiceDuration).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getServiceDuration).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "성과품 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getOutcome).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getOutcome).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "추가 사항 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getDescription).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getDescription).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "계약서 날짜 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getContractDate).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getContractDate).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "발주자 소재 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getOrdererAddress).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getOrdererAddress).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "발주자 상호 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getOrdererCompanyName).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getOrdererCompanyName).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "발주자 대표명 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getOrdererCeoName).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getOrdererCeoName).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "수급자 소재 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getContractorAddress).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getContractorAddress).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "수급자 상호 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getContractorCompanyName).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getContractorCompanyName).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "수급자 대표명 변경",
            Optional.ofNullable(before).map(ProjectContractBasic::getContractorCeoName).orElse(null),
            Optional.ofNullable(after).map(ProjectContractBasic::getContractorCeoName).orElse(null)
        ));

        this.basic = after;
        return eventList;
    }


    private List<EventEntity> changeCollection(
        @Nullable ProjectContractCollection after
    ) {
        ProjectContractCollection before = this.collection;
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "기성 단계 비고 변경",
            Optional.ofNullable(before).map(ProjectContractCollection::getStageNote).orElse(null),
            Optional.ofNullable(after).map(ProjectContractCollection::getStageNote).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "기성 단계 항목 변경",
            Objects.isNull(before) || Objects.isNull(before.getStageList()) || before.getStageList().isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함",
            Objects.isNull(after) || Objects.isNull(after.getStageList()) || after.getStageList().isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함"
        ));

        eventList.add(EventEntity.of(
            "총액 비고 변경",
            Optional.ofNullable(before).map(ProjectContractCollection::getTotalAmountNote).orElse(null),
            Optional.ofNullable(after).map(ProjectContractCollection::getTotalAmountNote).orElse(null)
        ));

        eventList.add(EventEntity.of(
            "총액 변경",
            Optional.ofNullable(before).map(ProjectContractCollection::getTotalAmount).orElse(null),
            Optional.ofNullable(after).map(ProjectContractCollection::getTotalAmount).orElse(null)
        ));

        return eventList;
    }
}
