package com.howoocast.hywtl_has.project_complex.view;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectBasicTestView {

    private Integer siteCount;
    private String targetTest;

    private List<ProjectBasicTestDetailView> testList;

    public static ProjectBasicTestView assemble(
        List<ProjectComplexSite> siteList,
        List<ProjectComplexBuilding> buildingList
    ) {
        ProjectBasicTestView target = new ProjectBasicTestView();
        target.siteCount = siteList.size();
        target.testList = ProjectBasicTestDetailView.assemble(buildingList);
        String targetTest = target.testList.stream()
            .map(test -> String.format("%d%s", test.getBuildingCount(), test.getTestType().toString()))
            .reduce("", (a, b) -> a + b);

        long eTestCount = siteList.stream().filter((site -> Boolean.TRUE.equals(site.getWithEnvironmentTest())))
            .count();
        if (eTestCount > 0) {
            targetTest += String.format("%dE", eTestCount);
        }

        target.targetTest = targetTest;
        return target;
    }


    @Getter
    public static class ProjectBasicTestDetailView {

        private TestType testType;
        private Long buildingCount;
        private List<String> buildingNameList;

        public static List<ProjectBasicTestDetailView> assemble(List<ProjectComplexBuilding> buildingList) {

            return Arrays.stream(TestType.values())
                .filter(type ->
                    buildingList.stream()
                        .map(ProjectComplexBuilding::getTestTypeList)
                        .anyMatch(testTypeList -> testTypeList.stream().anyMatch(testType -> testType == type))
                )
                .map(type -> {
                    ProjectBasicTestDetailView target = new ProjectBasicTestDetailView();
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
