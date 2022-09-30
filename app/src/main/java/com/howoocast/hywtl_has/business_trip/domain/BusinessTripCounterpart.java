package com.howoocast.hywtl_has.business_trip.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
public class BusinessTripCounterpart {

    /**
     * 회사
     */
    @Column(name = "counterpart_company_name")
    private String companyName;

    /**
     * 부서
     */
    @Column(name = "counterpart_department")
    private String department;

    /**
     * 직위
     */
    @Column(name = "counterpart_rank")
    private String rank;

    /**
     * 성명
     */
    @Column(name = "counterpart_name")
    private String name;

    public static BusinessTripCounterpart of(
            String companyName, String department, String rank, String name
    ) {
        BusinessTripCounterpart businessTripCounterpart = new BusinessTripCounterpart();
        businessTripCounterpart.companyName = companyName;
        businessTripCounterpart.department = department;
        businessTripCounterpart.rank = rank;
        businessTripCounterpart.name = name;

        return businessTripCounterpart;

    }
}
