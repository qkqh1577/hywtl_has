package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ProjectContractBasicView {

    private String serviceName;
    private String serviceDuration;
    private String outcome;
    private String description;
    private LocalDate contractDate;
    private String ordererAddress;
    private String ordererCompanyName;
    private String ordererCeoName;
    private String contractorAddress;
    private String contractorCompanyName;
    private String contractorCeoName;

    public static ProjectContractBasicView assemble(ProjectContractBasic source) {
        ProjectContractBasicView target = new ProjectContractBasicView();
        target.serviceName = source.getServiceName();
        target.serviceDuration = source.getServiceDuration();
        target.outcome = source.getOutcome();
        target.description = source.getDescription();
        target.contractDate = source.getContractDate();
        target.ordererAddress = source.getOrdererAddress();
        target.ordererCompanyName = source.getOrdererCompanyName();
        target.ordererCeoName = source.getOrdererCeoName();
        target.contractorAddress = source.getContractorAddress();
        target.contractorCompanyName = source.getContractorCompanyName();
        target.contractorCeoName = source.getContractorCeoName();
        return target;
    }
}
