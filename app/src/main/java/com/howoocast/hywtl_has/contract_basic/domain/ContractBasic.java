package com.howoocast.hywtl_has.contract_basic.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = ContractBasic.KEY)
@DynamicUpdate
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ContractBasic.KEY + " set deleted_at = now() where id=?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractBasic extends CustomEntity {


    public static final String KEY = "contract_basic";

    /**
     * 용역 기간
     */
    private String serviceDuration;

    /**
     * 기성 단계 비고
     */
    private String collectionStageNote;

    /**
     * 성과품
     */
    private String outcome;

    /**
     * 추가 사항
     */
    private String description;

    @Embedded
    private ContractBasicContractor contractor;

    public static ContractBasic of() {
        return new ContractBasic();
    }

    public void change(
        String serviceDuration,
        String collectionStageNote,
        String outcome,
        String description,
        String contractorAddress,
        String contractorCompanyName,
        String contractorCeoName
    ) {
        this.serviceDuration = serviceDuration;
        this.collectionStageNote = collectionStageNote;
        this.outcome = outcome;
        this.description = description;
        this.contractor = ContractBasicContractor.of(
            contractorAddress,
            contractorCompanyName,
            contractorCeoName
        );
    }

}
