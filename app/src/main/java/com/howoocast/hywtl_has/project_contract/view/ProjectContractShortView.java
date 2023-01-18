package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_contract.domain.ContractType;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimatePlan;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateShortView.ProjectEstimateTestDetailView;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectContractShortView {

    private Long id;
    private String code;
    private ContractType contractType;
    private Boolean isSent;
    private Boolean confirmed;
    private LocalDate contractDate;
    private String estimateCode;
    private FileItemView pdfFile;
    private UserShortView createdBy;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String targetTest;
    private List<ProjectEstimateTestDetailView> testList;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private ProjectContractCollection collection;
    private String orderer;
    private String collectionRate;
    private String schedule;

    public static ProjectContractShortView assemble(ProjectContract source) {
        ProjectContractShortView target = new ProjectContractShortView();
        target.id = source.getId();
        target.code = source.getCode();
        target.isSent = source.getIsSent();
        target.confirmed = source.getConfirmed();
        target.contractDate = Optional.ofNullable(source.getBasic()).map(ProjectContractBasic::getContractDate)
            .orElse(null);
        target.estimateCode = source.getEstimate().getCode();
        if (Objects.nonNull(source.getPdfFile())) {
            target.pdfFile = FileItemView.assemble(source.getPdfFile());
        }
        target.createdBy = UserShortView.assemble(source.getWriter());
        target.note = source.getNote();
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        target.testList = ProjectEstimateTestDetailView.assemble(source.getEstimate().getBuildingList());
        String targetTest = target.testList.stream()
            .map(test -> String.format("%d%s", test.getBuildingCount(), test.getTestType().toString()))
            .reduce("", (a, b) -> a + b);

        long eTestCount = source.getEstimate().getSiteList().stream()
            .filter((site -> Boolean.TRUE.equals(site.getWithEnvironmentTest())))
            .count();
        if (eTestCount > 0) {
            targetTest += String.format("%dE", eTestCount);
        }
        target.targetTest = targetTest;
        target.contractDate = Optional.ofNullable(source.getBasic()).map(ProjectContractBasic::getContractDate)
            .orElse(null);
        target.testAmount = Optional.ofNullable(source.getEstimate().getPlan()).map(ProjectEstimatePlan::getTestAmount)
            .orElse(0L);
        target.reviewAmount = Optional.ofNullable(source.getEstimate().getPlan())
            .map(ProjectEstimatePlan::getReviewAmount).orElse(0L);
        target.totalAmount = Optional.ofNullable(source.getEstimate().getPlan())
            .map(ProjectEstimatePlan::getTotalAmount).orElse(0L);
        target.collection = source.getCollection();
        target.orderer = Optional.ofNullable(source.getBasic()).map(ProjectContractBasic::getOrdererCompanyName)
            .orElse("");
        if (Objects.nonNull(source.getCollection()) && Objects.nonNull(source.getCollection().getStageList())) {
            List<String> collectionList = source.getCollection().getStageList().stream().map(stage -> String.valueOf(stage.getRate())).collect(Collectors.toList());
            target.collectionRate = String.join("/", collectionList);
        }

        if (Objects.nonNull(source.getEstimate().getPlan())) {
            ProjectEstimatePlan plan = source.getEstimate().getPlan();
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
        target.contractType = source.getContractType();
        return target;
    }
}
