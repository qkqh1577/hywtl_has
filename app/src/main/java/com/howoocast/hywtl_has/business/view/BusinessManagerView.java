package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.BusinessManagerStatus;
import java.util.List;
import lombok.Getter;

@Getter
public class BusinessManagerView {

    private Long id;
    private String name;
    private String jobTitle;
    private String mobilePhone;
    private String department;
    private String officePhone;
    private String email;
    private String address;
    private List<String> meta;
    private BusinessManagerStatus status;
    private Integer projectCount;

    public static BusinessManagerView assemble(BusinessManager businessManager) {
        BusinessManagerView target = new BusinessManagerView();

        target.id = businessManager.getId();
        target.name = businessManager.getName();
        target.jobTitle = businessManager.getJobTitle();
        target.department = businessManager.getDepartment();
        target.mobilePhone = businessManager.getMobilePhone();
        target.officePhone = businessManager.getOfficePhone();
        target.email = businessManager.getEmail();
        target.address = businessManager.getAddress();
        target.meta = businessManager.getMeta();
        target.status = businessManager.getStatus();
        target.projectCount = businessManager.getProjectList().size();

        return target;
    }
}
