package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.common.BusinessManagerStatus;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import lombok.Getter;

import java.util.List;

@Getter
public class BusinessManagerView {

    private Long id;
    private String name; // 담당자명
    private String jobTitle; // 호칭
    private String mobilePhone; // 핸드폰
    private String officePhone; // 전화번호
    private String email; // 이메일
    private List<String> meta; // 메타
    private BusinessManagerStatus status; // 상태

    public static BusinessManagerView assemble(BusinessManager businessManager) {
        BusinessManagerView target = new BusinessManagerView();

        target.id = businessManager.getId();
        target.name = businessManager.getName();
        target.jobTitle = businessManager.getJobTitle();
        target.mobilePhone = businessManager.getMobilePhone();
        target.officePhone = businessManager.getOfficePhone();
        target.email = businessManager.getEmail();
        target.meta = businessManager.getMeta();
        target.status = businessManager.getStatus();

        return target;
    }
}
