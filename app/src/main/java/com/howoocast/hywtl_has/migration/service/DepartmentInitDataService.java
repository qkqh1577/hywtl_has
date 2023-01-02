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
            "본사",
            DepartmentCategory.HQ,
            null,
            1,
            null
        );
        em.persist(headquarter);

        //TODO: Team, Part 추가
    }
}
