package com.howoocast.hywtl_has.project_contract.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.time.LocalDate;
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
@Table(name = ProjectContractBasic.KEY)
@DynamicUpdate
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectContractBasic.KEY + " set deleted_at = now() where id=?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectContractBasic extends CustomEntity {

    public static final String KEY = "project_contract_basic";
    /**
     * 용역명
     */
    private String serviceName;

    /**
     * 용역 기간
     */
    private String serviceDuration;

    /**
     * 성과품
     */
    private String outcome;

    /**
     * 추가 사항
     */
    private String description;

    /**
     * 계약서 날짜
     */
    private LocalDate contractDate;

    /**
     * 발주자 소재
     */
    private String ordererAddress;

    /**
     * 발주자 상호
     */
    private String ordererCompanyName;

    /**
     * 발주자 대표명
     */
    private String ordererCeoName;

    /**
     * 수급자 소재
     */
    private String contractorAddress;

    /**
     * 수급자 상호
     */
    private String contractorCompanyName;

    /**
     * 수급자 대표명
     */
    private String contractorCeoName;

    public static ProjectContractBasic of(
        String serviceName,
        String serviceDuration,
        String outcome,
        String description,
        LocalDate contractDate,
        String ordererAddress,
        String ordererCompanyName,
        String ordererCeoName,
        String contractorAddress,
        String contractorCompanyName,
        String contractorCeoName
    ) {
        ProjectContractBasic instance = new ProjectContractBasic();
        instance.serviceName = serviceName;
        instance.serviceDuration = serviceDuration;
        instance.outcome = outcome;
        instance.description = description;
        instance.contractDate = contractDate;
        instance.ordererAddress = ordererAddress;
        instance.ordererCompanyName = ordererCompanyName;
        instance.ordererCeoName = ordererCeoName;
        instance.contractorAddress = contractorAddress;
        instance.contractorCompanyName = contractorCompanyName;
        instance.contractorCeoName = contractorCeoName;
        return instance;
    }
}
