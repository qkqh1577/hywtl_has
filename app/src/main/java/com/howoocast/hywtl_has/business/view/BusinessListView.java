package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.common.BusinessManagerStatus;
import com.howoocast.hywtl_has.business.domain.Business;
import java.util.List;
import java.util.Optional;
import lombok.Getter;

import java.util.stream.Collectors;

@Getter
public class BusinessListView {

    private Long id; // 식별자
    private String name; // 업체명
    private String representativeName; // 대표명
    private String registrationNumber; // 사업자번호
    private String address; // 주소
    private String officePhone; // 대표 전화번호
    private Integer managerCount; // 담당자 수

    private Integer projectCount; // 참여 프로젝트 총 개수
    private String memo; // 비고

    public static BusinessListView assemble(Business source) {
        BusinessListView target = new BusinessListView();
        target.id = source.getId();
        target.name = source.getName();
        target.representativeName = source.getRepresentativeName();
        target.registrationNumber = source.getRegistrationNumber();
        target.address = source.getAddress();
        target.officePhone = source.getOfficePhone();
        target.managerCount = Optional.ofNullable(source.getManagerList())
            .map(managerList -> managerList.stream()
                .filter(manager -> manager.getStatus() == BusinessManagerStatus.IN_OFFICE)
                .collect(Collectors.toList())
            )
            .map(List::size)
            .orElse(0);
        target.memo = source.getMemo();
        return target;
    }
}
