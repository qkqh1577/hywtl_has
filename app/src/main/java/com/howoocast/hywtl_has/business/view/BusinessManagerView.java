package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import lombok.Getter;

@Getter
public class BusinessManagerView {
    Long id;
    String name; // 담당자명
    String jobTitle; // 호칭
    String mobilePhone; // 핸드폰
    String officePhone; // 전화번호
    String email; // 이메일
    String state; // 상태

    public static BusinessManagerView assemble(BusinessManager businessManager) {
        BusinessManagerView target = new BusinessManagerView();

        target.id = businessManager.getId();
        target.name = businessManager.getName();
        target.jobTitle = businessManager.getJobTitle();
        target.mobilePhone = businessManager.getMobilePhone();
        target.officePhone = businessManager.getOfficePhone();
        target.email = businessManager.getEmail();
        target.state = businessManager.getState();

        return target;
    }
}
