package com.howoocast.hywtl_has.project_db.repository;

import com.howoocast.hywtl_has.project.domain.*;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_db.configuration.ProjectDbInformationSchema;
import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.howoocast.hywtl_has.project.domain.QProject.project;
import static com.howoocast.hywtl_has.project_complex.domain.QProjectComplexSite.projectComplexSite;
import static com.howoocast.hywtl_has.project_estimate.domain.QProjectEstimate.projectEstimate;
import static com.howoocast.hywtl_has.project_bid.domain.QProjectBid.projectBid;
import static com.howoocast.hywtl_has.project_memo.domain.QProjectMemo.projectMemo;
import static com.howoocast.hywtl_has.project_contract.domain.QProjectContract.projectContract;

@Slf4j
@Repository
public class ProjectDbRepositoryImpl implements ProjectDbRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public ProjectDbRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<ProjectDbView> findAll(ProjectDbParameter parameter, ProjectDbInformationSchema schema) throws ClassNotFoundException {

        ArrayList<Expression> classes = new ArrayList<>() {{
            add(project);
            if (parameter.getProjectEstimate()) add(projectEstimate);
            if (parameter.getProjectComplexSite()) add(projectComplexSite);
            if (parameter.getProjectBid()) add(projectBid);
            if (parameter.getProjectMemo()) add(projectMemo);
            if (parameter.getProjectContract()) add(projectContract);
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
        if(parameter.getProjectContract())
            query = query.leftJoin(projectContract).on(project.id.eq(projectContract.project.id));

        BooleanBuilder builder = new BooleanBuilder();

        PathBuilder<Project> projectPathBuilder = new PathBuilder<>(Project.class, "project");
        if (parameter.getSearchFrom() != null && parameter.getSearchTo() != null) {
            log.debug(String.format("Search condition >>>> %s ~ %s", parameter.getSearchFrom(), parameter.getSearchTo()));

            builder.and(
                    projectPathBuilder
                            .getDate("createdAt", LocalDateTime.class)
                            .between(parameter.getSearchFrom().atStartOfDay(),
                                    parameter.getSearchTo().atTime(23,59,59)));
        }

        PathBuilder<ProjectEstimate> projectEstimatePathBuilder = new PathBuilder<>(ProjectEstimate.class, "projectEstimate");
        PathBuilder<ProjectComplexSite> projectComplexSitePathBuilder = new PathBuilder<>(ProjectComplexSite.class, "projectComplexSite");
        PathBuilder<ProjectBid> projectBidPathBuilder = new PathBuilder<>(ProjectBid.class, "projectBid");
        PathBuilder<ProjectMemo> projectMemoPathBuilder = new PathBuilder<>(ProjectMemo.class, "projectMemo");
        PathBuilder<ProjectContract> projectContractPathBuilder = new PathBuilder<>(ProjectContract.class, "projectContract");

        Map<String, ProjectDbInformationSchema.InformationSchema> entityMap = schema.getEntities();

        for (String entityName : parameter.getKeys().keySet()) {
            ProjectDbInformationSchema.InformationSchema entityInfo = entityMap.get(entityName);
            Map<String, Map<String, Object>> attributeMap = entityInfo.getAttributes();

            List<String> attributes = parameter.getKeys().get(entityName);
            List<String> values = parameter.getValues().get(entityName);

            if (attributes == null || values == null) continue;

            for (int i = 0; i < attributes.size(); i++) {
                String attrName = attributes.get(i);
                String attrValue = values.get(i);

                if (attrName == null || attrValue == null || attrValue.equals("")) continue;
                String[] attrNameTemp = attrName.split("\\.");
                String shortAttrName = (attrNameTemp.length == 0) ? attrName : attrNameTemp[attrNameTemp.length - 1];

                Map<String, Object> attributeInfo = attributeMap.get(shortAttrName);
                String attrType = (String) attributeInfo.get("type");

                if ("ProjectView".equals(entityName)) {
                    addCriteria(attrType, attrName, attrValue, builder, projectPathBuilder);
                } else if ("ProjectEstimateView".equals(entityName)) {
                    addCriteria(attrType, attrName, attrValue, builder, projectEstimatePathBuilder);
                } else if ("ProjectComplexSiteView".equals(entityName)) {
                    addCriteria(attrType, attrName, attrValue, builder, projectComplexSitePathBuilder);
                } else if ("ProjectBidView".equals(entityName)) {
                    addCriteria(attrType, attrName, attrValue, builder, projectBidPathBuilder);
                } else if ("ProjectMemoView".equals(entityName)) {
                    addCriteria(attrType, attrName, attrValue, builder, projectMemoPathBuilder);
                } else if ("ProjectContractView".equals(entityName)) {
                    addCriteria(attrType, attrName, attrValue, builder, projectContractPathBuilder);
                }
            }
        }

        query.where(builder);

        return query.distinct().fetch().stream().map(tuple -> {
            return new ProjectDbView(
                    classes.stream().map(qclass -> tuple.get(qclass)).collect(Collectors.toList()).toArray());
        }).collect(Collectors.toList());

    }

    private void addCriteria(
            String attrType, String attrName, String attrValue,
            BooleanBuilder builder, PathBuilder pathBuilder) {

        Class enumType = getEnumClassByName(attrType);
        if (enumType != null) {
            builder.and(pathBuilder.getEnum(attrName, enumType).stringValue().eq(attrValue));
        } else if (attrType.equals("Boolean")) {
            //builder.and(pathBuilder.getBoolean(attrName).stringValue().eq(attrValue));
            builder.and(pathBuilder.getBoolean(attrName).eq(Boolean.valueOf(attrValue)));
        } else {
            builder.and(pathBuilder.getString(attrName).contains(attrValue));
        }
    }

    private Class getEnumClassByName(String className) {
        HashMap<String, Class> classMap = new HashMap<>();
        classMap.put("ProjectBasicBidType", ProjectBasicBidType.class);
        classMap.put("ProjectProgressStatus", ProjectProgressStatus.class);
        classMap.put("ProjectEstimateExpectation", ProjectEstimateExpectation.class);
        classMap.put("ProjectEstimateStatus", ProjectEstimateStatus.class);
        classMap.put("ProjectContractStatus", ProjectContractStatus.class);
        classMap.put("ProjectMemoCategory", ProjectMemoCategory.class);
        return classMap.get(className);
    }

}
