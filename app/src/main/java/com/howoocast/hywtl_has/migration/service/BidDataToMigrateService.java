package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.migration.enums.BidHeader;
import com.howoocast.hywtl_has.migration.loader.BidExcelReader;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.rival_bid.domain.RivalBid;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class BidDataToMigrateService {

    public static final String HAS_LAB = "한양풍동실험연구소";
    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final BusinessRepository businessRepository;

    @Transactional
    public void migrate() {
        userRepository.findByUsername("admin").ifPresent(a -> {
            List<Map<String, String>> bidMapList = BidExcelReader.excelReader();
            bidMapList.forEach(bidMap -> {
                // 프로젝트 코드가 없는 것 제외.
                if (!StringUtils.hasText(bidMap.get(BidHeader.PROJECT_CODE.getName()))) {
                    return;
                }

                String value = bidMap.get(BidHeader.PROJECT_CODE.getName());
                String code = value;
                if (value == null) {
                    return;
                }
                if (!value.contains("-")) {
                    code = value.substring(0, value.length() - 2);
                }
                String finalCode = code.trim();

                projectRepository.findByBasic_Code(finalCode).ifPresentOrElse(project -> {
                        ProjectBid bid = getBid(bidMap, project);
                        getRivalBid(bidMap, project, bid);
                        // 프로젝트 나라장터 입찰이 아닌 경우

                        ProjectBasic basic = project.getBasic();
                        if (!project.getBasic().getBidType().equals(ProjectBasicBidType.G2B)) {
                            basic.updateCategory(ProjectBasicBidType.G2B);
                            project.updateBasic(basic);
                            em.persist(project);
                        }

                    },
                    () -> {
                        // 프로젝트 없는 경우.
                        String projectName = "프로젝트명 없음";
                        if (StringUtils.hasText(bidMap.get(BidHeader.PROJECT_NAME.getName()))) {
                            projectName = bidMap.get(BidHeader.PROJECT_NAME.getName());
                        }
                        //프로젝트가 없는 경우 생성
                        Project project = Project.of(
                            finalCode,
                            projectName,
                            ProjectBasicBidType.G2B,
                            a,
                            ProjectProgressStatus.UNDER_CONTRACT
                        );
                        em.persist(project);
                        ProjectBid bid = getBid(bidMap, project);
                        getRivalBid(bidMap, project, bid);
                    });
            });
        });
    }

    private void getRivalBid(Map<String, String> bidMap, Project project, ProjectBid bid) {
        // 1순위
        if (StringUtils.hasText(bidMap.get(BidHeader.FIRST_RANK.getName()))
            && StringUtils.hasText(bidMap.get(BidHeader.FIRST_RANK_AMOUNT.getName()))) {
            getRivalBid(
                bidMap,
                project,
                BidHeader.FIRST_RANK.getName(),
                BidHeader.FIRST_RANK_AMOUNT.getName(),
                bid
            );
        }
        // 2순위
        if (StringUtils.hasText(bidMap.get(BidHeader.SECOND_RANK.getName()))
            && StringUtils.hasText(bidMap.get(BidHeader.SECOND_RANK_AMOUNT.getName()))) {
            getRivalBid(
                bidMap,
                project,
                BidHeader.SECOND_RANK.getName(),
                BidHeader.SECOND_RANK_AMOUNT.getName(),
                bid
            );
        }
        // 3순위
        if (StringUtils.hasText(bidMap.get(BidHeader.THIRD_RANK.getName()))
            && StringUtils.hasText(bidMap.get(BidHeader.THIRD_RANK_AMOUNT.getName()))) {
            getRivalBid(
                bidMap,
                project,
                BidHeader.THIRD_RANK.getName(),
                BidHeader.THIRD_RANK_AMOUNT.getName(),
                bid
            );
        }
        // 4순위
        if (StringUtils.hasText(bidMap.get(BidHeader.FOURTH_RANK.getName()))
            && StringUtils.hasText(bidMap.get(BidHeader.FOURTH_RANK_AMOUNT.getName()))) {
            getRivalBid(
                bidMap,
                project,
                BidHeader.FOURTH_RANK.getName(),
                BidHeader.FOURTH_RANK_AMOUNT.getName(),
                bid
            );
        }
        // 5순위
        if (StringUtils.hasText(bidMap.get(BidHeader.FIFTH_RANK.getName()))
            && StringUtils.hasText(bidMap.get(BidHeader.FIFTH_RANK_AMOUNT.getName()))) {
            getRivalBid(
                bidMap,
                project,
                BidHeader.FIFTH_RANK.getName(),
                BidHeader.FIFTH_RANK_AMOUNT.getName(),
                bid
            );
        }
        // 6순위
        if (StringUtils.hasText(bidMap.get(BidHeader.SIXTH_RANK.getName()))
            && StringUtils.hasText(bidMap.get(BidHeader.SIXTH_RANK_AMOUNT.getName()))) {
            getRivalBid(
                bidMap,
                project,
                BidHeader.SIXTH_RANK.getName(),
                BidHeader.SIXTH_RANK_AMOUNT.getName(),
                bid
            );
        }
    }

    private ProjectBid getBid(Map<String, String> bidMap, Project project) {
        ProjectBid bid = ProjectBid.of(project);
        em.persist(bid);

        //1차 공고일
        if (StringUtils.hasText(bidMap.get(BidHeader.FIRST_ANNOUNCEMENT_DATE.getName()))) {
            bid.updateBidDate(getDate(bidMap, BidHeader.FIRST_ANNOUNCEMENT_DATE.getName()));
            em.persist(bid);
        }

        // 선정업체
        if (StringUtils.hasText(bidMap.get(BidHeader.WIN_COMPANY.getName()))) {
            if (!bidMap.get(BidHeader.WIN_COMPANY.getName()).equals("미정")) {
                if (bidMap.get(BidHeader.WIN_COMPANY.getName()).equals(HAS_LAB)) {
                    bid.updateWin(new CustomFinder<>(businessRepository, Business.class).byId(1L));
                    em.persist(bid);
                } else {
                    businessRepository.findByName(bidMap.get(BidHeader.WIN_COMPANY.getName()))
                        .ifPresentOrElse(business -> {
                                bid.updateWin(business);
                                em.persist(bid);
                            },
                            () -> {
                                Business business = Business.of(
                                    bidMap.get(BidHeader.WIN_COMPANY.getName()),
                                    "000-00-00000",
                                    null,
                                    null,
                                    null
                                );
                                em.persist(business);
                                bid.updateWin(business);
                                em.persist(bid);
                            });
                }
            }
        }

        return bid;
    }

    private void getRivalBid(Map<String, String> bidMap, Project project, String rankKey, String amountKey,
        ProjectBid bid) {
        businessRepository.findByName(bidMap.get(rankKey)).ifPresentOrElse(business -> {
                if (HAS_LAB.equals(business.getName())) {
                    if (!bidMap.get(amountKey).equals("-")) {
                        bid.updateTotalAmount(getAmount(bidMap, amountKey));
                        em.persist(bid);
                    }
                    return;
                }
                RivalBid rivalBid = RivalBid.of(project, business);
                if (!bidMap.get(amountKey).equals("-")) {
                    rivalBid.updateTotalAmount(getAmount(bidMap, amountKey));
                }
                em.persist(rivalBid);
            },
            () -> {
                Business business = Business.of(
                    bidMap.get(rankKey),
                    "000-00-00000",
                    null,
                    null,
                    null
                );
                em.persist(business);
                em.flush();

                RivalBid rivalBid = RivalBid.of(project, business);
                if (!bidMap.get(amountKey).equals("-")) {
                    rivalBid.updateTotalAmount(getAmount(bidMap, amountKey));
                }

                em.persist(rivalBid);
                em.flush();
            });
    }

    private Long getAmount(Map<String, String> map, String amountKey) {
        return Long.parseLong(
            new BigDecimal(map.get(amountKey)).setScale(0, RoundingMode.FLOOR)
                .toPlainString());
    }

    private LocalDate getDate(Map<String, String> map, String type) {
        String[] splitDate = map.get(type).split("-");
        String year = splitDate[2];
        String month = String.format("%02d", Integer.parseInt(splitDate[1].split("월")[0]));
        String day = splitDate[0];
        return LocalDate.parse(String.format("%s-%s-%s", year, month, day));
    }
}
