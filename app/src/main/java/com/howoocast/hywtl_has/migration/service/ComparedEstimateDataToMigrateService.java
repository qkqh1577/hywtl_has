package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.migration.enums.ComparedEstimateHeader;
import com.howoocast.hywtl_has.migration.enums.ProjectDesignHeader;
import com.howoocast.hywtl_has.migration.loader.ComparedEstimateExcelReader;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateType;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class ComparedEstimateDataToMigrateService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    private final BusinessRepository businessRepository;

    private final ProjectEstimateRepository projectEstimateRepository;

    @Transactional
    public void migrate() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<Map<String, String>> estimateList = ComparedEstimateExcelReader.excelReader();
            estimateList.forEach(estimateMap -> {
                String value = estimateMap.get(ComparedEstimateHeader.CODE.getName());
                String code = value;
                if (value == null) {
                    return;
                }
                if (!value.contains("-")) {
                    code = value.substring(0, value.length() - 2);
                }

                String finalCode = code;

                projectRepository.findByBasic_Code(finalCode).ifPresentOrElse(project -> {
                        setComparedEstimate(a, estimateMap, project);
                    },
                    () -> {
                        Project project = Project.of(
                            finalCode,
                            estimateMap.get(ProjectDesignHeader.NAME.getName()),
                            ProjectBasicBidType.DEFAULT,
                            a,
                            ProjectProgressStatus.UNDER_CONTRACT
                        );
                        em.persist(project);
                        setComparedEstimate(a, estimateMap, project);
                    });
            });
        });
    }

    private void setComparedEstimate(User a, Map<String, String> estimateMap, Project project) {
        businessRepository.findByName(
                estimateMap.get(ComparedEstimateHeader.BUSINESS_NAME.getName())
                    .replaceAll(" ", ""))
            .ifPresentOrElse(business -> {
                    String estimateCode = getCode(project);

                    ProjectEstimate estimate = ProjectEstimate.of(
                        estimateCode,
                        a,
                        project
                    );

                    ProjectCustomEstimate comparedEstimate = ProjectCustomEstimate.of(
                        estimate,
                        ProjectEstimateType.COMPARISON,
                        Boolean.TRUE,
                        estimateMap.get(ComparedEstimateHeader.RECIPIENT.getName()),
                        business
                    );
                    em.persist(comparedEstimate);
                },
                () -> {
                    String estimateCode = getCode(project);

                    // 의뢰처 데이터를 먼저 업체관리에 저장.
                    if (StringUtils.hasText(estimateMap.get(
                        ComparedEstimateHeader.BUSINESS_NAME.getName()))) {
                        Business business = Business.of(
                            estimateMap.get(
                                    ComparedEstimateHeader.BUSINESS_NAME.getName())
                                .replaceAll(" ", ""),
                            "000-00-00000",
                            null,
                            null,
                            null
                        );
                        em.persist(business);

                        ProjectEstimate estimate = ProjectEstimate.of(
                            estimateCode,
                            a,
                            project
                        );
                        String recipient = estimateMap.get(
                            ComparedEstimateHeader.RECIPIENT.getName());
                        if (!StringUtils.hasText(
                            estimateMap.get(
                                ComparedEstimateHeader.RECIPIENT.getName()))) {
                            recipient = "요청사 없음";
                        }

                        ProjectCustomEstimate comparedEstimate = ProjectCustomEstimate.of(
                            estimate,
                            ProjectEstimateType.COMPARISON,
                            Boolean.TRUE,
                            recipient,
                            business
                        );
                        em.persist(comparedEstimate);
                    } else {
                        ProjectEstimate estimate = ProjectEstimate.of(
                            estimateCode,
                            a,
                            project
                        );
                        String recipient = estimateMap.get(
                            ComparedEstimateHeader.RECIPIENT.getName());
                        if (!StringUtils.hasText(
                            estimateMap.get(
                                ComparedEstimateHeader.RECIPIENT.getName()))) {
                            recipient = "요청사 없음";
                        }

                        ProjectCustomEstimate comparedEstimate = ProjectCustomEstimate.of(
                            estimate,
                            ProjectEstimateType.COMPARISON,
                            Boolean.TRUE,
                            recipient,
                            null
                        );
                        em.persist(comparedEstimate);
                    }
                }
            );
    }

    private String getCode(Project project) {
        Long nextSeq = projectEstimateRepository.findNextSeq(project.getId());

        String estimateCode = "";
        estimateCode += "Q";
        estimateCode += project.getBasic().getCode();
        estimateCode += String.format("%02d", nextSeq);
        return estimateCode;
    }

}
