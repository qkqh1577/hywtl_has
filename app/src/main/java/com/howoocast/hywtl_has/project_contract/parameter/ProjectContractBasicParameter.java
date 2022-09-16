package com.howoocast.hywtl_has.project_contract.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractBasicParameter {

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
}
