package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexBuilding;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimatePlan;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectEstimateShortView {

    private Long id;
    private String code;
    private String type;
    private Boolean isSent;
    private LocalDate sentDate;
    private Boolean confirmed;
    private String recipient;
    private UserShortView createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private BusinessShortView business;
    private Boolean hasExperimentInfo;
    private LocalDate estimateDate;
    private String targetTest;
    private String note;
    private List<ProjectEstimateTestDetailView> testList;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String schedule;

    public static ProjectEstimateShortView assemble(ProjectEstimate source) {
        ProjectEstimateShortView target = new ProjectEstimateShortView();
        target.id = source.getId();
        target.code = source.getCode();
        target.type = source.getType();
        target.isSent = source.getIsSent();
        target.confirmed = source.getConfirmed();
        target.recipient = source.getRecipient();
        target.createdBy = UserShortView.assemble(source.getWriter());
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        // migration상 로직 변경 필요.
        target.business = Optional.ofNullable(source.getBusiness()).map(BusinessShortView::assemble).orElse(null);
        target.hasExperimentInfo = Optional.ofNullable(source.getPlan()).map(ProjectEstimatePlan::getHasExperimentInfo)
            .orElse(false);
        target.testList = ProjectEstimateTestDetailView.assemble(source.getBuildingList());
        String targetTest = target.testList.stream()
            .map(test -> String.format("%d%s", test.getBuildingCount(), test.getTestType().toString()))
            .reduce("", (a, b) -> a + b);

        long eTestCount = source.getSiteList().stream()
            .filter((site -> Boolean.TRUE.equals(site.getWithEnvironmentTest())))
            .count();
        if (eTestCount > 0) {
            targetTest += String.format("%dE", eTestCount);
        }
        target.targetTest = targetTest;
        target.estimateDate = Optional.ofNullable(source.getPlan()).map(ProjectEstimatePlan::getEstimateDate)
            .orElse(null);
        target.note = source.getNote();
        target.testAmount = Optional.ofNullable(source.getPlan()).map(ProjectEstimatePlan::getTestAmount).orElse(0L);
        target.reviewAmount = Optional.ofNullable(source.getPlan()).map(ProjectEstimatePlan::getReviewAmount)
            .orElse(0L);
        target.totalAmount = Optional.ofNullable(source.getPlan()).map(ProjectEstimatePlan::getTotalAmount).orElse(0L);
        if (Objects.nonNull(source.getPlan())) {
            ProjectEstimatePlan plan = source.getPlan();
            if (Objects.nonNull(plan.getExpectedTestDeadline())
                || Objects.nonNull(plan.getExpectedFinalReportDeadline())) {
                String schedule = "";
                if (Objects.nonNull(plan.getExpectedTestDeadline())) {
                    schedule += String.format("%s주", plan.getExpectedTestDeadline());
                }
                if (Objects.nonNull(plan.getExpectedFinalReportDeadline())) {
                    if (Objects.isNull(plan.getExpectedTestDeadline())) {
                        schedule += String.format("%s주", plan.getExpectedFinalReportDeadline());
                    } else {
                        schedule += String.format(" / %s주", plan.getExpectedFinalReportDeadline());
                    }
                }
                target.schedule = schedule;
            }
        }
        target.sentDate = source.getSentDate();
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
