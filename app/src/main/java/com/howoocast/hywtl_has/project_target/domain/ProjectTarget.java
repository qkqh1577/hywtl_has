package com.howoocast.hywtl_has.project_target.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = "project_target")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_target set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTarget extends CustomEntity {

    @JsonBackReference
    @Getter(AccessLevel.NONE)
    @NotNull
    @ManyToOne
    private Project project;

    @NotBlank
    @Column(nullable = false)
    private String code; // 실험 대상 번호

    private String memo; // 비고

    @ElementCollection
    private List<String> testList; // 실험 종류(단지) 목록

    @NotNull
    @ManyToOne
    private User writer;

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL)
    @OrderBy("id asc")
    private List<ProjectTargetDetail> detailList; // 대상 상세 목록

    @OneToMany(mappedBy = "target")
    private List<ProjectEstimateSheet> estimateSheetList;  // 해당 실험대상을 사용한 시스템 견적서 목록

    public static ProjectTarget of(
        Project project,
        String code,
        String memo,
        @Nullable List<String> testList,
        List<ProjectTargetDetail> detailList,
        User writer
    ) {
        ProjectTarget instance = new ProjectTarget();
        instance.project = project;
        instance.code = code;
        instance.memo = memo;
        instance.testList = testList;
        instance.detailList = detailList;
        instance.writer = writer;
        return instance;
    }

    public void change(
        String code,
        @Nullable List<String> testList,
        List<ProjectTargetDetail> detailList,
        String memo
    ) {
        this.code = code;
        this.testList = testList;
        this.detailList = detailList;
        this.memo = memo;
    }
}
