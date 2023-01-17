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
            "총괄본부",
            DepartmentCategory.HQ,
            hanYang,
            2,
            null
        );
        em.persist(headquarter);

        Department headquarter2 = Department.of();
        headquarter2.change(
            "영업본부",
            DepartmentCategory.HQ,
            headquarter,
            3,
            null
        );
        em.persist(headquarter2);

        Department headquarter3 = Department.of();
        headquarter3.change(
            "기술본부",
            DepartmentCategory.HQ,
            headquarter,
            3,
            null
        );
        em.persist(headquarter3);

        Department headquarter4 = Department.of();
        headquarter4.change(
            "경영전략본부",
            DepartmentCategory.HQ,
            headquarter,
            3,
            null
        );
        em.persist(headquarter4);

        Department technicalTeam = Department.of();
        technicalTeam.change(
            "기술팀",
            DepartmentCategory.TEAM,
            headquarter3,
            4,
            null
        );
        em.persist(technicalTeam);

        Department salesTeam = Department.of();
        salesTeam.change(
            "영업팀",
            DepartmentCategory.TEAM,
            headquarter2,
            4,
            null
        );
        em.persist(salesTeam);

        Department modelingTeam = Department.of();
        modelingTeam.change(
            "모형팀",
            DepartmentCategory.TEAM,
            headquarter3,
            4,
            null
        );
        em.persist(modelingTeam);


        Department marketingTeam = Department.of();
        marketingTeam.change(
            "마케팅팀",
            DepartmentCategory.TEAM,
            headquarter3,
            4,
            null
        );
        em.persist(marketingTeam);

        Department technicalPart = Department.of();
        technicalPart.change(
            "기술 부서",
            DepartmentCategory.PART,
            technicalTeam,
            5,
            null
        );
        em.persist(technicalPart);

        Department experimentPart = Department.of();
        experimentPart.change(
            "실험 부서",
            DepartmentCategory.PART,
            technicalTeam,
            5,
            null
        );
        em.persist(experimentPart);

        Department editPart = Department.of();
        editPart.change(
            "편집 부서",
            DepartmentCategory.PART,
            technicalTeam,
            5,
            null
        );
        em.persist(editPart);


        Department salesPart = Department.of();
        salesPart.change(
            "영업 부서",
            DepartmentCategory.PART,
            salesTeam,
            5,
            null
        );
        em.persist(salesPart);

        Department marketingPart = Department.of();
        marketingPart.change(
            "마케팅 부서",
            DepartmentCategory.PART,
            salesTeam,
            5,
            null
        );
        em.persist(marketingPart);

        Department design1Part = Department.of();
        design1Part.change(
            "디자인 1부서",
            DepartmentCategory.PART,
            modelingTeam,
            5,
            null
        );
        em.persist(design1Part);

        Department design2Part = Department.of();
        design2Part.change(
            "디자인 2부서",
            DepartmentCategory.PART,
            modelingTeam,
            5,
            null
        );
        em.persist(design2Part);

        Department productionPart = Department.of();
        productionPart.change(
            "기계제작 부서",
            DepartmentCategory.PART,
            modelingTeam,
            5,
            null
        );
        em.persist(productionPart);

        Department tubingPart = Department.of();
        tubingPart.change(
            "튜빙 부서",
            DepartmentCategory.PART,
            modelingTeam,
            5,
            null
        );
        em.persist(tubingPart);

        em.flush();
        em.clear();
    }
}
