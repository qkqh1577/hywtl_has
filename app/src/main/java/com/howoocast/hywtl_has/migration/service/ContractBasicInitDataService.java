package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.contract_basic.domain.ContractBasic;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ContractBasicInitDataService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    @Transactional
    public void init() {
        ContractBasic contractBasic = ContractBasic.of();
        contractBasic.change(
            "용역개시일(착수보고 시) ~ 용역완료일(최종보고서 인도)",
            "다음의 기성단계 별 해당금액을 현금으로 지급",
            "최종보고서 5부(인쇄본)과 1개 전자본(PDF 파일)",
            "본 풍동실험 용역을 체결함에 있어서 발주자(이하 “갑”)와 수급자(이하 “을”)는 위의 내용을 상호확인하고 계약상의 업무를 성실히 수행할 것을 확약한다. 본 계약의 증거로써 용역계약서를 2통씩 작성하여 기명날인(또는 서명)하고 “갑”과 “을”은 각 1부씩 보관한다.",
            "경기도 안산시 상록구 한양대학로55, 한양대학교 풍환경실험관 2층",
            "(주)한양풍동실험연구소",
            "이종원"
        );
        em.persist(contractBasic);
    }

}
