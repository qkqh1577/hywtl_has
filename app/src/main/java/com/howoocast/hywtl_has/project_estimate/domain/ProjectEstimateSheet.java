package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
@Table(name = "project_estimate_sheet")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_estimate_sheet set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateSheet extends CustomEntity {


    @NotBlank
    @Column(nullable = false)
    private Boolean confirmed; // 확정 여부

    @NotNull
    @Column(nullable = false)
    private ProjectEstimateSheetStatus status; // 상태

    @NotBlank
    @Column(nullable = false)
    private String title; // 제목

    private String memo; // 비고

    @ManyToOne
    private User writer; // 작성자

    private LocalDate estimateDate; // 견적 일자

    private LocalDate expectedStartMonth; // 착수 가능 월

    @ManyToOne
    private User salesTeamLeader; // 영업팀장

    @ManyToOne
    private User salesManagementLeader; // 영업실장



}
