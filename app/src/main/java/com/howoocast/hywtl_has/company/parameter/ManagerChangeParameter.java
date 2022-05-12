package com.howoocast.hywtl_has.company.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManagerChangeParameter {
    private Long id;
    private String name; // 담당자명

    private String position; // 호칭

    private String mobile; // 핸드폰

    private String phone; // 전화번호

    private String email; // 이메일

    private String state; // 상태

}
