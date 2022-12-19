package com.howoocast.hywtl_has.project.repository;

import static com.howoocast.hywtl_has.business.domain.QBusiness.business;
import static com.howoocast.hywtl_has.business.domain.QBusinessManager.businessManager;
import static com.howoocast.hywtl_has.project.domain.QProject.project;
import static com.howoocast.hywtl_has.project_basic.domain.QProjectBasicBusiness.projectBasicBusiness;
import static com.howoocast.hywtl_has.user.domain.QUser.user;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
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
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class ProjectSearchRepositoryImpl implements ProjectSearchRepository {

    private final JPAQueryFactory queryFactory;

    public ProjectSearchRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Project> search(ProjectSearchParameter parameter) {
        return queryFactory
            .selectFrom(project)
            .leftJoin(project.basic.projectManager, user)
            .leftJoin(project.basic.receptionManager, user)
            .leftJoin(project.basic.salesManager, user)
            .leftJoin(projectBasicBusiness)
            .on(project.id.eq(projectBasicBusiness.project.id))
            .leftJoin(projectBasicBusiness.business, business)
            .leftJoin(projectBasicBusiness.businessManager, businessManager)
            .where(
                projectNameContains(parameter.getKeywordOfProject()),
                projectInformationStatusEq(parameter.getProjectStatusSearchList()),
                projectDetailEq(parameter.getKeywordOfProjectDetail())
            ).fetch();
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
                    project.basic.name.contains(detail)
                        .or(project.basic.code.contains(detail))
                        .or(project.basic.alias.contains(detail))
                        .or(project.basic.receptionManager.name.eq(detail))
                        .or(project.basic.projectManager.name.eq(detail))
                        .or(project.basic.salesManager.name.eq(detail))
                        .or(isMatchedBidType(detail) ? project.basic.bidType.eq(getBidType(detail)) : null)
                        .or(isParsedToLocalDate(detail) ? project.basic.requestedMonth.eq(LocalDate.parse(detail)) : null)
                        .or(isParsedToLocalDate(detail) ? project.basic.expectedMonth.eq(LocalDate.parse(detail)) : null)
                        .or(projectBasicBusiness.business.name.eq(detail))
                        .or(projectBasicBusiness.businessManager.name.eq(detail))
                        .or(projectBasicBusiness.businessManager.mobilePhone.eq(detail))
                        .or(projectBasicBusiness.businessManager.jobTitle.eq(detail))
                        .or(projectBasicBusiness.businessManager.department.eq(detail))
                );
            }
        }
        return booleanBuilder;
    }

    private boolean isParsedToLocalDate(String detail) {
        return detail.matches("^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$");
    }

    private ProjectBasicBidType getBidType(String detail) {
        return Arrays.stream(ProjectBasicBidType.values())
            .filter(bidType -> bidType.getName().startsWith(detail))
            .findFirst()
            .get();
    }

    private Boolean isMatchedBidType(String detail) {
        return Arrays.stream(ProjectBasicBidType.values())
            .anyMatch(bidType -> bidType.getName().startsWith(detail));
    }
}
