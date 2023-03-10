package com.howoocast.hywtl_has.personnel.repository;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.domain.QPersonnel;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class PersonnelRepository {

    private final EntityManager entityManager;

    private final JPAQueryFactory queryFactory;
    private static final QPersonnel personnel = QPersonnel.personnel;

    public Optional<Personnel> findById(Long id) {
        BooleanBuilder criteria = new BooleanBuilder();
        criteria.and(personnel.id.eq(id));
        return queryFactory
            .selectFrom(personnel)
            .where(criteria)
            .stream().findFirst();
    }

    public Optional<Personnel> findByUser_Id(Long userId) {
        BooleanBuilder criteria = new BooleanBuilder();
        criteria.and(personnel.user.id.eq(userId));
        return queryFactory
            .selectFrom(personnel)
            .where(criteria)
            .stream().findFirst();
    }

    public List<Personnel> findByDepartment_Id(Long departmentId) {
        BooleanBuilder criteria = new BooleanBuilder();
        criteria.and(personnel.jobList.any().department.id.eq(departmentId));
        return queryFactory
            .selectFrom(personnel)
            .where(criteria)
            .fetch();
    }

    public Page<Personnel> findAll(Predicate predicate, Pageable pageable) {
        List<Personnel> list = this.findAll(predicate);
        int start = (int) pageable.getOffset();
        int end = Math.min(list.size(), start + pageable.getPageSize());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    public List<Personnel> findAll(Predicate predicate) {
        return queryFactory
            .selectFrom(personnel)
            .where(predicate)
            .fetch();
    }

    public Personnel save(Personnel source) {
        entityManager.persist(source);
        return source;
    }

}
