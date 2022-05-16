package com.howoocast.hywtl_has.company.view;

import com.howoocast.hywtl_has.company.domain.Company;
import lombok.Getter;

@Getter
public class CompanyListView {

    private Long id; // 식별자
    private String name; // 업체명
    private String representativeName; // 대표명
    private String companyNumber; // 사업자번호
    private String address; // 주소
    private String phone; // 대표 전화번호
    private Integer managerCount; // 담당자
    private Long projectCount; // 참여 프로젝트 총 개수
    private String memo;

    public static CompanyListView assemble(Company source) {
        CompanyListView target = new CompanyListView();
        target.id = source.getId();
        target.name = source.getName();
        target.representativeName = source.getRepresentativeName();
        target.companyNumber = source.getCompanyNumber();
        target.address = source.getAddress();
        target.phone = source.getPhone();
        target.managerCount = source.getManagerList().size();
        target.memo = source.getMemo();
        return target;
    }
}
