package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import lombok.Getter;

@Getter
public class BusinessManagerShortView {

    private Long id;
    private String name;
    private String department;
    private String jobTitle;
    private String mobilePhone;

    public static BusinessManagerShortView assemble(BusinessManager source) {
        BusinessManagerShortView target = new BusinessManagerShortView();
        target.id = source.getId();
        target.name = source.getName();
        target.department = source.getDepartment();
        target.jobTitle = source.getJobTitle();
        target.mobilePhone = source.getMobilePhone();
        return target;
    }
}
