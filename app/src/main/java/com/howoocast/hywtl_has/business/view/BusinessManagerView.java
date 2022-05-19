package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import lombok.Getter;

@Getter
public class BusinessManagerView {
    Long id;
    String name; // 담당자명
    String position; // 호칭
    String mobile; // 핸드폰
    String phone; // 전화번호
    String email; // 이메일
    String state; // 상태

    public static BusinessManagerView assemble(BusinessManager businessManager) {
        BusinessManagerView target = new BusinessManagerView();

        target.id = businessManager.getId();
        target.name = businessManager.getName();
        target.position = businessManager.getPosition();
        target.mobile = businessManager.getMobile();
        target.phone = businessManager.getPhone();
        target.email = businessManager.getEmail();
        target.state = businessManager.getState();

        return target;
    }
}
