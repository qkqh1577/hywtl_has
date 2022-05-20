package com.howoocast.hywtl_has.business.parameter;

import com.howoocast.hywtl_has.business.common.BusinessManagerStatus;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BusinessManagerParameter {

    private Long id;

    @NotBlank(message = "business-manager.name.not-blank")
    private String name;

    private String jobTitle;

    private String mobilePhone;

    private String officePhone;

    private String email;

    private List<String> meta;

    @NotNull(message = "business-manager.status.not-null")
    private BusinessManagerStatus status; // 상태:  재직, 퇴사, 휴직
}
