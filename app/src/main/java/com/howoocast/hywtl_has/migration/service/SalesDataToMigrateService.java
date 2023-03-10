package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.repository.BusinessManagerRepository;
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
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexBuildingRepository;
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
    private final BusinessManagerRepository businessManagerRepository;
    private final ProjectComplexBuildingRepository projectComplexBuildingRepository;
    private static long lastTimeStamp = System.currentTimeMillis();

    @Transactional
    public void migrate() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<Map<String, String>> salesMapList = SalesExcelReader.excelReader();
            ContractBasic contractBasic = contractBasicRepository.findTop1By().orElse(ContractBasic.of());
            ContractCollection contractCollection = contractCollectionRepository.findTop1By()
                .orElse(ContractCollection.of());
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
//                    System.out.println("???????????? : ????????? " + finalCode);
                    continue;
                }

//                if (!StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_DATE.getName()))) {
//                    System.out.println("finalCode = " + finalCode);
//                    continue;
//                }

//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()))
//                    && (salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("P")
//                    || salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("Q"))) {
//                    // ??????????????? ???????????? ????????? continue ?????? ??????.
//                    System.out.println("???????????? : ?????? C, Q?????? ?????? " + finalCode);
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("???????????? : ?????? ?????? ????????? ?????? " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("???????????? : ?????? ?????? ????????? ?????? " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("???????????? : ????????? ?????? ????????? ?????? " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("???????????? : ????????? ?????? ????????? ?????? " + finalCode);
//                    }
//                }
//
//                if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()))) {
//                    if (!salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()).endsWith(".0")) {
//                        System.out.println("???????????? : ?????? ?????? ????????? ?????? " + finalCode);
//                    }
//                }

                projectRepository.findByBasic_Code(finalCode).ifPresentOrElse(project -> {
                        // ?????? ??????????????? ?????? ??????
                        setProjectBusiness(salesMapList.get(rowNum), project);
                        // ?????????, ??????, ???????????? 3?????? ??????.
                        setAnotherProjectBusiness(salesMapList.get(rowNum), project);
                        // lh ??????
                        setIsLh(salesMapList.get(rowNum), project);
                        // ?????? ??????
                        setProjectContractStatus(salesMapList.get(rowNum), project);
                        // ???????????? ????????? ????????????
                        updateCreatedProjectDate(salesMapList.get(rowNum), project);

                        // ????????? ?????? ?????? ????????? ?????? ??????.
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
                                rowNum
                            );
                        }
                        // ??????????????? ?????? ??????.
//                        System.out.println(System.currentTimeMillis() - lastTimeStamp);
                        lastTimeStamp = System.currentTimeMillis();

                        em.clear();
                    },
                    () -> {
                        // ???????????? ?????? ??????.
                        String projectName = "??????????????? ??????";
                        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.NAME.getName()))) {
                            projectName = salesMapList.get(rowNum).get(SalesHeader.NAME.getName());
                        }
                        //??????????????? ?????? ?????? ??????
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
                                rowNum
                            );
                        }
                        em.clear();
                    });
            }
        });

        List<BusinessManager> businessManagerList = businessManagerRepository.findAll();
        businessManagerList.forEach(businessManager -> {
            List<Project> projectList = projectBasicBusinessRepository.findByBusinessManager_Id(
                businessManager.getId()).stream().map(ProjectBasicBusiness::getProject).collect(Collectors.toList());
            businessManager.updateProjectCount(projectList);
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
        int rowNum
    ) {
        // E, C??? ?????? ?????? ????????? ??????????????? ??????.
        if (!StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()))
            || !(salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("C")
            || salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("E"))) {
            return;
        }
        // ????????? ?????? ??????
        String estimateCode = getEstimateCode(project);
        // ????????? ?????? ?????? ??????
        ProjectEstimatePlan plan = getProjectEstimatePlan(salesMapList, rowNum);

        // ?????? ?????? ????????? ??????
        // ????????? ?????? ?????? ?????? ??????.

        List<ProjectEstimateComplexSite> siteList = new ArrayList<>();
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()).equals("0")) {
            for (int i = 0; i < getAmount(salesMapList.get(rowNum), SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName());
                i++) {
                siteList.add(ProjectEstimateComplexSite.of(
                    "??????" + (i + 1),
                    Boolean.TRUE,
                    null,
                    null,
                    null
                ));
            }
        }

        // ??? ??????
        // ??????, ??????, ?????????, ?????? ?????? ????????? ????????? ????????? ??????

        List<Long> buildingCountList = new ArrayList<>();
        Map<String, Long> buildingInfo = new HashMap<>();
        // ??? ?????? ??????
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.WINDMILL_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("????????????", getAmount(salesMapList.get(rowNum), SalesHeader.WINDMILL_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.WINDMILL_AMOUNT.getName()));
        }

        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.AIR_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("???????????????", getAmount(salesMapList.get(rowNum), SalesHeader.AIR_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.AIR_AMOUNT.getName()));
        }

        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.INSPECTION_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("????????????", getAmount(salesMapList.get(rowNum), SalesHeader.INSPECTION_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.INSPECTION_AMOUNT.getName()));
        }

        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()))
            && !salesMapList.get(rowNum).get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()).equals("0")) {
            buildingInfo.put("????????????", getAmount(salesMapList.get(rowNum), SalesHeader.WIND_PRESSURE_AMOUNT.getName()));
            buildingCountList.add(getAmount(salesMapList.get(rowNum), SalesHeader.WIND_PRESSURE_AMOUNT.getName()));
        }

        if (buildingCountList.size() > 0) {
            List<ProjectComplexBuilding> projectComplexBuildingList = projectComplexBuildingRepository.findByProject_Id(
                project.getId());
            Long buildingSize = Collections.max(buildingCountList);
            List<ProjectEstimateComplexBuilding> complexBuildingList = new ArrayList<>();
            // ?????? ?????? ?????? ??? ????????? ???????????? ????????? ?????? ??? ?????? ???????????? ?????? ??? ????????? ????????????.
            if (!projectComplexBuildingList.isEmpty() && buildingSize == projectComplexBuildingList.size()) {
                projectComplexBuildingList.forEach(pcb -> {
                    ProjectEstimateComplexBuilding complexBuilding = ProjectEstimateComplexBuilding.of(
                        pcb.getName(),
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
                });
            } else {
                for (int i = 0; i < buildingSize; i++) {
                    ProjectEstimateComplexBuilding complexBuilding = ProjectEstimateComplexBuilding.of(
                        "??????" + (i + 1),
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
            }

            for (int k = 0; k < complexBuildingList.size(); k++) {
                List<TestType> testTypeList = new ArrayList<>();
                if (Objects.nonNull(buildingInfo.get("????????????"))) {
                    if (k < buildingInfo.get("????????????")) {
                        testTypeList.add(TestType.F);
                    }
                }
                if (Objects.nonNull(buildingInfo.get("???????????????"))) {
                    if (k < buildingInfo.get("???????????????")) {
                        testTypeList.add(TestType.A);
                    }
                }
                if (Objects.nonNull(buildingInfo.get("????????????"))) {
                    if (k < buildingInfo.get("????????????")) {
                        testTypeList.add(TestType.P);
                    }
                }
                complexBuildingList.get(k).updateTestTypeList(testTypeList);
            }
            // ?????????(??????) ??????
            ProjectEstimate estimate = ProjectEstimate.of(
                estimateCode,
                a,
                project,
                plan,
                siteList,
                complexBuildingList
            );

            // ?????????(??????) ??????
            ProjectSystemEstimate projectSystemEstimate = getProjectSystemEstimate(
                salesMapList,
                estimate,
                rowNum
            );

            if (!Objects.nonNull(projectSystemEstimate)) {
                return;
            }
            // Row ????????? C??? ?????? ???????????? ????????????.
            persistProjectContract(
                a,
                salesMapList.get(rowNum),
                project,
                contractBasic,
                contractCollection,
                projectSystemEstimate);
        } else {
            // ?????????(??????) ??????
            ProjectEstimate estimate = ProjectEstimate.of(
                estimateCode,
                a,
                project,
                plan,
                null,
                null
            );
            // ?????????(??????) ??????
            ProjectSystemEstimate projectSystemEstimate = getProjectSystemEstimate(
                salesMapList,
                estimate,
                rowNum
            );

            if (!Objects.nonNull(projectSystemEstimate)) {
                return;
            }

            // Row ????????? C??? ?????? ???????????? ????????????.
            persistProjectContract(
                a,
                salesMapList.get(rowNum),
                project,
                contractBasic,
                contractCollection,
                projectSystemEstimate);
        }
    }

    private void persistProjectContract(
        User a,
        Map<String, String> salesMap,
        Project project,
        ContractBasic contractBasic,
        ContractCollection contractCollection,
        ProjectSystemEstimate projectSystemEstimate
    ) {
        // ????????? C??? ??????
        // ???????????? ?????? ??????
        // ????????? ?????? ????????? ?????? ??????.
        if (StringUtils.hasText(salesMap.get(SalesHeader.CONFIRM.getName()))
            && salesMap.get(SalesHeader.CONFIRM.getName()).equals("C")
            && StringUtils.hasText(salesMap.get(SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName()))
        ) {

            // ?????? ????????? ?????? ??????
            projectSystemEstimate.changeConfirmed(Boolean.TRUE);

            em.persist(projectSystemEstimate);

            List<ProjectContractCollectionStage> stageList = new ArrayList<>();
            // ????????? ?????? -> ?????????
            if (StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_AMOUNT.getName()))
                && !salesMap.get(SalesHeader.ADVANCE_AMOUNT.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_RATE.getName()))
                && !salesMap.get(SalesHeader.ADVANCE_RATE.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_PAYMENT_TIME.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "?????????",
                        salesMap,
                        SalesHeader.ADVANCE_RATE.getName(),
                        SalesHeader.ADVANCE_AMOUNT.getName(),
                        SalesHeader.ADVANCE_PAYMENT_TIME.getName()
                    )
                );
            }

            // ?????????1
            if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_AMOUNT_1.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_AMOUNT_1.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_RATE_1.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_RATE_1.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_PAYMENT_TIME_1.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "?????????1",
                        salesMap,
                        SalesHeader.MIDDLE_RATE_1.getName(),
                        SalesHeader.MIDDLE_AMOUNT_1.getName(),
                        SalesHeader.MIDDLE_PAYMENT_TIME_1.getName()
                    )
                );
            }

            //?????????2
            if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_AMOUNT_2.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_AMOUNT_2.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_RATE_2.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_RATE_2.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_PAYMENT_TIME_2.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "?????????2",
                        salesMap,
                        SalesHeader.MIDDLE_RATE_2.getName(),
                        SalesHeader.MIDDLE_AMOUNT_2.getName(),
                        SalesHeader.MIDDLE_PAYMENT_TIME_2.getName()
                    )
                );
            }

            //?????????3
            if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_AMOUNT_3.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_AMOUNT_3.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_RATE_3.getName()))
                && !salesMap.get(SalesHeader.MIDDLE_RATE_3.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_PAYMENT_TIME_3.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "?????????3",
                        salesMap,
                        SalesHeader.MIDDLE_RATE_3.getName(),
                        SalesHeader.MIDDLE_AMOUNT_3.getName(),
                        SalesHeader.MIDDLE_PAYMENT_TIME_3.getName()
                    )
                );
            }

            //??????
            if (StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_AMOUNT.getName()))
                && !salesMap.get(SalesHeader.BALANCE_COLLECTION_AMOUNT.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_RATE.getName()))
                && !salesMap.get(SalesHeader.BALANCE_COLLECTION_RATE.getName()).equals("#REF!")
                && StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_TIME.getName()))) {
                stageList.add(
                    getContractCollectionStage(
                        "??????",
                        salesMap,
                        SalesHeader.BALANCE_COLLECTION_RATE.getName(),
                        SalesHeader.BALANCE_COLLECTION_AMOUNT.getName(),
                        SalesHeader.BALANCE_COLLECTION_TIME.getName()
                    )
                );
            }
            List<ContractCondition> contractConditionList = contractConditionRepository.findAll();
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
                "????????? ???????????? ??? ??????????????? ???????????? ??????",
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
                if (company.isPresent()) {
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
                    SalesHeader.ESTIMATE_COMPANY_NAME_1.getName()) : "????????? ?????????(?????? ??? ????????????)",
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
            // ?????? ????????? ???????????? ?????? ????????? ?????? ?????? ??????
            finalContract.changeConfirmed(Boolean.TRUE);
            em.persist(finalContract);
            em.flush();

            // ???????????? ?????? ????????? ??????
//            persistProjectCollection(salesMap, project, contractCollection, totalAmount);
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

        // ???????????? ?????? ??????
        ProjectCollection projectCollection = ProjectCollection.of(project);
        em.persist(projectCollection);

        List<ProjectCollectionStage> collectionStageList = new ArrayList<>();

        // ?????? ????????? ?????? ?????? contractCollection List ??????
        List<ProjectContractCollectionStage> stageList2 = new ArrayList<>();
        getStageList(salesMap, stageList2);
        /*
         * ????????? ???????????? ?????? ?????? ????????? -> ???????????? ??? ???????????? ?????? ?????? ??????????????? ????????? ???????????????
         * ?????? ???????????? ???????????? ???????????? ?????? ???????????? ???????????? ??????(???????????? ????????? ?????????????????? ??????)
         * */

        ProjectContractCollection projectContractCollectionData = ProjectContractCollection.of(
            "????????? ???????????? ??? ??????????????? ???????????? ??????",
            stageList2,
            contractCollection.getTotalAmountNote(),
            totalAmount
        );

        // ????????? ???????????? ?????? ?????? ????????? -> ???????????? ??? ???????????? ?????? ?????? ??????????????? ????????? ??????.
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
            if (projectCollectionStage.getName().equals("?????????")) {
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.ADVANCE_DEPOSIT_VAT_DATE,
                    SalesHeader.ADVANCE_DEPOSIT_VAT_AMOUNT,
                    projectCollectionStageStatusList,
                    SalesHeader.ADVANCE_DEPOSIT_DATE,
                    SalesHeader.ADVANCE_DEPOSIT_AMOUNT
                );
            } else if (projectCollectionStage.getName().equals("?????????1")) {
                //?????????1
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_DATE_1,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_AMOUNT_1,
                    projectCollectionStageStatusList,
                    SalesHeader.MIDDLE_DEPOSIT_DATE_1,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_1
                );
            } else if (projectCollectionStage.getName().equals("?????????2")) {
                //?????????2
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_DATE_2,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_AMOUNT_2,
                    projectCollectionStageStatusList,
                    SalesHeader.MIDDLE_DEPOSIT_DATE_2,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_2
                );
            } else if (projectCollectionStage.getName().equals("?????????3")) {
                //?????????3
                setProjectCollectionStatus(
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_DATE_3,
                    SalesHeader.MIDDLE_DEPOSIT_VAT_AMOUNT_3,
                    projectCollectionStageStatusList,
                    SalesHeader.MIDDLE_DEPOSIT_DATE_3,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_3
                );
            } else if (projectCollectionStage.getName().equals("??????")) {
                //??????
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
        // ????????? ?????? -> ?????????
        if (StringUtils.hasText(salesMap.get(SalesHeader.ADVANCE_DEPOSIT_AMOUNT.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "?????????",
                    salesMap,
                    SalesHeader.ADVANCE_DEPOSIT_AMOUNT.getName()
                )
            );
        }
        // ?????????1
        if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_DEPOSIT_AMOUNT_1.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "?????????1",
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_1.getName()
                )
            );
        }
        //?????????2
        if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_DEPOSIT_AMOUNT_2.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "?????????2",
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_2.getName()
                )
            );
        }
        //?????????3
        if (StringUtils.hasText(salesMap.get(SalesHeader.MIDDLE_DEPOSIT_AMOUNT_3.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "?????????3",
                    salesMap,
                    SalesHeader.MIDDLE_DEPOSIT_AMOUNT_3.getName()
                )
            );
        }
        //??????
        if (StringUtils.hasText(salesMap.get(SalesHeader.BALANCE_COLLECTION_DEPOSIT_AMOUNT.getName()))) {
            stageList2.add(
                getContractCollectionStage2(
                    "??????",
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

        double rate = Double.parseDouble(salesMap.get(rateKey)) * 100;

        Long vat = Long.parseLong(
            new BigDecimal(salesMap.get(SalesHeader.TOTAL_CONSTRUCTION_VAT.getName())).setScale(0, RoundingMode.HALF_UP)
                .toPlainString()
        );

        Long amountWithoutVat = (long) (amount - (vat * Double.parseDouble(salesMap.get(rateKey))));

        return ProjectContractCollectionStage.of(
            title,
            rate,
            amountWithoutVat,
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
            // ?????? ??????
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
            // ?????? ??????
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
            // ????????? ??????
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
            // ????????? ??????
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
            // ????????? ??????
            // ????????? ??????
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
            // ?????? ??????
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
            // ?????? ??????
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
                SalesHeader.ESTIMATE_COMPANY_NAME_1.getName()) : "????????? ?????????(?????? ??? ????????????)",
            projectEstimateTemplateList,
            null,
            new CustomFinder<>(businessRepository, Business.class).byId(1L) // ???????????? : ?????????????????????.
        );

        // ?????? ????????? ?????? ????????? ?????? ??????
        if (salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_ORDER.getName()).equals(
            salesMapList.get(rowNum + 1).get(SalesHeader.ESTIMATE_ORDER.getName()))
            && salesMapList.get(rowNum).get(SalesHeader.CODE.getName()).equals(
            salesMapList.get(rowNum + 1).get(SalesHeader.CODE.getName()))) {
            //??????????????? ?????? ??????
            if (salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("C")) {
                projectSystemEstimate.updateNote("???????????? ????????? ??????");
//                System.out.println(
//                    "?????? ????????? ????????? ?????? ????????? ?????? ????????? ?????? ??????." + salesMapList.get(rowNum).get(SalesHeader.CODE.getName()));
//                em.persist(projectSystemEstimate);
//                em.flush();
//                return projectSystemEstimate;
            }
//            return null;
        } else if (
            rowNum > 0
                &&
                salesMapList.get(rowNum).get(SalesHeader.ESTIMATE_ORDER.getName()).equals(
                    salesMapList.get(rowNum - 1).get(SalesHeader.ESTIMATE_ORDER.getName()))
                && salesMapList.get(rowNum).get(SalesHeader.CODE.getName()).equals(
                salesMapList.get(rowNum - 1).get(SalesHeader.CODE.getName()))
        ) {
            if (salesMapList.get(rowNum).get(SalesHeader.CONFIRM.getName()).equals("C")) {
                // ?????? ????????? ?????? ??????
                projectSystemEstimate.updateNote("???????????? ????????? ??????");
//                System.out.println(
//                    "?????? ????????? ????????? ?????? ????????? ?????? ????????? ?????? ??????." + salesMapList.get(rowNum).get(SalesHeader.CODE.getName()));
            }
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
            if (testDeadLine.contains("???")) {
                testDeadLine = testDeadLine.replace("???", "").trim();
            }
            expectedTestDeadLine = Integer.parseInt(
                new BigDecimal(testDeadLine).setScale(0, RoundingMode.HALF_UP)
                    .toPlainString());
        }
        Integer expectedFinalReportDeadline = null;
        if (StringUtils.hasText(salesMapList.get(rowNum).get(SalesHeader.FINAL_REPORT.getName()))) {
            String finalReport = salesMapList.get(rowNum).get(SalesHeader.FINAL_REPORT.getName());
            if (finalReport.contains("???")) {
                finalReport = finalReport.replace("???", "").trim();
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
        String month = String.format("%02d", Integer.parseInt(splitDate[1].split("???")[0]));
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
            // ???????????? ????????? ????????? ??????
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
            if (salesMap.get(SalesHeader.CONTRACT_STATUS.getName()).equals("??????")) {
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
        ArrayList<String> typeList = new ArrayList<>(List.of("?????????", "??????", "????????????"));
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

        // ?????? ????????? ???????????? ????????? ?????? ??????
        if (!StringUtils.hasText(salesMap.get(type + i + "?????????"))) {
            return;
        }
        businessRepository.findByName(salesMap.get(type + i + "?????????")).ifPresentOrElse(b -> {
            // ?????? ?????? ???????????? HAS ????????? ???????????? ?????? ??????
            BusinessManager manager = null;
            if (StringUtils.hasText(salesMap.get(type + i + "?????????"))) {
                // ???????????? ?????? ?????? ???????????? ????????? ??????
                if (StringUtils.hasText(salesMap.get(type + i + "?????????"))) {
                    // ???????????? ????????? ???????????? ????????? ??????
                    if (b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "?????????")))
                        .collect(
                            Collectors.toList()).isEmpty()) {
                        // ???????????? ?????? ?????? ????????? ????????? ????????? ?????? (????????? ????????? ????????? ?????? ????????? ?????? ???????????????...)
                        if (b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "?????????")))
                            .collect(
                                Collectors.toList()).isEmpty()) {
                            manager = BusinessManager.of(
                                salesMap.get(type + i + "?????????"),
                                salesMap.get(type + i + "?????????"),
                                salesMap.get(type + i + "??????"),
                                salesMap.get(type + i + "?????????"),
                                salesMap.get(type + i + "?????????")
                            );
                            b.addBusinessManager(manager);
                            em.persist(b);
                        } else {
                            manager = b.getManagerList().stream()
                                .filter(m -> m.getName().equals(salesMap.get(type + i + "?????????")))
                                .collect(
                                    Collectors.toList()).get(0);
                            manager.change(
                                salesMap.get(type + i + "??????"),
                                salesMap.get(type + i + "?????????"),
                                salesMap.get(type + i + "?????????"),
                                salesMap.get(type + i + "?????????")
                            );
                            em.persist(manager);
                        }
                    }
                } else {
                    //???????????? ?????? ??????
                    if (b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "?????????")))
                        .collect(
                            Collectors.toList()).isEmpty()) {
                        manager = BusinessManager.of(
                            salesMap.get(type + i + "?????????"),
                            salesMap.get(type + i + "?????????"),
                            salesMap.get(type + i + "??????"),
                            salesMap.get(type + i + "?????????"),
                            salesMap.get(type + i + "?????????")
                        );
                        b.addBusinessManager(manager);
                        em.persist(b);
                    } else {
                        manager = b.getManagerList().stream()
                            .filter(m -> m.getName().equals(salesMap.get(type + i + "?????????")))
                            .collect(
                                Collectors.toList()).get(0);
                        manager.change(
                            salesMap.get(type + i + "??????"),
                            salesMap.get(type + i + "?????????"),
                            salesMap.get(type + i + "?????????"),
                            salesMap.get(type + i + "?????????")
                        );
                        em.persist(manager);
                    }
                }
            }
            // ??? ???????????? ???????????? ???????????? ?????? ?????? ??????.
            List<ProjectBasicBusiness> projectBasicBusinessList;
            // ?????????????????? ???????????? ????????? ????????????.

            if (Objects.nonNull(manager)) {
                // ???????????? ?????? ??????.
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager(
                    salesMap.get(type + i + "?????????").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type),
                    manager);
            } else {
                // ???????????? ?????? ??????
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedType(
                    salesMap.get(type + i + "?????????").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type)
                );
            }

            // ????????? ????????? ?????? ??????.
            if (projectBasicBusinessRepository
                .findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager_Name(
                    salesMap.get(type + i + "?????????").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type),
                    salesMap.get(type + i + "?????????")
                ).isEmpty()) {

                if (!StringUtils.hasText(salesMap.get(type + i + "?????????"))) {
                    // ???????????? ?????? ??????
                    if (projectBasicBusinessRepository
                        .findByBusiness_NameAndProjectAndInvolvedType(
                            salesMap.get(type + i + "?????????").replaceAll(" ", ""),
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
                    // ???????????? ?????? ?????? projectBasicBusiness ??????
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
            // ?????? ?????? ???????????? HAS ????????????????????? ?????? ??????

            // ?????? ??????
            Business business = Business.of(
                salesMap.get(type + i + "?????????"),
                "000-00-00000",
                null,
                null,
                null
            );
            em.persist(business);

            // ???????????? ?????? ?????? ??????
            BusinessManager manager = null;
            if (StringUtils.hasText(salesMap.get(type + i + "?????????"))) {
                manager = BusinessManager.of(
                    salesMap.get(type + i + "?????????"),
                    salesMap.get(type + i + "?????????"),
                    salesMap.get(type + i + "??????"),
                    salesMap.get(type + i + "?????????"),
                    salesMap.get(type + i + "?????????")
                );
                business.addBusinessManager(manager);
                em.persist(business);
            }

            // ????????? ???????????? ????????? ?????? ??????
            List<ProjectBasicBusiness> projectBasicBusinessList;
            if (Objects.nonNull(manager)) {
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager(
                    salesMap.get(type + i + "?????????").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type),
                    manager
                );
            } else {
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedType(
                    salesMap.get(type + i + "?????????").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type)
                );
            }

            if (projectBasicBusinessList.isEmpty()) {
                // ???????????? ?????? ?????? ?????? ????????????.
                em.persist(ProjectBasicBusiness.of(
                    getProjectInvolvedType(type),
                    project,
                    business,
                    manager
                ));
            } else {
                // ???????????? ?????? ?????? ?????? ???????????? ???????????????.
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
        if ("?????????".equals(type)) {
            return ProjectInvolvedType.ORDERER;
        } else if ("??????".equals(type)) {
            return ProjectInvolvedType.ARCHITECTURAL;
        } else {
            return ProjectInvolvedType.STRUCTURAL;
        }
    }

    private void setProjectBusiness(Map<String, String> salesMap, Project project) {
        // ????????? ?????? ?????? ?????? ??????.
        if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_NAME.getName()))) {
            return;
        }

        businessRepository.findByName(salesMap.get(SalesHeader.COMPANY_NAME.getName()).replaceAll(" ", ""))
            .ifPresentOrElse(business -> {
                // ?????? ??????
                if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_TYPE.getName()))) {
                    return;
                }

                List<ProjectBasicBusiness> projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedType(
                    business.getName(), project, getType(salesMap));
                if (projectBasicBusinessList.isEmpty()) {
                    setProjectBasicBusiness(salesMap, project, business);
                }
            }, () -> {
                // ???????????? ?????? ??????
                if (StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_NAME.getName()))) {
                    Business business = Business.of(
                        salesMap.get(SalesHeader.COMPANY_NAME.getName()).replaceAll(" ", ""),
                        "000-00-00000",
                        null,
                        null,
                        null
                    );
                    em.persist(business);
                    // ?????? ??????
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
        // ????????????
        if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("?????????")) {
            return ProjectInvolvedType.ENFORCER;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).startsWith("??????")) {
            return ProjectInvolvedType.ARCHITECTURAL;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).startsWith("??????")) {
            return ProjectInvolvedType.STRUCTURAL;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("?????????")) {
            return ProjectInvolvedType.BUILDER;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            return ProjectInvolvedType.ETC;
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            return ProjectInvolvedType.ASSOCIATION;
        } else {
            throw new IllegalArgumentException("??????????????? ?????????????????????.");
        }
    }

    private void updateProjectBasicBusiness(Map<String, String> salesMap, Business business, ProjectBasicBusiness b) {
        if (!StringUtils.hasText(salesMap.get(SalesHeader.COMPANY_TYPE.getName()))) {
            return;
        }
        if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("?????????")) {
            b.update(
                ProjectInvolvedType.ENFORCER,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            b.update(
                ProjectInvolvedType.ARCHITECTURAL,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            b.update(
                ProjectInvolvedType.STRUCTURAL,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("?????????")) {
            b.update(
                ProjectInvolvedType.BUILDER,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            b.update(
                ProjectInvolvedType.ETC,
                business
            );
            em.persist(b);
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
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
        if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("?????????")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.ENFORCER,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.ARCHITECTURAL,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.STRUCTURAL,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("?????????")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.BUILDER,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.ETC,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("??????")) {
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
