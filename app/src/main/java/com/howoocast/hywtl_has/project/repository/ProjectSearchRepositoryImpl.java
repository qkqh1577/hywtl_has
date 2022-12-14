package com.howoocast.hywtl_has.project.repository;

import static com.howoocast.hywtl_has.business.domain.QBusiness.business;
import static com.howoocast.hywtl_has.business.domain.QBusinessManager.businessManager;
import static com.howoocast.hywtl_has.project.domain.QProject.project;
import static com.howoocast.hywtl_has.project_basic.domain.QProjectBasicBusiness.projectBasicBusiness;
import static com.howoocast.hywtl_has.user.domain.QUser.user;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBidStatus;
import com.howoocast.hywtl_has.project.domain.ProjectContractStatus;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateStatus;
import com.howoocast.hywtl_has.project.domain.ProjectInformationStatus;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.parameter.ProjectSearchParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectSearchParameter.ProjectStatusSearchParameter;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class ProjectSearchRepositoryImpl implements ProjectSearchRepository {

    private final JPAQueryFactory queryFactory;

    public ProjectSearchRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Project> search(ProjectSearchParameter parameter, Pageable pageable) {
        JPAQuery<Project> contentQuery = queryFactory
            .selectFrom(project)
            .leftJoin(project.basic.projectManager, user)
            .leftJoin(project.basic.receptionManager, user)
            .leftJoin(project.basic.salesManager, user)
            .leftJoin(projectBasicBusiness)
            .on(project.id.eq(projectBasicBusiness.project.id))
            .leftJoin(business)
            .on(business.id.eq(projectBasicBusiness.business.id))
            .leftJoin(businessManager)
            .on(businessManager.id.eq(projectBasicBusiness.businessManager.id))
            .where(
                projectNameContains(parameter.getKeywordOfProject()),
                projectInformationStatusEq(parameter.getProjectStatusSearchList()),
                projectDetailEq(parameter.getKeywordOfProjectDetail())
            )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize());
        List<Project> content = contentQuery.fetch();

        JPAQuery<Long> countQuery = queryFactory
            .select(project.count())
            .from(project)
            .leftJoin(project.basic.projectManager, user)
            .leftJoin(project.basic.receptionManager, user)
            .leftJoin(project.basic.salesManager, user)
            .leftJoin(projectBasicBusiness)
            .on(project.id.eq(projectBasicBusiness.project.id))
            .leftJoin(business)
            .on(business.id.eq(projectBasicBusiness.business.id))
            .leftJoin(businessManager)
            .on(businessManager.id.eq(projectBasicBusiness.businessManager.id))
            .where(
                projectNameContains(parameter.getKeywordOfProject()),
                projectInformationStatusEq(parameter.getProjectStatusSearchList()),
                projectDetailEq(parameter.getKeywordOfProjectDetail())
            );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private BooleanExpression projectNameContains(String keywordOfProject) {
        return StringUtils.hasText(keywordOfProject) ? project.basic.name.contains(keywordOfProject)
            .or(project.basic.code.contains(keywordOfProject)) : null;
    }

    private BooleanBuilder projectInformationStatusEq(List<ProjectStatusSearchParameter> projectStatusSearchList) {
        if (projectStatusSearchList.isEmpty()) {
            return null;
        }
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        for (ProjectStatusSearchParameter status : projectStatusSearchList) {
            if (Objects.nonNull(status.getProjectOption()) && Objects.nonNull(status.getProjectSubOption())) {
                booleanBuilder.and(getQuery(status.getProjectOption(), status.getProjectSubOption()));
            }
        }
        return booleanBuilder;
    }

    private BooleanExpression getQuery(String projectOption, String projectSubOption) {
        switch (ProjectInformationStatus.valueOf(projectOption)) {
            case PROGRESS_STATUS:
                return project.status.progressStatus.eq(ProjectProgressStatus.valueOf(projectSubOption));
            case ESTIMATE_EXPECTATION:
                return project.status.estimateExpectation.eq(ProjectEstimateExpectation.valueOf(projectSubOption));
            case ESTIMATE_STATUS:
                return project.status.estimateStatus.eq(ProjectEstimateStatus.valueOf(projectSubOption));
            case CONTRACT_STATUS:
                return project.status.contractStatus.eq(ProjectContractStatus.valueOf(projectSubOption));
            case BID_STATUS:
                return project.status.bidStatus.eq(ProjectBidStatus.valueOf(projectSubOption));
            default:
                return null;
        }
    }

    private BooleanBuilder projectDetailEq(List<String> keywordOfProjectDetail) {
        if (keywordOfProjectDetail.isEmpty()) {
            return null;
        }
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        for (String detail : keywordOfProjectDetail) {
            if (StringUtils.hasText(detail)) {
                booleanBuilder.and(
                    project.basic.name.eq(detail)
                        .or(project.basic.code.eq(detail))
                        .or(project.basic.receptionManager.name.eq(detail))
                        .or(project.basic.projectManager.name.eq(detail))
                        .or(project.basic.salesManager.name.eq(detail))
//                    .or(project.basic.requestedMonth.eq(LocalDate.parse(detail)))
//                    .or(project.basic.expectedMonth.eq(LocalDate.parse(detail)))
                        .or(projectBasicBusiness.business.name.eq(detail))
                        .or(projectBasicBusiness.businessManager.name.eq(detail))
                        .or(projectBasicBusiness.businessManager.mobilePhone.eq(detail))
                        .or(projectBasicBusiness.businessManager.jobTitle.eq(detail))
                );
            }
        }
        return booleanBuilder;
    }
}
