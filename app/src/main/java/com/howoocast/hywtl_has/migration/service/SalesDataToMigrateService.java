package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.repository.BusinessManagerRepository;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.migration.enums.SalesHeader;
import com.howoocast.hywtl_has.migration.loader.SalesExcelReader;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
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

    private final BusinessManagerRepository businessManagerRepository;

    @Transactional
    public void migrate() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<Map<String, String>> salesMapList = SalesExcelReader.excelReader();
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

                projectRepository.findByBasic_Code(finalCode).ifPresentOrElse(project -> {
                        // 기존 프로젝트가 있는 경우
                        setProjectBusiness(salesMap, project);
                        // 발주사, 건축, 구조설계 3개씩 있다.
                        setAnotherProjectBusiness(salesMap, project);
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
                    });
            });
        });
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
                            manager = b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "담당자")))
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
                        manager = b.getManagerList().stream().filter(m -> m.getName().equals(salesMap.get(type + i + "담당자")))
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
            }else {
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
        if (salesMap.get(SalesHeader.NAME.getName()).equals("안성승두1블럭")) {
            System.out.println("안성승두1블럭");
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

}
