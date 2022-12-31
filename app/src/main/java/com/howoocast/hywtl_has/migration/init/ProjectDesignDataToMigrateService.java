package com.howoocast.hywtl_has.migration.init;

import com.howoocast.hywtl_has.migration.enums.ProjectDesignHeader;
import com.howoocast.hywtl_has.migration.loader.ProjectDesignExcelReader;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
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
public class ProjectDesignDataToMigrateService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public void migrate() {
        List<Map<String, String>> projectDesignList = ProjectDesignExcelReader.excelReader();
        projectDesignList.forEach(projectDesignMap -> {
            String value = projectDesignMap.get(ProjectDesignHeader.CODE.getName());
            String code = value;
            if (value == null) {
                return;
            }
            if (!value.contains("-")) {
                code = value.substring(0, value.length() - 2);
            }
            projectRepository.findByBasic_Code(code).ifPresent(project -> {
                //alias(프로젝트 풀네임으로 변경될 것)
                if (StringUtils.hasText(
                    projectDesignMap.get(ProjectDesignHeader.FULL_NAME.getName()))) {
                    project.getBasic()
                        .updateAlias(projectDesignMap.get(ProjectDesignHeader.FULL_NAME.getName()));
                }
                //동개수에 따른 동먼저 만들고.
                setComplexBuilding(projectDesignMap, project);

                // design 정보 담고
                setDesign(projectDesignMap, project);
            });
        });

    }

    private void setDesign(Map<String, String> projectDesignMap, Project project) {
        ProjectBasicDesign design = ProjectBasicDesign.of(project);
        if (StringUtils.hasText(projectDesignMap.get(ProjectDesignHeader.CITY1.getName()))) {
            design.updateCity1(projectDesignMap.get(ProjectDesignHeader.CITY1.getName()));
        }
        if (StringUtils.hasText(projectDesignMap.get(ProjectDesignHeader.CITY2.getName()))) {
            design.updateCity2(projectDesignMap.get(ProjectDesignHeader.CITY2.getName()));
        }
        if (StringUtils.hasText(projectDesignMap.get(ProjectDesignHeader.ADDRESS.getName()))) {
            design.updateAddress(projectDesignMap.get(ProjectDesignHeader.ADDRESS.getName()));
        }
        if (StringUtils.hasText(
            projectDesignMap.get(ProjectDesignHeader.COMPLEX_COUNT.getName()))) {
            String value = projectDesignMap.get(ProjectDesignHeader.COMPLEX_COUNT.getName());
            if (!value.equals("-")) {
                design.updateComplexCount(Integer.parseInt(value.substring(0, value.length() - 2)));
            }
        }
        if (StringUtils.hasText(projectDesignMap.get(ProjectDesignHeader.PURPOSE1.getName()))) {
            design.updatePurpose1(projectDesignMap.get(ProjectDesignHeader.PURPOSE1.getName()));
        }
        if (StringUtils.hasText(projectDesignMap.get(ProjectDesignHeader.PURPOSE2.getName()))) {
            design.updatePurpose2(projectDesignMap.get(ProjectDesignHeader.PURPOSE2.getName()));
        }
        if (StringUtils.hasText(projectDesignMap.get(ProjectDesignHeader.LOT_AREA.getName()))) {
            String value = projectDesignMap.get(ProjectDesignHeader.LOT_AREA.getName());
            if (!value.equals("-")) {
                design.updateLotArea(Double.parseDouble(value));
            }
        }
        if (StringUtils.hasText(projectDesignMap.get(ProjectDesignHeader.TOTAL_AREA.getName()))) {
            String value = projectDesignMap.get(ProjectDesignHeader.TOTAL_AREA.getName());
            if (!(value.equals("-") || value.equals("124.072.2284"))) {
                design.updateTotalArea(Double.parseDouble(value));
            }
        }
        if (StringUtils.hasText(
            projectDesignMap.get(ProjectDesignHeader.TOTAL_BUILDING_COUNT.getName()))) {
            String value = projectDesignMap.get(ProjectDesignHeader.TOTAL_BUILDING_COUNT.getName());
            if (!value.equals("-")) {
                design.updateTotalBuildingCount(
                    Integer.parseInt(value.substring(0, value.length() - 2)));
            }
        }
        if (StringUtils.hasText(
            projectDesignMap.get(ProjectDesignHeader.HOUSEHOLD_COUNT.getName()))) {
            String value = projectDesignMap.get(ProjectDesignHeader.HOUSEHOLD_COUNT.getName());
            if (!value.equals("-")) {
                design.updateHouseholdCount(
                    Integer.parseInt(value.substring(0, value.length() - 2)));
            }
        }
        if (StringUtils.hasText(
            projectDesignMap.get(ProjectDesignHeader.MAXIMUM_FLOOR.getName()))) {
            String value = projectDesignMap.get(ProjectDesignHeader.MAXIMUM_FLOOR.getName());
            if (!value.equals("-")) {
                design.updateMaximumFloor(Integer.parseInt(value.substring(0, value.length() - 2)));
            }
        }
        if (StringUtils.hasText(
            projectDesignMap.get(ProjectDesignHeader.MAXIMUM_HEIGHT.getName()))) {
            String value = projectDesignMap.get(ProjectDesignHeader.MAXIMUM_HEIGHT.getName());
            if (!value.equals("-")) {
                design.updateMaximumHeight(
                    Double.parseDouble(value));
            }
        }
        em.persist(design);
    }

    private void setComplexBuilding(Map<String, String> projectDesignMap,
        Project project) {
        for (int i = 1; i <= 50; i++) {
            ProjectComplexBuilding complexBuilding = ProjectComplexBuilding.of(
                project
            );
            if (StringUtils.hasText(
                projectDesignMap.get("동명칭" + i))) {
                complexBuilding.updateName(
                    projectDesignMap.get("동명칭" + i)
                );
                em.persist(complexBuilding);
            }

            if (StringUtils.hasText(projectDesignMap.get("평면형상" + i))) {
                complexBuilding.updateShape(
                    projectDesignMap.get("평면형상" + i)
                );
                em.persist(complexBuilding);
            }
        }
    }
}