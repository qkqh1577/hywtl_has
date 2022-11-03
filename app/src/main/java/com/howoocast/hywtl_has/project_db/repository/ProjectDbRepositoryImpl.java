package com.howoocast.hywtl_has.project_db.repository;

import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.howoocast.hywtl_has.project.domain.QProject.project;
import static com.howoocast.hywtl_has.project_complex.domain.QProjectComplexSite.projectComplexSite;
import static com.howoocast.hywtl_has.project_estimate.domain.QProjectEstimate.projectEstimate;
import static com.howoocast.hywtl_has.project_bid.domain.QProjectBid.projectBid;
import static com.howoocast.hywtl_has.project_memo.domain.QProjectMemo.projectMemo;

@Repository
public class ProjectDbRepositoryImpl implements ProjectDbRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public ProjectDbRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<ProjectDbView> findAll(ProjectDbParameter parameter) {

        ArrayList<Expression> classes = new ArrayList<>() {{
            add(project);
            if (parameter.getProjectEstimate()) add(projectEstimate);
            if (parameter.getProjectComplexSite()) add(projectComplexSite);
            if (parameter.getProjectBid()) add(projectBid);
            if (parameter.getProjectMemo()) add(projectMemo);
        }};

        JPAQuery<Tuple> query = jpaQueryFactory.select(classes.toArray(new Expression[classes.size()])).from(project);
        if (parameter.getProjectEstimate())
            query = query.leftJoin(projectEstimate).on(project.id.eq(projectEstimate.project.id));
        if (parameter.getProjectComplexSite())
            query = query.leftJoin(projectComplexSite).on(project.id.eq(projectComplexSite.project.id));
        if (parameter.getProjectBid())
            query = query.leftJoin(projectBid).on(project.id.eq(projectBid.project.id));
        if (parameter.getProjectMemo())
            query = query.leftJoin(projectMemo).on(project.id.eq(projectMemo.project.id));

        return query.distinct().fetch().stream().map(tuple -> {
            return new ProjectDbView(
                    classes.stream().map(qclass -> tuple.get(qclass)).collect(Collectors.toList()).toArray());
        }).collect(Collectors.toList());

    }

}
