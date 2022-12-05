package com.howoocast.hywtl_has.project_log.repository;

import com.howoocast.hywtl_has.project_log.domain.ProjectLog;
import com.howoocast.hywtl_has.project_log.domain.QProjectLog;
import com.howoocast.hywtl_has.user.domain.QUser;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
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
public class ProjectLogSearchRepository {

    private final JPAQueryFactory queryFactory;

    private final EntityManager entityManager;

    private static final QProjectLog projectLog = QProjectLog.projectLog;
    private static final QUser user = QUser.user;

    public Page<ProjectLog> findAll(Predicate predicate, Pageable pageable) {

        List<ProjectLog> list = queryFactory
            .selectFrom(projectLog)
            .join(user)
            .on(projectLog.userId.eq(user.id))
            .where(predicate)
            .fetch();

        int start = (int) pageable.getOffset();
        int end = Math.min(list.size(), start + pageable.getPageSize());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    public void save(ProjectLog instance) {
        entityManager.persist(instance);
    }

}
