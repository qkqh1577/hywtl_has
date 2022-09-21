package com.howoocast.hywtl_has.project_log.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = ProjectLog.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectLog extends CustomEntity {

    public static final String KEY = "project_log";

    /**
     * 프로젝트
     */
    @NotNull
    @ManyToOne
    private Project project;

    /**
     * 탭명
     */
    @NotBlank
    @Column(
        nullable = false,
        updatable = false
    )
    private String tabName;

    /**
     * 섹션명
     */
    @NotBlank
    @Column(
        nullable = false,
        updatable = false
    )
    private String sectionName;

    /**
     * 항목명
     */
    @NotBlank
    @Column(
        nullable = false,
        updatable = false
    )
    private String itemName;

    /**
     * 변경 전
     */
    @Column(
        name = "before_state",
        updatable = false
    )
    private String before;

    /**
     * 변경 후
     */
    @Column(
        name = "after_state",
        updatable = false
    )
    private String after;

    /**
     * 유저 id
     */
    @NotNull
    @Column(
        nullable = false,
        updatable = false
    )
    private Long userId;

    @Transient
    @Setter
    private User user;
}
