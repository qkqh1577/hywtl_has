package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class BusinessInvolvedProjectView {

    private Long id;
    private String code;
    private String name;
    private ProjectInvolvedType involvedType;
    private String manager;
    private String estimateExpectation;
    private LocalDate finalEstimateDate;
    private LocalDate finalContractDate;

    public static BusinessInvolvedProjectView assemble(
        ProjectBasicBusiness source,
        ProjectEstimate estimate,
        ProjectContract contract) {

        BusinessInvolvedProjectView target = new BusinessInvolvedProjectView();
        target.id = source.getProject().getId();
        target.code = source.getProject().getBasic().getCode();
        target.name = source.getProject().getBasic().getName();
        target.involvedType = source.getInvolvedType();
        target.manager = source.getBusinessManager().getName();
        target.estimateExpectation = Optional.ofNullable(source.getProject().getStatus().getEstimateExpectation()).map(
            ProjectEstimateExpectation::getName).orElse("");
        if (Objects.nonNull(estimate)) {
            target.finalEstimateDate = estimate.getPlan().getEstimateDate();
        }
        if (Objects.nonNull(contract)) {
            target.finalContractDate = contract.getBasic().getContractDate();
        }
        return target;
    }
}
