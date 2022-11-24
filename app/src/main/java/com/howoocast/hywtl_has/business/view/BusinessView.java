package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class BusinessView {

    private Long id;
    private String name;
    private String ceoName;
    private String registrationNumber;
    private String address;

    private String zipCode;
    private String officePhone;
    private String note;
    private String fax;
    private List<BusinessManagerView> managerList;

    public static BusinessView assemble(Business source) {
        BusinessView target = new BusinessView();
        target.id = source.getId();
        target.name = source.getName();
        target.ceoName = source.getCeoName();
        target.registrationNumber = source.getRegistrationNumber();
        target.address = source.getAddress();
        target.zipCode = source.getZipCode();
        target.officePhone = source.getOfficePhone();
        target.note = source.getNote();
        target.fax = source.getFax();
        target.managerList = Optional.ofNullable(source.getManagerList())
            .map(BusinessView::toView)
            .orElse(Collections.emptyList());
        return target;
    }

    private static List<BusinessManagerView> toView(List<BusinessManager> list) {
        return list.stream().map(BusinessManagerView::assemble).collect(Collectors.toList());
    }
}
