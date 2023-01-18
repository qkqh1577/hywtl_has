package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.contract_basic.domain.ContractBasic;
import com.howoocast.hywtl_has.contract_basic.repository.ContractBasicRepository;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollection;
import com.howoocast.hywtl_has.contract_collection.repository.ContractCollectionRepository;
import com.howoocast.hywtl_has.contract_condition.domain.ContractCondition;
import com.howoocast.hywtl_has.contract_condition.repository.ContractConditionRepository;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.estimate_template.repository.EstimateTemplateRepository;
import com.howoocast.hywtl_has.migration.enums.SalesHeader;
import com.howoocast.hywtl_has.migration.loader.SalesExcelReader;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectContractStatus;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatus;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatusType;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageVersion;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCondition;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConditionParameter.Description;
import com.howoocast.hywtl_has.project_contract.repository.ProjectContractRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexBuilding;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexSite;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimatePlan;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplateDetail;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateTemplateDetailParameter.Title;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class SalesDataToMigrateService {

    @PersistenceContext
    private EntityManager em;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final BusinessRepository businessRepository;
    private final ProjectBasicBusinessRepository projectBasicBusinessRepository;
    private final ProjectEstimateRepository projectEstimateRepository;
    private final EstimateTemplateRepository estimateTemplateRepository;
    private final ProjectContractRepository projectContractRepository;
    private final ContractBasicRepository contractBasicRepository;
    private final ContractCollectionRepository contractCollectionRepository;
    private final ContractConditionRepository contractConditionRepository;
    private final ProjectCollectionRepository projectCollectionRepository;

    private static long lastTimeStamp = System.currentTimeMillis();

    @Transactional
    public void migrate() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<Map<String, String>> salesMapList = SalesExcelReader.excelReader();
            ContractBasic contractBasic = contractBasicRepository.findTop1By().orElse(ContractBasic.of());
            ContractCollection contractCollection = contractCollectionRepository.findTop1By()
                .orElse(ContractCollection.of());
            List<ContractCondition> contractConditionList = contractConditionRepository.findAll();
            for (int i = 0; i < salesMapList.size(); i++) {
                int rowNum = i;
                String value = salesMapList.get(rowNum).get(SalesHeader.CODE.getName());
                String code = value;
                if (value == null) {
                    return;
                }
                if (!value.contains("-")) {
                    code = value.substring(0, value.length() - 2);
                }

                String finalCode = code.trim();
                System.out.println("finalCode = " + finalCode);

                if (
                    (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.TOTAL_AMOUNT.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.TOTAL_AMOUNT.getName()).startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.COMMON_UNIT_PRICE.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.COMMON_UNIT_PRICE.getName()).startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WINDMILL_UNIT_PRICE.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.WINDMILL_UNIT_PRICE.getName()).startsWith("-"))
                        || (StringUtils.hasText(
                        salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_UNIT_PRICE.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_UNIT_PRICE.getName()).startsWith("-"))
                        || (StringUtils.hasText(
                        salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_UNIT_PRICE.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_UNIT_PRICE.getName())
                        .startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.AIR_UNIT_PRICE.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.AIR_UNIT_PRICE.getName()).startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.BUILDING_UNIT_PRICE.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.BUILDING_UNIT_PRICE.getName()).startsWith("-"))
                        || (
                        StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.INSPECTION_UNIT_PRICE.getName()))
                            && salesMapList.get(rowNum).get(SalesHeader.INSPECTION_UNIT_PRICE.getName())
                            .startsWith("-"))
                        || (
                        StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.TOTAL_AMOUNT_OF_HANYANG.getName()))
                            && salesMapList.get(rowNum).get(SalesHeader.TOTAL_AMOUNT_OF_HANYANG.getName())
                            .startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.ADVANCE_AMOUNT.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.ADVANCE_AMOUNT.getName()).startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.MIDDLE_AMOUNT_1.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.MIDDLE_AMOUNT_1.getName()).startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.MIDDLE_AMOUNT_2.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.MIDDLE_AMOUNT_2.getName()).startsWith("-"))
                        || (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.MIDDLE_AMOUNT_3.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.MIDDLE_AMOUNT_3.getName()).startsWith("-"))
                        || (StringUtils.hasText(
                        salesMapList.get(rowNum).get(SalesHeader.BALANCE_COLLECTION_AMOUNT.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.BALANCE_COLLECTION_AMOUNT.getName())
                        .startsWith("-"))
                        || (StringUtils.hasText(
                        salesMapList.get(rowNum).get(SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName()))
                        && salesMapList.get(rowNum).get(SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName())
                        .startsWith("-"))
                        || (
                        StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.TOTAL_CONSTRUCTION_SUM.getName()))
                            && salesMapList.get(rowNum).get(SalesHeader.TOTAL_CONSTRUCTION_SUM.getName())
                            .startsWith("-"))
                ) {
//                    System.out.println("제외원인 : 음수값 " + finalCode);
                    continue;
                }

//                if (!StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_DATE.getName()))) {
//                    System.out.println("finalCode = " + finalCode);
//                    continue;
//                }

//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()))
//                    && (salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("P")
//                    || salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("Q"))) {
//                    // 프로젝트는 구성하기 위해서 continue 처리 안함.
//                    System.out.println("제외원인 : 구분 C, Q아닌 경우 " + finalCode);
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("제외원인 : 풍력 수량 소수점 처리 " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("제외원인 : 풍압 수량 소수점 처리 " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("제외원인 : 풍환경 수량 소수점 처리 " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("제외원인 : 공기력 수량 소수점 처리 " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("제외원인 : 구검 수량 소수점 처리 " + finalCode);
//                    }
//                }

                projectRepository.findByBasic_Code(finalCode).ifPresentOrElse(project -> {
                        // 기존 프로젝트가 있는 경우
                        setProjectBusiness(salesMapList.get(rowNum), project);
                        // 발주사, 건축, 구조설계 3개씩 있다.
                        setAnotherProjectBusiness(salesMapList.get(rowNum), project);
                        // lh 여부
                        setIsLh(salesMapList.get(rowNum), project);
                        // 계약 상태
                        setProjectContractStatus(salesMapList.get(rowNum), project);
                        // 프로젝트 생산일 업데이트
                        updateCreatedProjectDate(salesMapList.get(rowNum), project);

                        // 구분이 없는 경우 견적서 생성 안함.
                        if (!StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()))) {
                            return;
                        }

                        if ((salesMapList.size() - 1) > rowNum
                            && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()))
                            && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CODE.getName()))
                            && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_ORDER.getName()))) {
                            setProjectEstimate(
                                a,
                                salesMapList,
                                project,
                                contractBasic,
                                contractCollection,
                                contractConditionList,
                                rowNum
                            );
                        }
                        // 타임스템프 찍는 방법.
//                        System.out.println(System.currentTimeMillis() - lastTimeStamp);
                        lastTimeStamp = System.currentTimeMillis();

                        em.clear();
                    },
                    () -> {
                        // 프로젝트 없는 경우.
                        String projectName = "프로젝트명 없음";
                        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.NAME.getName()))) {
                            projectName = salesMapList.get(rowNum).get(SalesHeader.NAME.getName());
                        }
                        //프로젝트가 없는 경우 생성
                        Project project = Project.of(
                            finalCode,
                            projectName,
                            ProjectBasicBidType.DEFAULT,
                            a,
                            ProjectProgressStatus.UNDER_CONTRACT
                        );
                        em.persist(project);

                        setProjectBusiness(salesMapList.get(rowNum), project);
                        setAnotherProjectBusiness(salesMapList.get(rowNum), project);
                        setIsLh(salesMapList.get(rowNum), project);
                        setProjectContractStatus(salesMapList.get(rowNum), project);
                        updateCreatedProjectDate(salesMapList.get(rowNum), project);
                        if ((salesMapList.size() - 1) > rowNum
                            && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()))
                            && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CODE.getName()))
                            && StringUtils.hasText(
                            salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_ORDER.getName()))) {
                            setProjectEstimate(
                                a,
                                salesMapList,
                                project,
                                contractBasic,
                                contractCollection,
                                contractConditionList,
                                rowNum
                            );
                        }
                        em.clear();
                    });
            }
        });
    }

    private void updateCreatedProjectDate(Map<String, String> salesMap, Project project) {
        if (StringUtils.hasText(salesMap.get(SalesHeader.PROJECT_CREATED_DATE.getName()))) {
            project.updateCreatedAt(getDate(salesMap, SalesHeader.PROJECT_CREATED_DATE.getName()));
            em.persist(project);
        }
    }

    private void setProjectEstimate(
        User a,
        List<Map<String, String>> salesMapList,
        Project project,
        ContractBasic contractBasic,
        ContractCollection contractCollection,
        List<ContractCondition> contractConditionList,
        int rowNum
    ) {
        // E, C가 아닌 다른 구분은 데이터에서 제외.
        if (!StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()))
            || !(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("C")
            || salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("E"))) {
            return;
        }
        // 견적서 코드 생성
        String estimateCode = getEstimateCode(project);
        // 견적서 기본 정보 생성
        ProjectEstimatePlan plan = getProjectEstimatePlan(salesMapList, rowNum);

        // 대지 모형 리스트 생성
        // 풍환경 수량 개수 만큼 생성.

        List<ProjectEstimateComplexSite> siteList = new ArrayList<>();
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()).equals("0")) {
            for (int i = 0; i < getAmount(salesMapList.get(rowNum), SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName());
                i++) {
                siteList.add(ProjectEstimateComplexSite.of(
                    "임의" + (i + 1),
                    Boolean.TRUE,
                    null,
                    null,
                    null
                ));
            }
        }

        // 동 생성
        // 풍력, 풍압, 공기력, 구검 수량 개수가 얼마나 많은지 파악

        List<Long> buildingCountList = new ArrayList<>();
        Map<String, Long> buildingInfo = new HashMap<>();
        // 동 개수 찾기
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("풍력수량", getAmount(salesMapList.get(rowNum), SalesHeader.WINDMILL_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.WINDMILL_AMOUNT.getName()));
        }

        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("공기력수량", getAmount(salesMapList.get(rowNum), SalesHeader.AIR_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.AIR_AMOUNT.getName()));
        }

        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("구검수량", getAmount(salesMapList.get(rowNum), SalesHeader.INSPECTION_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.INSPECTION_AMOUNT.getName()));
        }

        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("풍압수량", getAmount(salesMapList.get(rowNum), SalesHeader.WIND_PRESSURE_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.WIND_PRESSURE_AMOUNT.getName()));
        }

        if (buildingCountList.size() > 0) {
            Long buildingSize = Collections.max(buildingCountList);
            List<ProjectEstimateComplexBuilding> complexBuildingList = new ArrayList<>();
            for (int i = 0; i < buildingSize; i++) {
                ProjectEstimateComplexBuilding complexBuilding = ProjectEstimateComplexBuilding.of(
                    "임의" + (i + 1),
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                );
                em.persist(complexBuilding);
                em.flush();
                complexBuildingList.add(
                    complexBuilding
                );
            }

            for (int k = 0; k < complexBuildingList.size(); k++) {
                List<TestType> testTypeList = new ArrayList<>();
                if (Objects.nonNull(buildingInfo.get("풍력수량"))) {
                    if (k < buildingInfo.get("풍력수량")) {
                        testTypeList.add(TestType.F);
                    }
                }
                if (Objects.nonNull(buildingInfo.get("공기력수량"))) {
                    if (k < buildingInfo.get("공기력수량")) {
                        testTypeList.add(TestType.A);
                    }
                }
                if (Objects.nonNull(buildingInfo.get("풍압수량"))) {
                    if (k < buildingInfo.get("풍압수량")) {
                        testTypeList.add(TestType.P);
                    }
                }
                complexBuildingList.get(k).updateTestTypeList(testTypeList);
            }
            // 견적서(부모) 생성
            ProjectEstimate estimate = ProjectEstimate.of(
                estimateCode,
                a,
                project,
                plan,
                siteList,
                complexBuildingList
            );

            // 견적서(자식) 생성
            ProjectSystemEstimate projectSystemEstimate = getProjectSystemEstimate(
                salesMapList,
                estimate,
                rowNum
            );

            if (!Objects.nonNull(projectSystemEstimate)) {
                return;
            }
            // Row 구분이 C인 경우 계약서가 존재한다.
            persistProjectContract(
                a,
                salesMapList.get(rowNum),
                project,
                contractBasic,
                contractCollection,
                contractConditionList,
                projectSystemEstimate);
        } else {
            // 견적서(부모) 생성
            ProjectEstimate estimate = ProjectEstimate.of(
                estimateCode,
                a,
                project,
                plan,
                null,
                null
            );
            // 견적서(자식) 생성
            ProjectSystemEstimate projectSystemEstimate = getProjectSystemEstimate(
                salesMapList,
                estimate,
                rowNum
            );

            if (!Objects.nonNull(projectSystemEstimate)) {
                return;
            }

            // Row 구분이 C인 경우 계약서가 존재한다.
            persistProjectContract(
                a,
                salesMapList.get(rowNum),
                project,
                contractBasic,
                contractCollection,
                contractConditionList,
                projectSystemEstimate);
        }
    }

    private void persistProjectContract(
        User a,
        Map<String, String> salesMap,
        Project project,
        ContractBasic contractBasic,
        ContractCollection contractCollection,
        List<ContractCondition> contractConditionList,
        ProjectSystemEstimate projectSystemEstimate
    ) {
        // 구분이 C인 경우
        // 계약일이 있는 경우
        // 총기성 공급 가액이 있는 경우.
        if (StringUtils.hasText(salesMap.get(SalesHeader.CONFIRM.getName()))
            && salesMap.get(SalesHeader.CONFIRM.getName()).equals("C")
            && StringUtils.hasText(salesMap.get(SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName()))
        ) {

            // 해당 견적서 최종 승인
            projectSystemEstimate.changeConfirmed(Boolean.TRUE);

            em.persist(projectSystemEstimate);

            List<ProjectContractCollectionStage> stageList = new ArrayList<>();
            // 선급금 금액 -> 계약금
            if (StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_AMOUNT.getName()))
                && !salesMap.get(SalesHeader.ADVANCE_AMOUNT.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_RATE.getName()))
                && !salesMap.get(SalesHeader.ADVANCE_RATE.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_PAYMENT_TIME.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "계약금",
                        salesMap,
                        SalesHeader.ADVANCE_RATE.getName(),
                        SalesHeader.ADVANCE_AMOUNT.getName(),
                        SalesHeader.ADVANCE_PAYMENT_TIME.getName()
                    )
                );
            }

            // 중도금1
            if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_AMOUNT_1.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_AMOUNT_1.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_RATE_1.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_RATE_1.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_PAYMENT_TIME_1.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "중도금1",
                        salesMap,
                        SalesHeader.MIDDLE_RATE_1.getName(),
                        SalesHeader.MIDDLE_AMOUNT_1.getName(),
                        SalesHeader.MIDDLE_PAYMENT_TIME_1.getName()
                    )
                );
            }

            //중도금2
            if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_AMOUNT_2.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_AMOUNT_2.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_RATE_2.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_RATE_2.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_PAYMENT_TIME_2.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "중도금2",
                        salesMap,
                        SalesHeader.MIDDLE_RATE_2.getName(),
                        SalesHeader.MIDDLE_AMOUNT_2.getName(),
                        SalesHeader.MIDDLE_PAYMENT_TIME_2.getName()
                    )
                );
            }

            //중도금3
            if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_AMOUNT_3.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_AMOUNT_3.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_RATE_3.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_RATE_3.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_PAYMENT_TIME_3.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "중도금3",
                        salesMap,
                        SalesHeader.MIDDLE_RATE_3.getName(),
                        SalesHeader.MIDDLE_AMOUNT_3.getName(),
                        SalesHeader.MIDDLE_PAYMENT_TIME_3.getName()
                    )
                );
            }

            //잔금
            if (StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_AMOUNT.getName()))
                && !salesMap.get(SalesHeader.BALANCE_COLLECTION_AMOUNT.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_RATE.getName()))
                && !salesMap.get(SalesHeader.BALANCE_COLLECTION_RATE.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_TIME.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "잔금",
                        salesMap,
                        SalesHeader.BALANCE_COLLECTION_RATE.getName(),
                        SalesHeader.BALANCE_COLLECTION_AMOUNT.getName(),
                        SalesHeader.BALANCE_COLLECTION_TIME.getName()
                    )
                );
            }

            List<ProjectContractCondition> projectContractConditionList = contractConditionList.stream()
                .map(condition -> {
                    return ProjectContractCondition.of(
                        condition.getTitle(),
                        condition.getDescriptionList().stream().map(Description::of).collect(Collectors.toList())
                    );
                }).collect(Collectors.toList());

            Long totalAmount = Long.parseLong(
                new BigDecimal(salesMap.get(SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName())).setScale(0,
                    RoundingMode.HALF_UP).toPlainString());

            ProjectEstimate projectEstimate = em.find(ProjectEstimate.class, projectSystemEstimate.getId());
            ProjectContractCollection projectContractCollection = ProjectContractCollection.of(
                "다음의 기성단계 별 해당금액을 현금으로 지급",
                stageList,
                contractCollection.getTotalAmountNote(),
                totalAmount
            );

            LocalDate finalDate = getDate(salesMap, SalesHeader.ORDER_DATE.getName());
            if (StringUtils.hasText(salesMap.get(SalesHeader.CONTRACT_DATE.getName()))) {
                finalDate = getDate(salesMap, SalesHeader.CONTRACT_DATE.getName());
            }
            String ordererCompanyName = null;
            String ordererCompanyAddress = null;
            String ordererCeoName = null;
            if (StringUtils.hasText(salesMap.get(SalesHeader.ORDER_COMPANY_NAME_1.getName()))) {
                ordererCompanyName = salesMap.get(SalesHeader.ORDER_COMPANY_NAME_1.getName());
                Optional<Business> company = businessRepository.findByName(ordererCompanyName);
                if(company.isPresent()){
                    ordererCompanyAddress = company.get().getAddress();
                    ordererCeoName = company.get().getCeoName();
                }
            }


            ProjectContract finalContract = ProjectContract.of(
                project,
                projectEstimate,
                getContractCode(project),
                Boolean.TRUE,
                StringUtils.hasText(salesMap.get(SalesHeader.ESTIMATE_COMPANY_NAME_1.getName())) ? salesMap.get(
                    SalesHeader.ESTIMATE_COMPANY_NAME_1.getName()) : "요청사 불분명(확인 후 업데이트)",
                ProjectContractBasic.of(
                    project.getBasic().getName(),
                    contractBasic.getServiceDuration(),
                    contractBasic.getOutcome(),
                    contractBasic.getDescription(),
                    finalDate,
                    ordererCompanyAddress,
                    ordererCompanyName,
                    ordererCeoName,
                    contractBasic.getContractor().getAddress(),
                    contractBasic.getContractor().getCompanyName(),
                    contractBasic.getContractor().getCeoName()
                ),
                projectContractCollection,
                projectContractConditionList,
                a
            );

            em.persist(finalContract);
            em.flush();
            // 최종 계약될 데이터가 너무 많아서 일단 승인 보류
            finalContract.changeConfirmed(Boolean.TRUE);
            em.persist(finalContract);
            em.flush();

            // 진행정보 수금 데이터 시작
            persistProjectCollection(salesMap, project, contractCollection, totalAmount);
        } else {
//            System.out.println("salesMap.get(SalesHeader.CODE.getName()) = " + salesMap.get(SalesHeader.CODE.getName()));
        }
    }

    private void persistProjectCollection(Map<String, String> salesMap, Project project,
        ContractCollection contractCollection,
        Long totalAmount) {
        Optional<ProjectCollection> projectCollectionExisted = projectCollectionRepository.findByProject_Id(
            project.getId());
        if (projectCollectionExisted.isPresent()) {
            return;
        }

        // 진행정보 수금 생성
        ProjectCollection projectCollection = ProjectCollection.of(project);
        em.persist(projectCollection);

        List<ProjectCollectionStage> collectionStageList = new ArrayList<>();

        // 수금 단계에 맞는 가짜 contractCollection List 생성
        List<ProjectContractCollectionStage> stageList2 = new ArrayList<>();
        getStageList(salesMap, stageList2);
        /*
         * 계약서 기반으로 수금 단계 만들고 -> 엑셀에서 더 데이터가 있는 경우 수금단계를 만들고 추가하지만
         * 엑셀 데이터상 비교하기 힘들어서 가짜 데이터를 만들어서 처리(필요없는 데이터 하드코딩으로 넣음)
         * */

        ProjectContractCollection projectContractCollectionData = ProjectContractCollection.of(
            "다음의 기성단계 별 해당금액을 현금으로 지급",
            stageList2,
            contractCollection.getTotalAmountNote(),
            totalAmount
        );

        // 계약서 기반으로 수금 단계 만들고 -> 엑셀에서 더 데이터가 있는 경우 수금단계를 만들고 추가.
        setProjectCollectionStageList(salesMap, projectCollection, collectionStageList,
            projectContractCollectionData);

        projectCollection.setStageList(collectionStageList);
        em.persist(projectCollection);
    }

    private void setProjectCollectionStageList(Map<String, String> salesMap, ProjectCollection projectCollection,
        List<ProjectCollectionStage> collectionStageList, ProjectContractCollection projectContractCollectionData) {
        for (int index = 0; index < projectContractCollectionData.getStageList().size(); index++) {
            ProjectCollectionStage projectCollectionStage = ProjectCollectionStage.of(
                projectCollection,
                projectContractCollectionData.getStageList().get(index).getName(),
                projectContractCollectionData.getStageList().get(index).getAmount(),
                projectContractCollectionData.getStageList().get(index).getExpectedDate(),
                projectContractCollectionData.getStageList().get(index).getNote(),
                index + 1
            );
            em.persist(projectCollectionStage);
            em.flush();

            ProjectCollectionStageVersion projectCollectionStageVersion = ProjectCollectionStageVersion.of(
                projectCollectionStage.getName(),
                projectCollectionStage.getAmount(),
                null,
                projectCollectionStage.getNote(),
                null
            );
            projectCollectionStage.updateVersionList(projectCollectionStageVersion);

            List<ProjectCollectionStageStatus> projectCollectionStageStatusList = new ArrayList<>();
            if (projectCollectionStage.getName().equals("계약금")) {
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.ADVANCE_DEPOSIT_VAT_DATE,
                    SalesHeader.ADVANCE_DEPOSIT_VAT_AMOUNT,
                    projectCollectionStageStatusList,
                    SalesHeader.ADVANCE_DEPOSIT_DATE,
                    SalesHeader.ADVANCE_DEPOSIT_AMOUNT
                );
            } else if (projectCollectionStage.getName().equals("중도금1")) {
                //중도금1
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_DATE_1,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_AMOUNT_1,
                    projectCollectionStageStatusList,
                    SalesHeader.MIDDLE_DEPOSIT_DATE_1,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_1
                );
            } else if (projectCollectionStage.getName().equals("중도금2")) {
                //중도금2
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_DATE_2,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_AMOUNT_2,
                    projectCollectionStageStatusList,
                    SalesHeader.MIDDLE_DEPOSIT_DATE_2,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_2
                );
            } else if (projectCollectionStage.getName().equals("중도금3")) {
                //중도금3
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_DATE_3,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_AMOUNT_3,
                    projectCollectionStageStatusList,
                    SalesHeader.MIDDLE_DEPOSIT_DATE_3,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_3
                );
            } else if (projectCollectionStage.getName().equals("잔금")) {
                //잔금
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.BALANCE_COLLECTION_VAT_DATE,
                    SalesHeader.BALANCE_COLLECTION_VAT_AMOUNT,
                    projectCollectionStageStatusList,
                    SalesHeader.BALANCE_COLLECTION_DEPOSIT_DATE,
                    SalesHeader.BALANCE_COLLECTION_DEPOSIT_AMOUNT
                );
            }

            projectCollectionStage.updateCollectionStageStatusList(projectCollectionStageStatusList);
            em.persist(projectCollectionStage);
            em.flush();

            collectionStageList.add(
                projectCollectionStage
            );
        }
    }

    private void getStageList(Map<String, String> salesMap, List<ProjectContractCollectionStage> stageList2) {
        // 선급금 금액 -> 계약금
        if (StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_DEPOSIT_AMOUNT.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "계약금",
                    salesMap,
                    SalesHeader.ADVANCE_DEPOSIT_AMOUNT.getName()
                )
            );
        }
        // 중도금1
        if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_DEPOSIT_AMOUNT_1.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "중도금1",
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_1.getName()
                )
            );
        }
        //중도금2
        if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_DEPOSIT_AMOUNT_2.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "중도금2",
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_2.getName()
                )
            );
        }
        //중도금3
        if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_DEPOSIT_AMOUNT_3.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "중도금3",
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_3.getName()
                )
            );
        }
        //잔금
        if (StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_DEPOSIT_AMOUNT.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "잔금",
                    salesMap,
                    SalesHeader.BALANCE_COLLECTION_DEPOSIT_AMOUNT.getName()
                )
            );
        }
    }

    private void setProjectCollectionStatus(
        Map<String, String> salesMap,
        SalesHeader requestDate,
        SalesHeader expectedAmount,
        List<ProjectCollectionStageStatus> projectCollectionStageStatusList,
        SalesHeader requestAmountDate,
        SalesHeader amount
    ) {
        if (StringUtils.hasText(salesMap.get(requestDate.getName()))
            && StringUtils.hasText(salesMap.get(expectedAmount.getName()))) {
            projectCollectionStageStatusList.add(
                ProjectCollectionStageStatus.of(
                    ProjectCollectionStageStatusType.ASKED,
                    getDate(salesMap, requestDate.getName()),
                    getAmount(salesMap, expectedAmount.getName()),
                    null,
                    null,
                    null
                )
            );
        }
        if (StringUtils.hasText(salesMap.get(requestAmountDate.getName()))
            && StringUtils.hasText(salesMap.get(amount.getName()))) {
            projectCollectionStageStatusList.add(
                ProjectCollectionStageStatus.of(
                    ProjectCollectionStageStatusType.COLLECTED,
                    getDate(salesMap, requestAmountDate.getName()),
                    getAmount(salesMap, amount.getName()),
                    null,
                    null,
                    null
                )
            );
        }
    }

    private Long getAmount(Map<String, String> salesMap, String amountKey) {
        return Long.parseLong(
            new BigDecimal(salesMap.get(amountKey)).setScale(0, RoundingMode.HALF_UP)
                .toPlainString());
    }

    @NotNull
    private ProjectContractCollectionStage getContractCollectionStage(
        String title,
        Map<String, String> salesMap,
        String rateKey,
        String amountKey,
        String timeKey
    ) {
        Long amount = Long.parseLong(
            new BigDecimal(salesMap.get(amountKey)).setScale(0, RoundingMode.HALF_UP)
                .toPlainString()
        );

        return ProjectContractCollectionStage.of(
            title,
            Double.parseDouble(salesMap.get(rateKey)) * 100,
            amount,
            salesMap.get(timeKey),
            null
        );
    }

    @NotNull
    private ProjectContractCollectionStage getContractCollectionStage2(
        String title,
        Map<String, String> salesMap,
        String amountKey
    ) {
        Long amount = Long.parseLong(
            new BigDecimal(salesMap.get(amountKey)).setScale(0, RoundingMode.HALF_UP)
                .toPlainString()
        );

        return ProjectContractCollectionStage.of(
            title,
            10.0,
            amount,
            "-",
            null
        );
    }

    @NotNull
    private ProjectSystemEstimate getProjectSystemEstimate(
        List<Map<String, String>> salesMapList,
        ProjectEstimate estimate,
        int rowNum) {
        List<EstimateTemplate> estimateTemplateList = estimateTemplateRepository.findAll();
        List<ProjectEstimateTemplate> projectEstimateTemplateList = new ArrayList<>();
        estimateTemplateList.forEach(estimateTemplate -> {
            // 풍력 수량
            if (estimateTemplate.getTestType()
                .equals(getProjectEstimateTemplateTestType(SalesHeader.WINDMILL_AMOUNT.getName()))
                && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMapList.get(rowNum),
                        estimateTemplate,
                        SalesHeader.WINDMILL_AMOUNT.getName(),
                        SalesHeader.WINDMILL_UNIT_PRICE.getName()
                    )
                );
            }
            // 풍압 수량
            if (estimateTemplate.getTestType()
                .equals(getProjectEstimateTemplateTestType(SalesHeader.WIND_PRESSURE_AMOUNT.getName()))
                && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMapList.get(rowNum),
                        estimateTemplate,
                        SalesHeader.WIND_PRESSURE_AMOUNT.getName(),
                        SalesHeader.WIND_PRESSURE_UNIT_PRICE.getName()
                    )
                );
            }
            // 풍환경 수량
            if (estimateTemplate.getTestType()
                .equals(getProjectEstimateTemplateTestType(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()))
                && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMapList.get(rowNum),
                        estimateTemplate,
                        SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName(),
                        SalesHeader.WIND_ENVIRONMENT_UNIT_PRICE.getName()
                    )
                );
            }
            // 공기력 수량
            if (estimateTemplate.getTestType()
                .equals(getProjectEstimateTemplateTestType(SalesHeader.AIR_AMOUNT.getName()))
                && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMapList.get(rowNum),
                        estimateTemplate,
                        SalesHeader.AIR_AMOUNT.getName(),
                        SalesHeader.AIR_UNIT_PRICE.getName()
                    )
                );
            }
            // 빌딩풍 제외
            // 빌딩풍 수량
//            if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.BUILDING_AMOUNT.getName()))
//                && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.BUILDING_UNIT_PRICE.getName()))) {
//                projectEstimateTemplateList.add(
//                    getProjectEstimateTemplate(
//                        salesMapList.get(rowNum),
//                        estimateTemplate,
//                        SalesHeader.BUILDING_AMOUNT.getName(),
//                        SalesHeader.BUILDING_UNIT_PRICE.getName()
//                    )
//                );
//            }
            // 구검 수량
            if (estimateTemplate.getTestType()
                .equals(getProjectEstimateTemplateTestType(SalesHeader.INSPECTION_AMOUNT.getName()))
                && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMapList.get(rowNum),
                        estimateTemplate,
                        SalesHeader.INSPECTION_AMOUNT.getName(),
                        SalesHeader.INSPECTION_UNIT_PRICE.getName()
                    )
                );
            }
            // 공동 단가
            if (estimateTemplate.getTestType()
                .equals(getProjectEstimateTemplateTestType(SalesHeader.COMMON_UNIT_PRICE.getName()))
                && StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.COMMON_UNIT_PRICE.getName()))
                && !salesMapList.get(rowNum).get(SalesHeader.COMMON_UNIT_PRICE.getName()).equals("0.0")) {

                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMapList.get(rowNum),
                        estimateTemplate,
                        "1",
                        SalesHeader.COMMON_UNIT_PRICE.getName()
                    )
                );
            }
        });

        ProjectSystemEstimate projectSystemEstimate = ProjectSystemEstimate.of(
            estimate,
            Boolean.TRUE,
            StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_COMPANY_NAME_1.getName()))
                ? salesMapList.get(rowNum).get(
                SalesHeader.ESTIMATE_COMPANY_NAME_1.getName()) : "요청사 불분명(확인 후 업데이트)",
            projectEstimateTemplateList,
            null,
            new CustomFinder<>(businessRepository, Business.class).byId(1L) // 견적업체 : 한양풍동연구소.
        );

        if (salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_ORDER.getName()).equals(
            salesMapList.get(rowNum + 1).get(SalesHeader.ESTIMATE_ORDER.getName()))
            && salesMapList.get(rowNum).get(SalesHeader.CODE.getName()).equals(
            salesMapList.get(rowNum + 1).get(SalesHeader.CODE.getName()))) {
            if (salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("C")) {
                em.persist(projectSystemEstimate);
                em.flush();
                return projectSystemEstimate;
            }
            return null;
        }
        em.persist(projectSystemEstimate);
        em.flush();
        return projectSystemEstimate;
    }

    @NotNull
    private ProjectEstimatePlan getProjectEstimatePlan(List<Map<String, String>> salesMapList, int rowNum) {
        LocalDate estimateDate = null;
        if (
            rowNum > 1
                &&
                salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_ORDER.getName()).equals(
                    salesMapList.get(rowNum - 1).get(SalesHeader.ESTIMATE_ORDER.getName()))
                && salesMapList.get(rowNum).get(SalesHeader.CODE.getName()).equals(
                salesMapList.get(rowNum - 1).get(SalesHeader.CODE.getName()))) {
            if (salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("C")) {
                if (StringUtils.hasText(salesMapList.get(rowNum - 1).get(SalesHeader.ESTIMATE_DATE.getName()))) {
                    estimateDate = getDate(salesMapList.get(rowNum - 1), SalesHeader.ESTIMATE_DATE.getName());
                }
            }
        } else {
            if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_DATE.getName()))) {
                estimateDate = getDate(salesMapList.get(rowNum), SalesHeader.ESTIMATE_DATE.getName());
            }
        }
        Integer expectedTestDeadLine = null;
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.DESIGN_WIND_LOAD.getName()))) {
            String testDeadLine = salesMapList.get(rowNum).get(SalesHeader.DESIGN_WIND_LOAD.getName());
            if (testDeadLine.contains("주")) {
                testDeadLine = testDeadLine.replace("주", "").trim();
            }
            expectedTestDeadLine = Integer.parseInt(
                new BigDecimal(testDeadLine).setScale(0, RoundingMode.HALF_UP)
                    .toPlainString());
        }
        Integer expectedFinalReportDeadline = null;
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.FINAL_REPORT.getName()))) {
            String finalReport = salesMapList.get(rowNum).get(SalesHeader.FINAL_REPORT.getName());
            if (finalReport.contains("주")) {
                finalReport = finalReport.replace("주", "").trim();
            }
            expectedFinalReportDeadline = Integer.parseInt(
                new BigDecimal(finalReport).setScale(
                    0,
                    RoundingMode.HALF_UP).toPlainString()
            );
        }
        Boolean isLh = Boolean.FALSE;
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.LH.getName()))) {
            if (salesMapList.get(rowNum).get(SalesHeader.LH.getName()).equals("Y")) {
                isLh = Boolean.TRUE;
            }
        }
        Long testAmount = null;
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.TOTAL_AMOUNT_OF_HANYANG.getName()))) {
            testAmount = getAmount(salesMapList.get(rowNum), SalesHeader.TOTAL_AMOUNT_OF_HANYANG.getName());
        }
        Long reviewAmount = null;
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.INSPECTION_PRICE.getName()))) {
            reviewAmount = getAmount(salesMapList.get(rowNum), SalesHeader.INSPECTION_PRICE.getName());
        }
        Long totalAmount = null;
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName()))) {
            totalAmount = getAmount(salesMapList.get(rowNum), SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName());
        }

        return ProjectEstimatePlan.of(
            estimateDate,
            expectedTestDeadLine,
            expectedFinalReportDeadline,
            testAmount,
            reviewAmount,
            totalAmount,
            isLh,
            Boolean.TRUE
        );
    }

    private static LocalDate getDate(Map<String, String> salesMap, String type) {
        String[] splitDate = salesMap.get(type).split("-");
        String year = splitDate[2];
        String month = String.format("%02d", Integer.parseInt(splitDate[1].split("월")[0]));
        String day = splitDate[0];
        return LocalDate.parse(String.format("%s-%s-%s", year, month, day));
    }

    private ProjectEstimateTemplate getProjectEstimateTemplate(
        Map<String, String> salesMap,
        EstimateTemplate estimateTemplate,
        String typeCountKey,
        String unitPriceKey
    ) {
        List<ProjectEstimateTemplateDetail> projectEstimateTemplateDetailList = new ArrayList<>();

        estimateTemplate.getDetailList().forEach(estimateTemplateDetail -> {
            List<Title> titleList = estimateTemplateDetail.getTitleList().stream().map(
                Title::of).collect(Collectors.toList());
            Long count = null;
            // 공동수량 없어서 추가된 코드
            if (typeCountKey.startsWith("1")) {
                count = Long.parseLong("1");
            } else {
                count = Long.parseLong(
                    new BigDecimal(salesMap.get(typeCountKey)).setScale(0, RoundingMode.HALF_UP)
                        .toPlainString()
                );
            }
            long price = 0L;
            if (StringUtils.hasText(salesMap.get(unitPriceKey))) {
                price = Long.parseLong(
                    new BigDecimal(salesMap.get(unitPriceKey)).setScale(0, RoundingMode.HALF_UP)
                        .toPlainString()
                );
            }

            projectEstimateTemplateDetailList.add(ProjectEstimateTemplateDetail.of(
                titleList,
                estimateTemplateDetail.getUnit().name(),
                count,
                price,
                count * price,
                estimateTemplateDetail.getInUse(),
                estimateTemplateDetail.getNote()
            ));
        });

        return ProjectEstimateTemplate.of(
            estimateTemplate.getTitle(),
            estimateTemplate.getTestType(),
            projectEstimateTemplateDetailList
        );
    }

    @NotNull
    private static TestType getProjectEstimateTemplateTestType(String typeCountKey) {
        if (typeCountKey.equals(SalesHeader.WINDMILL_AMOUNT.getName())) {
            return TestType.F;
        } else if (typeCountKey.equals(SalesHeader.WIND_PRESSURE_AMOUNT.getName())) {
            return TestType.P;
        } else if (typeCountKey.equals(SalesHeader.AIR_AMOUNT.getName())) {
            return TestType.A;
        } else if (typeCountKey.equals(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName())) {
            return TestType.E;
        } else if (typeCountKey.equals(SalesHeader.BUILDING_AMOUNT.getName())) {
            return TestType.B;
        } else if (typeCountKey.equals(SalesHeader.INSPECTION_AMOUNT.getName())) {
            return TestType.REVIEW;
        } else {
            return TestType.COMMON;
        }
    }

    private void setProjectContractStatus(Map<String, String> salesMap, Project project) {
        if (StringUtils.hasText(salesMap.get(SalesHeader.CONTRACT_STATUS.getName()))) {
            if (salesMap.get(SalesHeader.CONTRACT_STATUS.getName()).equals("계약")) {
                project.getStatus().updateContractStatus(ProjectContractStatus.COMPLETE);
                em.persist(project);
            }
        }
    }

    private void setIsLh(Map<String, String> salesMap, Project project) {
        if (StringUtils.hasText(salesMap.get(SalesHeader.LH.getName()))) {
            if (salesMap.get(SalesHeader.LH.getName()).equals("Y")) {
                project.getBasic().updateIsLh(Boolean.TRUE);
                em.persist(project);
            }
        } else {
            project.getBasic().updateIsLh(Boolean.FALSE);
            em.persist(project);
        }
    }

    private void setAnotherProjectBusiness(Map<String, String> salesMap, Project project) {
        ArrayList<String> typeList = new ArrayList<>(List.of("발주사", "건축", "구조설계"));
        for (int i = 1; i <= 3; i++) {
            for (String type : typeList) {
                setVariousTypesProjectBasicBusiness(type, salesMap, i, project);
            }
        }
    }

    private void setVariousTypesProjectBasicBusiness(
        String type,
        Map<String, String> salesMap,
        int i,
        Project project) {

        // 엑셀 파일에 업체명이 있는지 여부 파악
        if (!StringUtils.hasText(salesMap.get(type + i + "업체명"))) {
            return;
        }
        businessRepository.findByName(salesMap.get(type + i + "업체명")).ifPresentOrElse(b -> {
            // 엑셀 파일 업체명이 HAS 데이터 베이스에 있는 경우
            BusinessManager manager = null;
            if (StringUtils.hasText(salesMap.get(type + i + "담당자"))) {
                // 연락처가 있는 경우 연락처로 담당자 식별
                if (StringUtils.hasText(salesMap.get(type + i + "연락처"))) {
                    // 연락처로 업체에 담당자가 있는지 확인
                    if (b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "연락처")))
                        .collect(
                            Collectors.toList()).isEmpty()) {
                        // 연락처가 없는 경우 이름이 동일한 경우로 식별 (동일한 업체에 이름이 같은 경우는 거의 없을거라봄...)
                        if (b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "담당자")))
                            .collect(
                                Collectors.toList()).isEmpty()) {
                            manager = BusinessManager.of(
                                salesMap.get(type + i + "담당자"),
                                salesMap.get(type + i + "부서명"),
                                salesMap.get(type + i + "직급"),
                                salesMap.get(type + i + "연락처"),
                                salesMap.get(type + i + "이메일")
                            );
                            b.addBusinessManager(manager);
                            em.persist(b);
                        } else {
                            manager = b.getManagerList().stream()
                                .filter(m -> m.getName().equals(salesMap.get(type + i + "담당자")))
                                .collect(
                                    Collectors.toList()).get(0);
                            manager.change(
                                salesMap.get(type + i + "직급"),
                                salesMap.get(type + i + "부서명"),
                                salesMap.get(type + i + "연락처"),
                                salesMap.get(type + i + "이메일")
                            );
                            em.persist(manager);
                        }
                    }
                } else {
                    //연락처가 없는 경우
                    if (b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "담당자")))
                        .collect(
                            Collectors.toList()).isEmpty()) {
                        manager = BusinessManager.of(
                            salesMap.get(type + i + "담당자"),
                            salesMap.get(type + i + "부서명"),
                            salesMap.get(type + i + "직급"),
                            salesMap.get(type + i + "연락처"),
                            salesMap.get(type + i + "이메일")
                        );
                        b.addBusinessManager(manager);
                        em.persist(b);
                    } else {
                        manager = b.getManagerList().stream()
                            .filter(m -> m.getName().equals(salesMap.get(type + i + "담당자")))
                            .collect(
                                Collectors.toList()).get(0);
                        manager.change(
                            salesMap.get(type + i + "직급"),
                            salesMap.get(type + i + "부서명"),
                            salesMap.get(type + i + "연락처"),
                            salesMap.get(type + i + "이메일")
                        );
                        em.persist(manager);
                    }
                }
            }
            // 위 로직까지 업체관리 담당자가 없는 경우 추가.
            List<ProjectBasicBusiness> projectBasicBusinessList;
            // 업체관리에서 담당자를 찾아서 넣어준다.

            if (Objects.nonNull(manager)) {
                // 담당자가 있는 경우.
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager(
                    salesMap.get(type + i + "업체명").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type),
                    manager);
            } else {
                // 담당자가 없는 경우
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedType(
                    salesMap.get(type + i + "업체명").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type)
                );
            }

            // 관계사 있는지 먼저 확인.
            if (projectBasicBusinessRepository
                .findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager_Name(
                    salesMap.get(type + i + "업체명").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type),
                    salesMap.get(type + i + "담당자")
                ).isEmpty()) {

                if (!StringUtils.hasText(salesMap.get(type + i + "담당자"))) {
                    // 담당자가 없는 경우
                    if (projectBasicBusinessRepository
                        .findByBusiness_NameAndProjectAndInvolvedType(
                            salesMap.get(type + i + "업체명").replaceAll(" ", ""),
                            project,
                            getProjectInvolvedType(type)
                        ).isEmpty()) {
                        em.persist(ProjectBasicBusiness.of(
                            getProjectInvolvedType(type),
                            project,
                            b
                        ));
                    }
                } else {
                    // 담당자가 없는 경우 projectBasicBusiness 추가
                    em.persist(ProjectBasicBusiness.of(
                        getProjectInvolvedType(type),
                        project,
                        b,
                        manager
                    ));
                }
            } else {
                projectBasicBusinessList.forEach(pbb -> {
                    pbb.update(
                        getProjectInvolvedType(type),
                        b
                    );
                });
            }
        }, () -> {
            // 엑셀 파일 업체명이 HAS 데이터베이스에 없는 경우

            // 업체 생성
            Business business = Business.of(
                salesMap.get(type + i + "업체명"),
                "000-00-00000",
                null,
                null,
                null
            );
            em.persist(business);

            // 담당자가 있는 경우 생성
            BusinessManager manager = null;
            if (StringUtils.hasText(salesMap.get(type + i + "담당자"))) {
                manager = BusinessManager.of(
                    salesMap.get(type + i + "담당자"),
                    salesMap.get(type + i + "부서명"),
                    salesMap.get(type + i + "직급"),
                    salesMap.get(type + i + "연락처"),
                    salesMap.get(type + i + "이메일")
                );
                business.addBusinessManager(manager);
                em.persist(business);
            }

            // 관계사 데이터에 있는지 여부 파악
            List<ProjectBasicBusiness> projectBasicBusinessList;
            if (Objects.nonNull(manager)) {
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager(
                    salesMap.get(type + i + "업체명").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type),
                    manager
                );
            } else {
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedType(
                    salesMap.get(type + i + "업체명").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type)
                );
            }

            if (projectBasicBusinessList.isEmpty()) {
                // 관계사에 없을 경우 새로 생성한다.
                em.persist(ProjectBasicBusiness.of(
                    getProjectInvolvedType(type),
                    project,
                    business,
                    manager
                ));
            } else {
                // 관계사에 있을 경우 기존 데이터에 덮어씌운다.
                projectBasicBusinessList.forEach(pbb -> {
                    pbb.update(
                        getProjectInvolvedType(type),
                        business
                    );
                });
            }
        });
    }

    private ProjectInvolvedType getProjectInvolvedType(String type) {
        if ("발주사".equals(type)) {
            return ProjectInvolvedType.ORDERER;
        } else if ("건축".equals(type)) {
            return ProjectInvolvedType.ARCHITECTURAL;
        } else {
            return ProjectInvolvedType.STRUCTURAL;
        }
    }

    private void setProjectBusiness(Map<String, String> salesMap, Project project) {
        // 관계사 명이 없는 경우 생략.
        if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_NAME.getName()))) {
            return;
        }

        businessRepository.findByName(salesMap.get(SalesHeader.COMPANY_NAME.getName()).replaceAll(" ", ""))
            .ifPresentOrElse(business -> {
                // 업체 구분
                if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_TYPE.getName()))) {
                    return;
                }

                List<ProjectBasicBusiness> projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedType(
                    business.getName(), project, getType(salesMap));
                if (projectBasicBusinessList.isEmpty()) {
                    setProjectBasicBusiness(salesMap, project, business);
                }
            }, () -> {
                // 업체명이 없는 경우
                if (StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_NAME.getName()))) {
                    Business business = Business.of(
                        salesMap.get(SalesHeader.COMPANY_NAME.getName()).replaceAll(" ", ""),
                        "000-00-00000",
                        null,
                        null,
                        null
                    );
                    em.persist(business);
                    // 업체 구분
                    if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_TYPE.getName()))) {
                        return;
                    }

                    List<ProjectBasicBusiness> projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedType(
                        business.getName(), project, getType(salesMap));
                    if (projectBasicBusinessList.isEmpty()) {
                        setProjectBasicBusiness(salesMap, project, business);
                    }

                }
            });
    }


    private ProjectInvolvedType getType(Map<String, String> salesMap) {
        // 업체구분
        if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("시행사")) {
            return ProjectInvolvedType.ENFORCER;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).startsWith("건축")) {
            return ProjectInvolvedType.ARCHITECTURAL;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).startsWith("구조")) {
            return ProjectInvolvedType.STRUCTURAL;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("건설사")) {
            return ProjectInvolvedType.BUILDER;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("기타")) {
            return ProjectInvolvedType.ETC;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("조합")) {
            return ProjectInvolvedType.ASSOCIATION;
        } else {
            throw new IllegalArgumentException("업체구분이 잘못되었습니다.");
        }
    }

    private void updateProjectBasicBusiness(Map<String, String> salesMap, Business business, ProjectBasicBusiness b) {
        if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_TYPE.getName()))) {
            return;
        }
        if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("시행사")) {
            b.update(
                ProjectInvolvedType.ENFORCER,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("건축")) {
            b.update(
                ProjectInvolvedType.ARCHITECTURAL,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("구조")) {
            b.update(
                ProjectInvolvedType.STRUCTURAL,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("건설사")) {
            b.update(
                ProjectInvolvedType.BUILDER,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("기타")) {
            b.update(
                ProjectInvolvedType.ETC,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("조합")) {
            b.update(
                ProjectInvolvedType.ASSOCIATION,
                business
            );
            em.persist(b);
        }
    }

    private void setProjectBasicBusiness(Map<String, String> salesMap, Project project, Business business) {
        if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_TYPE.getName()))) {
            return;
        }
        if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("시행사")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.ENFORCER,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("건축")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.ARCHITECTURAL,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("구조")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.STRUCTURAL,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("건설사")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.BUILDER,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("기타")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.ETC,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("조합")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.ASSOCIATION,
                project,
                business
            ));
        }
    }

    private String getEstimateCode(Project project) {
        Long nextSeq = projectEstimateRepository.findNextSeq(project.getId());

        String estimateCode = "";
        estimateCode += "Q";
        estimateCode += project.getBasic().getCode();
        estimateCode += String.format("%02d", nextSeq);
        return estimateCode;
    }

    private String getContractCode(Project project) {
        Long nextSeq = projectContractRepository.findNextSeq(project.getId());

        String code = "";
        code += "C";
        code += project.getBasic().getCode();
        code += String.format("%02d", nextSeq);

        return code;
    }
}
