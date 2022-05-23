package com.howoocast.hywtl_has.business.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessRegistrationNumberCheckParameter {

    @NotBlank(message = "business.registration-number.not-blank")
    private String registrationNumber;

    private Long id;

}
