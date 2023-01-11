package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EstimateContentInitDataService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    @Transactional
    public void init() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<EstimateContent> estimateContentList = new ArrayList<>(List.of(
                EstimateContent.of(
                    "A type",
                    new ArrayList<>(List.of(
                        TestType.COMMON,
                        TestType.A,
                        TestType.REVIEW
                    )),
                    new ArrayList<>(List.of(
                        "A type - d 1",
                        "A type - d 2",
                        "A type - d 3",
                        "A type - d 4",
                        "A type - d 5 {total_price_kor_tax} 총금액 부가세 포함 한글"
                    ))
                ),
                EstimateContent.of(
                    "F, P type",
                    new ArrayList<>(List.of(
                        TestType.COMMON,
                        TestType.F,
                        TestType.P,
                        TestType.REVIEW
                    )),
                    new ArrayList<>(List.of(
                        "F, P type - d 1 {experiment_num} 실험동수)",
                        "F, P type - d 2 {total_apartment_num} 총 동 수입니다."
                    ))
                ),
                EstimateContent.of(
                    "F type",
                    new ArrayList<>(List.of(
                        TestType.COMMON,
                        TestType.F,
                        TestType.REVIEW
                    )),
                    new ArrayList<>(List.of(
                        "{experiment_week} 설풍 납풍 가능 주."
                    ))
                ),
                EstimateContent.of(
                    "F, P, A type",
                    new ArrayList<>(List.of(
                        TestType.COMMON,
                        TestType.F,
                        TestType.P,
                        TestType.A,
                        TestType.REVIEW
                    )),
                    new ArrayList<>(List.of(
                        "F, P, A type - d 1 {report_week} 최종 보고서 납품 가능주",
                        "F, P, A type - d 2 {total_price} 총금액 부가세 미포함'",
                        "F, P, A type - d 3 {total_price_tax} 총금액 부가세 포함'",
                        "F, P, A type - d 4 {total_price_kor} 총금액 부가세 미포함 한글"
                    ))
                )
            ));
            estimateContentList.forEach(content -> {
                content.updateCreatedBy(a);
                em.persist(content);
            });
        });
    }
}
