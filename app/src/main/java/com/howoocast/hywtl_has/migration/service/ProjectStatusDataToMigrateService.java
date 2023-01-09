package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.migration.enums.ProjectStatusHeader;
import com.howoocast.hywtl_has.migration.loader.ProjectStatusExcelReader;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectBidStatus;
import com.howoocast.hywtl_has.project.domain.ProjectContractStatus;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateStatus;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.domain.ProjectStatus;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ProjectStatusDataToMigrateService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    @Transactional
    public void migrate() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<Map<String, String>> prjectStatusList = ProjectStatusExcelReader.excelReader();
            prjectStatusList.forEach(projectStatusMap -> {
                // 프로젝트 코드 .0 제거 및 코드-(번호) 형식있어서 수정
                String value = projectStatusMap.get(ProjectStatusHeader.CODE.getName());
                String code = value;
                if (value == null) {
                    return;
                }
                if (!value.contains("-")) {
                    code = value.substring(0, value.length() - 2);
                }

                Project project = Project.of(
                    code,
                    projectStatusMap.get(ProjectStatusHeader.NAME.getName()),
                    projectStatusMap.get(ProjectStatusHeader.NAME.getName()),
                    convertStringToBasicBidType(projectStatusMap.get(ProjectStatusHeader.BASIC_BID_TYPE.getName())),
                    a,
                    ProjectStatus.of(
                        convertStringToProgressStatus(
                            projectStatusMap.get(ProjectStatusHeader.PROGRESS_STATUS.getName())),
                        convertStringToEstimateExpectation(
                            projectStatusMap.get(ProjectStatusHeader.ESTIMATE_EXPECTATION.getName())),
                        convertStringToEstimateStatus(
                            projectStatusMap.get(ProjectStatusHeader.ESTIMATE_STATUS.getName())),
                        convertStringToContractStatus(
                            projectStatusMap.get(ProjectStatusHeader.CONTRACT_STATUS.getName())))
                );
                project.updateCreatedBy(a);
                em.persist(project);

                em.flush();
                em.clear();
            });
        });
    }

    private ProjectProgressStatus convertStringToProgressStatus(String value) {
        // 데이터 이름 안 맞는거 수정
        value = getString(value);
        String finalValue = value;
        return Arrays.stream(ProjectProgressStatus.values())
            .filter(progressStatus -> progressStatus.getName().replaceAll(" ", "").equals(
                finalValue.replaceAll(" ", "")))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("해당하는 기본입찰방식이 없습니다."));
    }

    private static String getString(String value) {
        if (value.equals("업무 착수전")) {
            value = "업무 개시 전";
        }
        return value;
    }

    private ProjectBasicBidType convertStringToBasicBidType(String value) {
        return Arrays.stream(ProjectBasicBidType.values())
            .filter(basicBidType -> basicBidType.getName().replaceAll(" ", "").equals(value.replaceAll(" ", "")))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("해당하는 기본입찰방식이 없습니다."));
    }

    private ProjectEstimateExpectation convertStringToEstimateExpectation(String value) {
        return Arrays.stream(ProjectEstimateExpectation.values())
            .filter(estimateExpectation -> estimateExpectation.getName().replaceAll(" ", "").equals(value.replaceAll(" ", "")))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("해당하는 견적분류가 없습니다."));
    }

    private ProjectEstimateStatus convertStringToEstimateStatus(String value) {
        // 입찰 상태인 경우 문제
        if (value.equals("대비입찰")) {
            value = "대비견적";
        }
        String finalValue = value;
        return Arrays.stream(ProjectEstimateStatus.values())
            .filter(estimateStatus -> estimateStatus.getName().replaceAll(" ", "").equals(
                finalValue.replaceAll(" ", "")))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("해당하는 견적상태가 없습니다."));
    }

    private ProjectContractStatus convertStringToContractStatus(String value) {
        return Arrays.stream(ProjectContractStatus.values())
            .filter(contractStatus -> contractStatus.getName().replaceAll(" ", "").equals(value.replaceAll(" ", "")))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("해당하는 계약상태가 없습니다."));
    }

    private ProjectBidStatus convertStringToBidStatus(String value) {
        return Arrays.stream(ProjectBidStatus.values())
            .filter(bidStatus -> bidStatus.getName().replaceAll(" ", "").equals(value.replaceAll(" ", "")))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("해당하는 입찰상태가 없습니다."));
    }

}
