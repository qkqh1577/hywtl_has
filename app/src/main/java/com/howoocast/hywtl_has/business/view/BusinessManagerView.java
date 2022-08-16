package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.BusinessManagerStatus;
import lombok.Getter;

import java.util.List;

@Getter
public class BusinessManagerView {

    private Long id;
    private String name;
    private String jobTitle;
    private String mobilePhone;
    private String officePhone;
    private String email;
    private List<String> meta;
    private BusinessManagerStatus status;

    private Integer projectCount;

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
        // TODO: bind project count
        target.projectCount = 0;

        return target;
    }
}
