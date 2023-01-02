package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DepartmentInitDataService {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void init() {
        Department hanYang = Department.of();
        hanYang.change(
            "한양풍동실험연구소",
            DepartmentCategory.COMPANY,
            null,
            1,
            null
        );
        em.persist(hanYang);

        Department headquarter = Department.of();
        headquarter.change(
            "기술본부",
            DepartmentCategory.HQ,
            null,
            1,
            null
        );
        em.persist(headquarter);

        Department technicalTeam = Department.of();
        technicalTeam.change(
            "기술팀",
            DepartmentCategory.TEAM,
            headquarter,
            2,
            null
        );
        em.persist(technicalTeam);

        Department salesTeam = Department.of();
        salesTeam.change(
            "영업팀",
            DepartmentCategory.TEAM,
            headquarter,
            2,
            null
        );
        em.persist(salesTeam);

        Department modelingTeam = Department.of();
        modelingTeam.change(
            "모형팀",
            DepartmentCategory.TEAM,
            headquarter,
            2,
            null
        );
        em.persist(modelingTeam);

        Department technicalPart = Department.of();
        technicalPart.change(
            "기술부",
            DepartmentCategory.PART,
            technicalTeam,
            3,
            null
        );
        em.persist(technicalPart);

        Department experimentPart = Department.of();
        experimentPart.change(
            "실험부",
            DepartmentCategory.PART,
            technicalTeam,
            3,
            null
        );
        em.persist(experimentPart);

        Department editPart = Department.of();
        editPart.change(
            "편집부",
            DepartmentCategory.PART,
            technicalTeam,
            3,
            null
        );
        em.persist(editPart);
    }
}
