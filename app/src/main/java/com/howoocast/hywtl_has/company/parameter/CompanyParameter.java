package com.howoocast.hywtl_has.company.parameter;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
public class CompanyParameter {

    @NotBlank(message = "업체명은 필수 입력 항목입니다.")
    private String name;

    private String representativeName;

    private String companyNumber;

    private String address;

    private String zipCode;

    private String phone;

    private String memo;

    private List<ManagerParameter> managerList;
}
