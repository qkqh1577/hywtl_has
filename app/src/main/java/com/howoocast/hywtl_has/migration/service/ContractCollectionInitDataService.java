package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.contract_collection.domain.ContractCollection;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollectionStage;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollectionStageExpectedDateType;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ContractCollectionInitDataService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    @Transactional
    public void init() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<ContractCollectionStage> contractCollectionStageList = new ArrayList<>(List.of(
                ContractCollectionStage.of(
                    "계약금",
                    30.0,
                    "계약 체결 시",
                    ContractCollectionStageExpectedDateType.CONTRACT_DAY
                ),
                ContractCollectionStage.of(
                    "중도금",
                    50.0,
                    "구조 설계용 풍하중 납품 시",
                    ContractCollectionStageExpectedDateType.DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND
                ),
                ContractCollectionStage.of(
                    "잔금",
                    20.0,
                    "최종 보고서 납품 시",
                    ContractCollectionStageExpectedDateType.DAY_TO_DELIVER_FOE_FINAL_REPORT
                )
            ));

            ContractCollection contractCollection = ContractCollection.of();
            contractCollection.change(contractCollectionStageList);
            contractCollection.updateCreatedBy(a);
            em.persist(contractCollection);
        });
    }
}
