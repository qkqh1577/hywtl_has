package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

/**
 * 프로젝트 - 기본 정보 - 수주 기여자 - 사내
 */
@Slf4j
@Getter
@Entity
@Table(name = ProjectBasicInternalContributor.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class ProjectBasicInternalContributor extends CustomEntity {

    public static final String KEY = "project_basic_internal_contributor";

    @ManyToOne
    private Project project;

    /**
     * 기여도
     */
    private Double rate;

    /**
     * 내부 기여자
     */
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;


}
