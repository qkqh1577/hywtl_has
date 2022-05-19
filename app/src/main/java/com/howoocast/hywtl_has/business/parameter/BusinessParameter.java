package com.howoocast.hywtl_has.business.parameter;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
public class BusinessParameter {

    @NotBlank(message = "business.name.not-blank")
    private String name;

    private String representativeName;

    @NotBlank(message = "business.registrationNumber.not-blank")
    private String registrationNumber;

    private String address;

    private String zipCode;

    private String phone;

    private String memo;

    private List<BusinessManagerParameter> managerList;
}
