package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

/**
 * 프로젝트 - 기본 정보 - 수주 기여자 - 사외
 */
@Slf4j
@Getter
@Entity
@Table(name = ProjectBasicExternalContributor.KEY)
@Where(clause = "deleted_at is null")
public class ProjectBasicExternalContributor extends CustomEntity {

    public static final String KEY = "project_basic_external_contributor";

    @ManyToOne
    private Project project;

    /**
     * 기여도
     */
    private Double rate;

    /**
     * 기여자 소속 업체
     */
    @ManyToOne
    private Business business;

    /**
     * 기여자
     */
    @OneToOne
    @JoinColumn(name = "business_manager_id")
    private BusinessManager businessManager;
}
