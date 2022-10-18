package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexBuilding;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexSite;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ProjectEstimateTestView {

    private Integer siteCount;
    private String targetTest;
    private List<ProjectEstimateTestDetailView> testList;

    public static ProjectEstimateTestView assemble(
        @Nullable List<ProjectEstimateComplexSite> siteList,
        @Nullable List<ProjectEstimateComplexBuilding> buildingList
    ) {
        ProjectEstimateTestView target = new ProjectEstimateTestView();
        if (Objects.nonNull(siteList)) {
            target.siteCount = siteList.size();
        } else {
            target.siteCount = 0;
        }
        if (Objects.nonNull(buildingList)) {
            target.testList = ProjectEstimateTestDetailView.assemble(buildingList);
            String targetTest = target.testList.stream()
                .map(test -> String.format("%d%s", test.getBuildingCount(), test.getTestType().toString()))
                .reduce("", (a, b) -> a + b);

            if (Objects.nonNull(siteList)) {
                long eTestCount = siteList.stream().filter((site -> Boolean.TRUE.equals(site.getWithEnvironmentTest())))
                    .count();
                if (eTestCount > 0) {
                    targetTest += String.format("%dE", eTestCount);
                }
            }
            target.targetTest = targetTest;
        }

        return target;
    }

    @Getter
    public static class ProjectEstimateTestDetailView {

        private TestType testType;
        private Long buildingCount;
        private List<String> buildingNameList;

        public static List<ProjectEstimateTestDetailView> assemble(List<ProjectEstimateComplexBuilding> buildingList) {

            return Arrays.stream(TestType.values())
                .filter(type ->
                    buildingList.stream()
                        .map(ProjectEstimateComplexBuilding::getTestTypeList)
                        .anyMatch(testTypeList -> testTypeList.stream().anyMatch(testType -> testType == type))
                )
                .map(type -> {
                    ProjectEstimateTestDetailView target = new ProjectEstimateTestDetailView();
                    target.testType = type;
                    target.buildingCount = buildingList.stream()
                        .filter(building -> building.getTestTypeList().contains(type))
                        .count();
                    target.buildingNameList = buildingList.stream()
                        .map(building -> building.getTestTypeList().contains(type) ? building.getName() : "")
                        .collect(Collectors.toList());
                    return target;
                })
                .collect(Collectors.toList());
        }
    }
}
