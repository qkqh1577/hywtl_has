package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectContractBasicParameter {

    @NotBlank(message = ProjectContractBasic.KEY + ".service_name.not_blank")
    private String serviceName;

    @NotBlank(message = ProjectContractBasic.KEY + ".service_duration.not_blank")
    private String serviceDuration;

    @NotBlank(message = ProjectContractBasic.KEY + ".outcome.not_blank")
    private String outcome;

    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = ProjectContractBasic.KEY + ".contract_date.not_null")
    private LocalDate contractDate;

    @NotBlank(message = ProjectContractBasic.KEY + ".orderer_address.not_blank")
    private String ordererAddress;

    @NotBlank(message = ProjectContractBasic.KEY + ".orderer_company_name.not_blank")
    private String ordererCompanyName;

    @NotBlank(message = ProjectContractBasic.KEY + ".orderer_ceo_name.not_blank")
    private String ordererCeoName;

    @NotBlank(message = ProjectContractBasic.KEY + ".contractor_address.not_blank")
    private String contractorAddress;

    @NotBlank(message = ProjectContractBasic.KEY + ".contractor_company_name.not_blank")
    private String contractorCompanyName;

    @NotBlank(message = ProjectContractBasic.KEY + ".contractor_ceo_name.not_blank")
    private String contractorCeoName;
}
