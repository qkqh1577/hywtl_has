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
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCondition;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConditionParameter.Description;
import com.howoocast.hywtl_has.project_contract.repository.ProjectContractRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;
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


    private static long lastTimeStamp = System.currentTimeMillis();

    @Transactional
    public void migrate() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<Map<String, String>> salesMapList = SalesExcelReader.excelReader();
            List<EstimateTemplate> estimateTemplateList = estimateTemplateRepository.findAll();
            ContractBasic contractBasic = contractBasicRepository.findTop1By().orElse(ContractBasic.of());
            ContractCollection contractCollection = contractCollectionRepository.findTop1By()
                .orElse(ContractCollection.of());
            List<ContractCondition> contractConditionList = contractConditionRepository.findAll();

            salesMapList.forEach(salesMap -> {
                String value = salesMap.get(SalesHeader.CODE.getName());
                String code = value;
                if (value == null) {
                    return;
                }
                if (!value.contains("-")) {
                    code = value.substring(0, value.length() - 2);
                }

                String finalCode = code.trim();
                System.out.println("finalCode = " + finalCode);
                projectRepository.findByBasic_Code(finalCode).ifPresentOrElse(project -> {
                        // 기존 프로젝트가 있는 경우
                        setProjectBusiness(salesMap, project);
                        // 발주사, 건축, 구조설계 3개씩 있다.
                        setAnotherProjectBusiness(salesMap, project);
                        // lh 여부
                        setIsLh(salesMap, project);
                        // 계약 상태
                        setProjectContractStatus(salesMap, project);
                        // 프로젝트 생산일 업데이트
                        updateCreatedProjectDate(salesMap, project);
                        //견적서 생성
                        setProjectEstimate(
                            a,
                            salesMap,
                            project,
                            estimateTemplateList,
                            contractBasic,
                            contractCollection,
                            contractConditionList
                        );

                        // 타임스템프 찍는 방법.
                        System.out.println(System.currentTimeMillis() - lastTimeStamp);
                        lastTimeStamp = System.currentTimeMillis();

                        em.clear();
                    },
                    () -> {
                        // 프로젝트 없는 경우.
                        String projectName = "프로젝트명 없음";
                        if (StringUtils.hasText(salesMap.get(SalesHeader.NAME.getName()))) {
                            projectName = salesMap.get(SalesHeader.NAME.getName());
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
                        setProjectBusiness(salesMap, project);
                        setAnotherProjectBusiness(salesMap, project);
                        setIsLh(salesMap, project);
                        setProjectContractStatus(salesMap, project);
                        updateCreatedProjectDate(salesMap, project);
                        setProjectEstimate(
                            a,
                            salesMap,
                            project,
                            estimateTemplateList,
                            contractBasic,
                            contractCollection,
                            contractConditionList);
                    });
            });
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
        Map<String, String> salesMap,
        Project project,
        List<EstimateTemplate> estimateTemplateList,
        ContractBasic contractBasic,
        ContractCollection contractCollection,
        List<ContractCondition> contractConditionList
    ) {
        // 견적서 코드 생성
        String estimateCode = getEstimateCode(project);
        // 견적서 기본 정보 생성
        ProjectEstimatePlan plan = getProjectEstimatePlan(salesMap);

        // 견적서(부모) 생성
        ProjectEstimate estimate = ProjectEstimate.of(
            estimateCode,
            a,
            project,
            plan
        );
        // 견적서(자식) 생성
        ProjectSystemEstimate projectSystemEstimate = getProjectSystemEstimate(
            salesMap, estimateTemplateList, estimate);

        // Row 구분이 C인 경우 계약서가 존재한다.
        persistProjectContract(
            a,
            salesMap,
            project,
            contractBasic,
            contractCollection,
            contractConditionList,
            estimate,
            projectSystemEstimate);
    }

    private void persistProjectContract(
        User a,
        Map<String, String> salesMap,
        Project project,
        ContractBasic contractBasic,
        ContractCollection contractCollection,
        List<ContractCondition> contractConditionList,
        ProjectEstimate estimate,
        ProjectSystemEstimate projectSystemEstimate
    ) {
        // 구분이 C인 경우
        // 계약일이 있는 경우
        // 총기성 공급 가액이 있는 경우.
        if (StringUtils.hasText(salesMap.get(SalesHeader.CONFIRM.getName()))
            && salesMap.get(SalesHeader.CONFIRM.getName()).equals("C")
            && StringUtils.hasText(salesMap.get(SalesHeader.TOTAL_CONSTRUCTION_SUPPLY_AMOUNT.getName()))
            && StringUtils.hasText(salesMap.get(SalesHeader.CONTRACT_DATE.getName()))) {

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
                    RoundingMode.FLOOR).toPlainString());

            ProjectEstimate projectEstimate = em.find(ProjectEstimate.class, projectSystemEstimate.getId());
            ProjectContractCollection projectContractCollection = ProjectContractCollection.of(
                "다음의 기성단계 별 해당금액을 현금으로 지급",
                stageList,
                contractCollection.getTotalAmountNote(),
                totalAmount
            );
            ProjectContract finalContract = ProjectContract.of(
                project,
                projectEstimate,
                getContractCode(project),
                Boolean.TRUE,
                "요청사 불분명(확인 후 업데이트)",
                ProjectContractBasic.of(
                    project.getBasic().getName(),
                    contractBasic.getServiceDuration(),
                    contractBasic.getOutcome(),
                    contractBasic.getDescription(),
                    getDate(salesMap, SalesHeader.CONTRACT_DATE.getName()),
                    null,
                    null,
                    null,
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

            // 진행정보 수금 데이터 시작

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
            setProjectCollectionStageList(salesMap, projectCollection, collectionStageList, projectContractCollectionData);

            projectCollection.setStageList(collectionStageList);
            em.persist(projectCollection);
        }
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
            new BigDecimal(salesMap.get(amountKey)).setScale(0, RoundingMode.FLOOR)
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
        System.out.println("amountKey = " + amountKey);
        System.out.println("salesMap.get(amountKey) = " + salesMap.get(amountKey));
        Long amount = Long.parseLong(
            new BigDecimal(salesMap.get(amountKey)).setScale(0, RoundingMode.FLOOR)
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
            new BigDecimal(salesMap.get(amountKey)).setScale(0, RoundingMode.FLOOR)
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
        Map<String, String> salesMap,
        List<EstimateTemplate> estimateTemplateList,
        ProjectEstimate estimate) {
        List<ProjectEstimateTemplate> projectEstimateTemplateList = new ArrayList<>();

        estimateTemplateList.forEach(estimateTemplate -> {
            // 풍력 수량
            if (StringUtils.hasText(salesMap.get(SalesHeader.WINDMILL_AMOUNT.getName()))
                && StringUtils.hasText(salesMap.get(SalesHeader.WINDMILL_UNIT_PRICE.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMap,
                        estimateTemplate,
                        SalesHeader.WINDMILL_AMOUNT.getName(),
                        SalesHeader.WINDMILL_UNIT_PRICE.getName()
                    )
                );
            }
            // 풍압 수량
            if (StringUtils.hasText(salesMap.get(SalesHeader.WIND_PRESSURE_AMOUNT.getName()))
                && StringUtils.hasText(salesMap.get(SalesHeader.WIND_PRESSURE_UNIT_PRICE.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMap,
                        estimateTemplate,
                        SalesHeader.WIND_PRESSURE_AMOUNT.getName(),
                        SalesHeader.WIND_PRESSURE_UNIT_PRICE.getName()
                    )
                );
            }
            // 풍환경 수량
            if (StringUtils.hasText(salesMap.get(SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName()))
                && StringUtils.hasText(salesMap.get(SalesHeader.WIND_ENVIRONMENT_UNIT_PRICE.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMap,
                        estimateTemplate,
                        SalesHeader.WIND_ENVIRONMENT_AMOUNT.getName(),
                        SalesHeader.WIND_ENVIRONMENT_UNIT_PRICE.getName()
                    )
                );
            }
            // 공기력 수량
            if (StringUtils.hasText(salesMap.get(SalesHeader.AIR_AMOUNT.getName()))
                && StringUtils.hasText(salesMap.get(SalesHeader.AIR_UNIT_PRICE.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMap,
                        estimateTemplate,
                        SalesHeader.AIR_AMOUNT.getName(),
                        SalesHeader.AIR_UNIT_PRICE.getName()
                    )
                );
            }
            // 빌딩풍 수량
            if (StringUtils.hasText(salesMap.get(SalesHeader.BUILDING_AMOUNT.getName()))
                && StringUtils.hasText(salesMap.get(SalesHeader.BUILDING_UNIT_PRICE.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMap,
                        estimateTemplate,
                        SalesHeader.BUILDING_AMOUNT.getName(),
                        SalesHeader.BUILDING_UNIT_PRICE.getName()
                    )
                );
            }
            // 구검 수량
            if (StringUtils.hasText(salesMap.get(SalesHeader.INSPECTION_AMOUNT.getName()))
                && StringUtils.hasText(salesMap.get(SalesHeader.INSPECTION_UNIT_PRICE.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMap,
                        estimateTemplate,
                        SalesHeader.INSPECTION_AMOUNT.getName(),
                        SalesHeader.INSPECTION_UNIT_PRICE.getName()
                    )
                );
            }
            // 공동 단가
            if (StringUtils.hasText(salesMap.get(SalesHeader.COMMON_UNIT_PRICE.getName()))) {
                projectEstimateTemplateList.add(
                    getProjectEstimateTemplate(
                        salesMap,
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
            "요청사 불분명(확인 후 업데이트)",
            projectEstimateTemplateList,
            null,
            new CustomFinder<>(businessRepository, Business.class).byId(1L) // 견적업체 : 한양풍동연구소.
        );
        em.persist(projectSystemEstimate);
        return projectSystemEstimate;
    }

    @NotNull
    private ProjectEstimatePlan getProjectEstimatePlan(Map<String, String> salesMap) {
        LocalDate estimateDate = null;
        if (StringUtils.hasText(salesMap.get(SalesHeader.ESTIMATE_DATE.getName()))) {
            estimateDate = getDate(salesMap, SalesHeader.ESTIMATE_DATE.getName());
        }
        Integer expectedTestDeadLine = null;
        if (StringUtils.hasText(salesMap.get(SalesHeader.DESIGN_WIND_LOAD.getName()))) {
            String testDeadLine = salesMap.get(SalesHeader.DESIGN_WIND_LOAD.getName());
            if (testDeadLine.contains("주")) {
                testDeadLine = testDeadLine.replace("주", "").trim();
            }
            expectedTestDeadLine = Integer.parseInt(
                new BigDecimal(testDeadLine).setScale(0, RoundingMode.FLOOR)
                    .toPlainString());
        }
        Integer expectedFinalReportDeadline = null;
        if (StringUtils.hasText(salesMap.get(SalesHeader.FINAL_REPORT.getName()))) {
            String finalReport = salesMap.get(SalesHeader.FINAL_REPORT.getName());
            if (finalReport.contains("주")) {
                finalReport = finalReport.replace("주", "").trim();
            }
            expectedFinalReportDeadline = Integer.parseInt(
                new BigDecimal(finalReport).setScale(
                    0,
                    RoundingMode.FLOOR).toPlainString()
            );
        }
        Long testAmount = null;
        if (StringUtils.hasText(salesMap.get(SalesHeader.TOTAL_AMOUNT_OF_HANYANG.getName()))) {
            testAmount = Long.parseLong(
                new BigDecimal(salesMap.get(SalesHeader.TOTAL_AMOUNT_OF_HANYANG.getName())).setScale(0,
                    RoundingMode.FLOOR).toPlainString());
        }
        Long reviewAmount = null;
        if (StringUtils.hasText(salesMap.get(SalesHeader.INSPECTION_PRICE.getName()))) {
            reviewAmount = Long.parseLong(
                new BigDecimal(salesMap.get(SalesHeader.INSPECTION_PRICE.getName())).setScale(0,
                    RoundingMode.FLOOR).toPlainString());
        }
        Long totalAmount = null;
        if (StringUtils.hasText(salesMap.get(SalesHeader.TOTAL_AMOUNT.getName()))) {
            totalAmount = Long.parseLong(
                new BigDecimal(salesMap.get(SalesHeader.TOTAL_AMOUNT.getName())).setScale(0,
                    RoundingMode.FLOOR).toPlainString()
            );
        }

        return ProjectEstimatePlan.of(
            estimateDate,
            expectedTestDeadLine,
            expectedFinalReportDeadline,
            testAmount,
            reviewAmount,
            totalAmount
        );
    }

    private static LocalDate getDate(Map<String, String> salesMap, String type) {
        System.out.println("code : " + salesMap.get(SalesHeader.CODE.getName()));
        System.out.println("type = " + type);
        System.out.println("salesMap.get(type) = " + salesMap.get(type));
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
            if (estimateTemplate.getTestType().equals(getProjectEstimateTemplateTestType(typeCountKey))) {
                Long count = null;
                // 공동수량 없어서 추가된 코드
                if (typeCountKey.equals("1")) {
                    count = Long.parseLong("1");
                } else {
                    count = Long.parseLong(
                        new BigDecimal(salesMap.get(typeCountKey)).setScale(0, RoundingMode.FLOOR)
                            .toPlainString()
                    );
                }
                Long price = Long.parseLong(
                    new BigDecimal(salesMap.get(unitPriceKey)).setScale(0, RoundingMode.FLOOR)
                        .toPlainString()
                );
                projectEstimateTemplateDetailList.add(ProjectEstimateTemplateDetail.of(
                    titleList,
                    estimateTemplateDetail.getUnit().getName(),
                    count,
                    price,
                    count * price,
                    estimateTemplateDetail.getInUse(),
                    estimateTemplateDetail.getNote()
                ));
            }
            ;
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
                projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager(
                    salesMap.get(type + i + "업체명").replaceAll(" ", ""),
                    project,
                    getProjectInvolvedType(type),
                    manager);
            } else {
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
                // 담당자가 없는 경우 projectBasicBusiness 추가
                em.persist(ProjectBasicBusiness.of(
                    getProjectInvolvedType(type),
                    project,
                    b,
                    manager
                ));
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
                    business
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
                // 관계사에 이미 존재하는 데이터인지 확인 후, 없는 경우 추가.
                List<ProjectBasicBusiness> projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProject(
                    salesMap.get(SalesHeader.COMPANY_NAME.getName()).replaceAll(" ", ""), project);
                if (!projectBasicBusinessList.isEmpty()) {
                    projectBasicBusinessList.forEach(pbb -> {
                        updateProjectBasicBusiness(salesMap, business, pbb);
                    });
                } else {
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
                    List<ProjectBasicBusiness> projectBasicBusinessList = projectBasicBusinessRepository.findByBusiness_NameAndProject(
                        salesMap.get(SalesHeader.COMPANY_NAME.getName()).replaceAll(" ", ""), project);
                    if (!projectBasicBusinessList.isEmpty()) {
                        projectBasicBusinessList.forEach(pbb -> {
                            updateProjectBasicBusiness(salesMap, business, pbb);
                        });
                    } else {
                        setProjectBasicBusiness(salesMap, project, business);
                    }
                }
            });
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
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("건설사")) {
            b.update(
                ProjectInvolvedType.BUILDER,
                business
            );
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("기타")) {
            b.update(
                ProjectInvolvedType.RECOMMENDER,
                business
            );
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("조합")) {
            b.update(
                ProjectInvolvedType.RECOMMENDER,
                business
            );
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
                ProjectInvolvedType.RECOMMENDER,
                project,
                business
            ));
        } else if (salesMap.get(SalesHeader.COMPANY_TYPE.getName()).equals("조합")) {
            em.persist(ProjectBasicBusiness.of(
                ProjectInvolvedType.RECOMMENDER,
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
