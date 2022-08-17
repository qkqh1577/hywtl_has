package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.BusinessManagerStatus;
import java.util.List;
import java.util.Optional;
import lombok.Getter;

import java.util.stream.Collectors;

@Getter
public class BusinessShortView {

    private Long id;
    private String name;
    private String ceoName;
    private String registrationNumber;
    private String address;
    private String officePhone;
    private String note;
    private Integer managerCount;
    private Integer projectCount;


    public static BusinessShortView assemble(Business source) {
        BusinessShortView target = new BusinessShortView();
        target.id = source.getId();
        target.name = source.getName();
        target.ceoName = source.getCeoName();
        target.registrationNumber = source.getRegistrationNumber();
        target.address = source.getAddress();
        target.officePhone = source.getOfficePhone();
        target.managerCount = Optional.ofNullable(source.getManagerList())
            .map(BusinessShortView::toView)
            .map(List::size)
            .orElse(0);
        // TODO: bind project count
        target.projectCount = 0;
        target.note = source.getNote();
        return target;
    }

    private static List<BusinessManagerView> toView(List<BusinessManager> list) {
        return list.stream()
            .filter(manager -> manager.getStatus() == BusinessManagerStatus.IN_OFFICE)
            .map(BusinessManagerView::assemble)
            .collect(Collectors.toList());
    }
}
