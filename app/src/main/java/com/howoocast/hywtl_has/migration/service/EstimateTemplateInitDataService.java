package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplateDetail;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateUnit;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EstimateTemplateInitDataService {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void init() {
        List<EstimateTemplate> estimateTemplateList = new ArrayList<>(List.of(
            EstimateTemplate.of(
                "자연기류 형성",
                TestType.COMMON,
                1,
                new ArrayList<>(List.of(
                    EstimateTemplateDetail.of(
                        new ArrayList<>(List.of(
                            "대상부지 지표면조도구분 판정",
                            "대지주변 건물모델링 및 모형제작",
                            "재현기간 별 기본풍속 평가",
                            "풍동실험을 위한 맞춤형 자연기류 형성"
                        )),
                        EstimateUnit.SITE,
                        25000000L,
                        Boolean.TRUE,
                        "글로벌 수준 ESDU 기반"
                    )
                ))
            ),
            EstimateTemplate.of(
                "주골조설계용 풍하중",
                TestType.F,
                2,
                new ArrayList<>(List.of(
                    EstimateTemplateDetail.of(
                        new ArrayList<>(List.of(
                            "주골조설계용 풍응답 평가(재해석 2회)",
                            "중간요약본 및 최종평가보고서",
                            "풍력실험을 위한 풍력 특수모형 제작",
                            "풍력실험을 통한 풍하중 측정"
                        )),
                        EstimateUnit.BUILDING,
                        7500000L,
                        Boolean.TRUE,
                        "국토교통부 풍동실험 가이드라인"
                    )
                ))
            ),
            EstimateTemplate.of(
                "부가적인 공기력진동",
                TestType.A,
                3,
                new ArrayList<>(List.of(
                    EstimateTemplateDetail.of(
                        new ArrayList<>(List.of(
                            "공기력불안정진동 발생여부 평가",
                            "공기력진동실험을 위한 특수모형 제작",
                            "공기력진동실험을 통한 수평변위 측정",
                            "최종평가보고서"
                        )),
                        EstimateUnit.BUILDING,
                        30000000L,
                        Boolean.TRUE,
                        "(2)항 평가 후 필요 시 수행"
                    )
                ))
            ),
            EstimateTemplate.of(
                "외장재설계용 풍하중",
                TestType.P,
                4,
                new ArrayList<>(List.of(
                    EstimateTemplateDetail.of(
                        new ArrayList<>(List.of(
                            "외장재설계용 풍하중 평가",
                            "최종평가보고서",
                            "풍압실험을 위한 풍압 특수모형 제작",
                            "풍압실험을 통한 풍압 측정(최대 250개소)"
                        )),
                        EstimateUnit.BUILDING,
                        8500000L,
                        Boolean.TRUE,
                        "국토교통부 풍동실험 가이드라인"
                    )
                ))
            ),
            EstimateTemplate.of(
                "보행자 풍쾌적도 및 풍안전도",
                TestType.E,
                5,
                new ArrayList<>(List.of(
                    EstimateTemplateDetail.of(
                        new ArrayList<>(List.of(
                            "보행자의 풍쾌적도 및 풍안전도 평가",
                            "최종평가보고서",
                            "풍압실험을 통한 풍압 측정(최대 70개소)",
                            "풍환경실험을 위한 특수모형 제작"
                        )),
                        EstimateUnit.SITE,
                        15000000L,
                        Boolean.TRUE,
                        "개선방안 요구 시"
                    ),
                    EstimateTemplateDetail.of(
                        new ArrayList<>(List.of(
                            "풍쾌적도 및 풍안전도 개선 평가(최대 2회)"
                        )),
                        EstimateUnit.SITE,
                        15000000L,
                        Boolean.TRUE,
                        "개선방안 요구 시"
                    )
                ))
            ),
            EstimateTemplate.of(
                "구조설계사 구조협력",
                TestType.REVIEW,
                6,
                new ArrayList<>(List.of(
                    EstimateTemplateDetail.of(
                        new ArrayList<>(List.of(
                            "구조물 동특성 자료 수급",
                            "풍하중 검토 및 구조설계 반영"
                        )),
                        EstimateUnit.BUILDING,
                        3000000L,
                        Boolean.TRUE,
                        "(2)항 업무와 연계"
                    )
                ))
            )
        ));
        estimateTemplateList.forEach(em::persist);
    }
}
