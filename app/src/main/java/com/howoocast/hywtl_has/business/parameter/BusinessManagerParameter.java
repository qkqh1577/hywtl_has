package com.howoocast.hywtl_has.business.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessManagerParameter {

    private Long id;

    private String name;

    private String jobTitle;

    private String mobile;

    private String phone;

    private String email;

    private String state; //상태:  재직, 퇴사
}
