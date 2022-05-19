package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.Business;
import lombok.Getter;

import java.util.stream.Collectors;

@Getter
public class BusinessListView {

    private Long id; // 식별자
    private String name; // 업체명
    private String representativeName; // 대표명
    private String registrationNumber; // 사업자번호
    private String address; // 주소
    private String phone; // 대표 전화번호
    private Integer managerCount; // 담당자
    private Long projectCount; // 참여 프로젝트 총 개수
    private String memo;

    public static BusinessListView assemble(Business source) {
        BusinessListView target = new BusinessListView();
        target.id = source.getId();
        target.name = source.getName();
        target.representativeName = source.getRepresentativeName();
        target.registrationNumber = source.getRegistrationNumber();
        target.address = source.getAddress();
        target.phone = source.getPhone();
        target.managerCount = source.getManagerList().stream().filter(
            manager -> !(manager.getState().equals("퇴사")))
            .collect(Collectors.toList())
            .size();
        target.memo = source.getMemo();
        return target;
    }
}
