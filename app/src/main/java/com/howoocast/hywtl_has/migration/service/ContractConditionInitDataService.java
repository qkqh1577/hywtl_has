package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.contract_condition.domain.ContractCondition;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ContractConditionInitDataService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    @Transactional
    public void init() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            ArrayList<ContractConditionDto> contractConditionList = new ArrayList<>();
            contractConditionList.add(new ContractConditionDto(
                "【제1조 목적】",
                new ArrayList<>(List.of("본 계약의 목적은 “갑”과 “을”의 상호 신뢰를 바탕으로 원활한 용역을 수행하기 위함이다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제2조 범위】",
                new ArrayList<>(List.of(
                    "본 계약의 범위는 【제15조 특기사항】의 수행범위와 같고, “을”이 용역을 완료한 후 “갑”에게 제공하는 최종결과는 특기사항에 한한다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제3조 용역기간】",
                new ArrayList<>(List.of(
                    "① 본 계약의 기간은 ‘용역개시일‘로부터 ’용역완료일’까지이다. 단, “갑”과 “을” 쌍방의 합의에 의하여 계약기간을 변경할 수 있다.",
                    "② (용역개시일)은 ‘계약금’과 모형제작을 위한 ‘건축설계도서’, ‘구조동특성 자료’를 수급한 이후 “을”이 “갑”에게 용역개시(착수보고)를 통보한 날을 기준으로 한다.",
                    "③ (용역완료일)은 “을”이 용역결과를 “갑”에게 제출하고 그 결과물로 풍동실험 최종보고서를 납품완료한 날을 기준으로 한다. 다만, “갑”과 “을”을 협의에 의하여 용역완료일을 따로 정할 수 있다."
                ))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제4조 최종보고서 제출】",
                new ArrayList<>(List.of(
                    "“을”은 용역이 완료된 후 본 용역결과에 관한 최종보고서 5부(인쇄본)를 “갑”에게 제출하여야 한다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제5조 신의성실 및 상호협조】",
                new ArrayList<>(List.of(
                    "① (신의성실) “갑”과 “을”은 신의를 가지고 본 계약의 각 조항을 성실히 이행하여야 한다.",
                    "② (상호협조) “을”은 전 용역과정을 통하여 “갑”의 요청이 있을 때에는 수시로 용역내용에 관하여 “갑”과 협의하여야 하며, “갑” 또한 본 용역과 관련하여 필요한 사항을 “을”에게 적극 협조하여야 한다.",
                    "③ (규정준수) “갑”이 용역수행에 필요한 인력, 재료, 기자재 및 시설 등을 출자하는 경우에는 “을”의 제반규정을 준수하여야 한다."
                ))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제6조 비밀보장】",
                new ArrayList<>(List.of(
                    "“갑”과 “을”은 상호 상대방의 승인 없이는 본 용역과 관련하여 취득한 상대방의 비밀을 외부에 공개 또는 제공하지 아니한다.  다만, 이 조항은 상호 일반적인 기업활동이나 연구활동에 대하여는 적용되지 아니한다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제7조 용역결과 발생되는 물품의 귀속】",
                new ArrayList<>(List.of(
                    "본 용역결과로 발생하는 실험모형은 제작 기술보호를 위하여 “을”의 소유로 하고, 발생기자재 및 시설은 “을”의 소유로 한다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제8조 실험모형의 보존】",
                new ArrayList<>(List.of(
                    "“을“은 본 용역결과로 발생하는 실험모형에 대하여 용역완료일 이후 2개월간 보존하며, 의무보존기간 이후 ”을“이 임의로 폐기할 수 있다. 다만, 보존기간은 ”갑“과 ”을“의 협의에 의해 변경할 수 있다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제9조 권리양도의 제한】",
                new ArrayList<>(List.of(
                    "“갑”과 “을”은 상호 상대방의 동의 없이 본 계약에 의하여 취득되는 제반권리를 제 3자에게 제공하거나 양도할 수 없다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제10조 계약의 해지】",
                new ArrayList<>(List.of(
                    "① (“갑”의 해지) “을”이 본 용역을 수행할 능력이 없다고 인정될 경우, “갑”은  1개월 이상의 기간을 정하여 “을”에게 해지의 의사를 통보하여 협의한 후 본 계약을 해지할 수 있다.",
                    "② (“을”의 해지) “갑”이 본 계약을 위배하여 원활한 용역수행이 극히 곤란하다고 인정될 경우 “을”은 1개월 이상의 기간을 정하여 “갑”에게 이의 개선을 최고한 후 그 기간 내에 현저한 개선사실이 없을 경우에는 본 계약을 해지할 수 있다.",
                    "③ (해지협의) 본조 제①항 및 제②항에 의하여 계약이 해지될 경우에는 “을”은 해지된 날로부터 1개월 이내에 해지 시까지의 용역비 집행정산서 및 해지 시까지의 용역보고서를 “갑”에게 제출하고, 용역비의 미집행분에 한하여 “갑”에게 반환한다. 다만, 해지의 책임이 “갑”에게 있을 경우 용역비의 미집행 분을 “갑”은 “을에게 청구할 수 없다.",
                    "④ (기타) 기타 해지에 필요한 사항은 “갑”과 “을” 쌍방의 합의에 의한다."

                ))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제11조 손해배상】",
                new ArrayList<>(List.of(
                    "① “갑”과 “을”은 상대방이 이 계약을 위반하거나 업무상과실 또는 【제10조 계약의 해지】에 의한 손해가 발생한 때에는 용역대가의 범위(용역비) 내에서 상대방에게 손해배상을 청구할 수 있다.",
                    "② 천재, 폭발, 태풍, 폭우, 전쟁 등의 천재지변이나 계엄선포 등의 법률적 제재, 실험장비의 고장, 수리 등에 의해 지연된 경우 또는 파업, 폭동 등 계약 당사자 간의 권한과 능력이외의 사정으로 인하여 “갑” 또는 “을”이 본 계약의 이행에 차질을 초래하였을 경우 이에 따른 손해, 손실에 대하여는 “갑” “을” 상호간에 변상의 책임을 지지 아니한다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제12조 중재】",
                new ArrayList<>(List.of(
                    "계약기간 중 또는 계약종료 후 본 계약의 해석 또는 계약의 효력, 또는 권리와 의무에 대하여 양자 간의 분쟁이 발생했을 때에는 그 분쟁은 중재에 의해 해결한다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제13조 해석】",
                new ArrayList<>(List.of(
                    "본 계약에 명기되지 아니한 사항 및 본 계약의 해석상 이의가 있을 때에는 쌍방의 합의 또는 통상의 관행에 따른다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제14조 용역비 지급】",
                new ArrayList<>(List.of(
                    "본 용역비의 지급 시기 및 비율은 “갑”과 “을”의 상호 간 협의를 통하여 결정하며, “갑”은 지급 시기 30일 이내에 해당 용역비를 “을”에게 지급하여야 한다."))
            ));
            contractConditionList.add(new ContractConditionDto(
                "【제15조 특기사항】",
                new ArrayList<>(List.of(
                    "① 풍동실험 대상 건축물은 “갑”의 요구에 따라 건축물안전영향평가를 위한 2개동에 대한 풍동실험을 수행한다.",
                    "② 실험항목은 동에 대한 풍력실험, 공기력진동실험, 풍압실험 및 단지에 대한 풍환경실험이며, 양자협의에 따라 변경할 수 있다.",
                    "③ 실험결과는 실험대상 건축물에 한하여 분석하고 보고서에 수록한다.",
                    "④ 풍력실험의 풍향각은 전풍향에 대하여 36개 방위(10° 간격)를 수행한다.",
                    "⑤ ➃에 따라 특정 풍향각에서 풍진동이 심히 우려되는 경우에 한하여 0개동에 대해 공기력 진동실험을 수행하여 부가적인 진동특성을 재평가할 수 있으며, (￦0-부가세별도)과 0주의 기간이 추가된다.",
                    "⑥ 풍압실험의 풍향각은 전풍향에 대하여 36개 방위(10° 간격)를 수행하며, 각 동의 풍압공의 개수는 250개 내외로 한다.",
                    "⑦ 풍환경실험의 풍향각은 전풍향에 대하여 16개 방위(22.5° 간격)를 수행하며, 단지내 풍속계측소는 50개 내외로 한다. 단, 풍쾌적도 및 풍안전도 개선조치 평가가 필요할 경우 추가적인 비용과 기간이 발생할 수 있음.",
                    "⑧ 본 용역비는 “구조설계사무소 구조검토비용“ 일금육십만원정(￦600,000-부가세별도)이 포함되어 있다.",
                    "⑨ 본 용역은 ‘건축물 안전영향평가’를 위한 것이며, ‘구조안전심의(실시설계)‘를 위한 용역은 포함 되어 있지 않음.",
                    "➉ 본 용역은 모형제작 및 풍동실험 각1회로 수행되며, 용역개시일에 받은 ‘건축설계도서’로 진행된다. 다만, 도서 변동으로 인한 모형재제작 및 재실험 발생 시 추가금액과 기간이 발생한다."
                ))
            ));
            contractConditionList.forEach(contractCondition -> {
                ContractCondition condition = ContractCondition.of(contractCondition.getTitle(),
                    contractCondition.getDescriptionList());
                condition.updateCreatedBy(a);
                em.persist(condition);
            });

        });
    }

    @Getter
    @Setter
    private static class ContractConditionDto {

        private String title;
        private List<String> descriptionList;

        public ContractConditionDto(String title, ArrayList<String> descriptionList) {
            this.title = title;
            this.descriptionList = descriptionList;
        }
    }

}
