package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
@Table(name = ProjectBasicBusiness.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectBasicBusiness.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBasicBusiness extends CustomEntity {

    public static final String KEY = "project_basic_business";

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectInvolvedType involvedType;

    @ManyToOne
    private Project project;

    @ManyToOne
    private Business business;

    @ManyToOne
    private BusinessManager businessManager;

    public static ProjectBasicBusiness of(
        ProjectInvolvedType involvedType,
        Project project,
        Business business,
        BusinessManager businessManager
    ) {
        ProjectBasicBusiness instance = new ProjectBasicBusiness();
        instance.involvedType = involvedType;
        instance.project = project;
        instance.business = business;
        instance.businessManager = businessManager;
        return instance;
    }

}