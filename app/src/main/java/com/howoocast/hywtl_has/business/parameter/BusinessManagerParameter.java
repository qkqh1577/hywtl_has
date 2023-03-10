package com.howoocast.hywtl_has.business.parameter;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.BusinessManagerStatus;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessManagerParameter {

    private Long id;

    @Valid
    @NotBlank(message = BusinessManager.KEY + ".name.not_blank")
    private String name;

    private String jobTitle;

    private String department;

    private String mobilePhone;

    private String officePhone;

    private String email;

    private String address;

    private List<String> meta;
    @Valid
    @NotNull(message = BusinessManager.KEY + ".status.not_null")
    private BusinessManagerStatus status; // 상태:  재직, 퇴사, 휴직
}
