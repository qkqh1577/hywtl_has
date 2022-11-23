package com.howoocast.hywtl_has.business.parameter;

import com.howoocast.hywtl_has.business.domain.Business;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessParameter {

    private Long id;

    @NotBlank(message = Business.KEY + ".name.not_blank")
    private String name;

    private String ceoName;

    private String officePhone;

    @NotBlank(message = Business.KEY + ".registration_number.not_blank")
    private String registrationNumber;

    private String address;

    private String zipCode;

    private String note;

    private String fax;

    @NotEmpty(message = Business.KEY + ".manager_list.not_empty")
    private List<BusinessManagerParameter> managerList;
}
