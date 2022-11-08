package com.howoocast.hywtl_has.project_db.repository;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.howoocast.hywtl_has.project.domain.QProject.project;
import static com.howoocast.hywtl_has.project_complex.domain.QProjectComplexSite.projectComplexSite;
import static com.howoocast.hywtl_has.project_estimate.domain.QProjectEstimate.projectEstimate;
import static com.howoocast.hywtl_has.project_bid.domain.QProjectBid.projectBid;
import static com.howoocast.hywtl_has.project_memo.domain.QProjectMemo.projectMemo;

@Slf4j
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

        BooleanBuilder builder = new BooleanBuilder();

        PathBuilder<Project> projectPathBuilder = new PathBuilder<>(Project.class, "project");
        PathBuilder<ProjectEstimate> projectEstimatePathBuilder = new PathBuilder<>(ProjectEstimate.class, ProjectEstimate.KEY);
        PathBuilder<ProjectComplexSite> projectComplexSitePathBuilder = new PathBuilder<>(ProjectComplexSite.class, ProjectComplexSite.KEY);
        PathBuilder<ProjectBid> projectBidPathBuilder = new PathBuilder<>(ProjectBid.class, ProjectBid.KEY);
        PathBuilder<ProjectMemo> projectMemoPathBuilder = new PathBuilder<>(ProjectMemo.class, ProjectMemo.KEY);

        for (String entityName : parameter.getKeys().keySet()) {
            log.debug(String.format("Check where condition for Entity [%s]", entityName));

            List<String> attributes = parameter.getKeys().get(entityName);
            List<String> values = parameter.getValues().get(entityName);

            if (attributes == null || values == null ) continue;

            for (int i = 0; i < attributes.size(); i++) {
                String attrName = attributes.get(i);
                String attrValue = values.get(i);

                if (attrName == null || attrValue == null || attrValue.equals("")) continue;

                if ("ProjectView".equals(entityName)) {
                    builder.and(projectPathBuilder.getString(attrName).contains(attrValue));
                } else if ("ProjectEstimateView".equals(entityName)) {
                    builder.and(projectEstimatePathBuilder.getString(attrName).contains(attrValue));
                } else if ("ProjectComplexSiteView".equals(entityName)) {
                    builder.and(projectComplexSitePathBuilder.getString(attrName).contains(attrValue));
                } else if ("ProjectBidView".equals(entityName)) {
                    builder.and(projectBidPathBuilder.getString(attrName).contains(attrValue));
                } else if ("ProjectMemoView".equals(entityName)) {
                    builder.and(projectMemoPathBuilder.getString(attrName).contains(attrValue));
                }
            }
        }
        //builder.and(path.getString("basic.code").eq("22001"));

        query.where(builder);

        return query.distinct().fetch().stream().map(tuple -> {
            return new ProjectDbView(
                    classes.stream().map(qclass -> tuple.get(qclass)).collect(Collectors.toList()).toArray());
        }).collect(Collectors.toList());

    }

}
