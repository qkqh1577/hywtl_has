package com.howoocast.hywtl_has.company.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManagerParameter {

    private Long id;

    private String name;

    private String position;

    private String mobile;

    private String phone;

    private String email;

    private String state; //상태:  재직, 퇴사
}
