package com.howoocast.hywtl_has.project_target.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.project_target.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "project_target_review")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_target_review set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetReview extends CustomEntity {

    @Getter(AccessLevel.NONE)
    @JsonBackReference
    @ManyToOne
    private Project project;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private ProjectTargetReviewStatus status; // 상태

    @NotBlank
    @Column(nullable = false)
    private String code; // 형상비 번호

    private Integer landFigureCount; // 대지 모형 개수

    @ElementCollection
    private List<String> testList; // 실험 종류(단지) 목록

    @NotNull
    @ManyToOne
    private User writer; // 작성자

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL)
    @OrderBy("id asc")
    private List<ProjectTargetReviewDetail> detailList; // 검토 상세 목록

    @OneToMany(cascade = CascadeType.ALL)
    @OrderBy("createdAt desc")
    private List<FileItem> fileList; // 관련 파일 목록

    @OneToMany(mappedBy = "review")
    private List<ProjectEstimateSheet> estimateSheetList; // 해당 형상비를 사용한 시스템 견적서 목록

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    public Long getProjectId() {
        return project.getId();
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectTargetReview of(
        Project project,
        ProjectTargetReviewStatus status,
        String code,
        Integer landFigureCount,
        @Nullable List<String> testList,
        User writer,
        List<ProjectTargetReviewDetail> detailList,
        @Nullable List<FileItem> fileList
    ) {
        ProjectTargetReview instance = new ProjectTargetReview();
        instance.project = project;
        instance.status = status;
        instance.code = code;
        instance.landFigureCount = landFigureCount;
        instance.testList = testList;
        instance.writer = writer;
        instance.detailList = detailList;
        instance.fileList = fileList;
        return instance;
    }

    public void change(
        ProjectTargetReviewStatus status,
        String code,
        Integer landFigureCount,
        @Nullable List<String> testList,
        List<ProjectTargetReviewDetail> detailList,
        @Nullable List<FileItem> fileList
    ) {
        this.status = status;
        this.code = code;
        this.landFigureCount = landFigureCount;
        this.testList = testList;
        this.detailList = detailList;
        this.fileList = fileList;
    }
}
