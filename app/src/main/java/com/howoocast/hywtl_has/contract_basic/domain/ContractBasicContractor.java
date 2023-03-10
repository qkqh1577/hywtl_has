package com.howoocast.hywtl_has.contract_basic.domain;

import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractBasicContractor {

    /**
     * 소재
     */
    private String address;
    /**
     * 상호
     */
    private String companyName;
    /**
     * 대표명
     */
    private String ceoName;

    public static ContractBasicContractor of(
        @Nullable String address,
        @Nullable String companyName,
        @Nullable String ceoName
    ) {
        ContractBasicContractor instance = new ContractBasicContractor();
        instance.address = address;
        instance.companyName = companyName;
        instance.ceoName = ceoName;
        return instance;
    }
}
