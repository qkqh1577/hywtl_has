package com.howoocast.hywtl_has.project.domain;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBasic {

    /**
     * 프로젝트 번호
     */
    private String code;

    /**
     * 프로젝트 닉네임
     */
    @Column
    private String alias;

    /**
     * 프로젝트명, 프로젝트 풀네임
     */
    @NotBlank
    @Column(nullable = false)
    private String name;

    /**
     * 견적 구분
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectBasicBidType bidType;

    /**
     * 문의 접수자
     */
    @ManyToOne
    private User receptionManager;

    /**
     * 영업 당담자
     */
    @ManyToOne
    private User salesManager;

    /**
     * 담당 PM
     */
    @ManyToOne
    private User projectManager;

    /**
     * 예상 착수 시기
     */
    private LocalDate expectedMonth;

    /**
     * 요청 일정
     */
    private LocalDate requestedMonth;

    /**
     * LH 여부
     */
    private Boolean isLh = false;

    public static ProjectBasic of(
        @Nullable String code,
        String name,
        String alias,
        ProjectBasicBidType bidType,
        User receptionManager
    ) {
        ProjectBasic instance = new ProjectBasic();
        instance.name = name;
        instance.code = code;
        instance.alias = alias;
        instance.bidType = bidType;
        instance.receptionManager = receptionManager;
        return instance;
    }

    public void changeCode(String code) {
        this.code = code;
    }

    public List<EventEntity> update(
        @Nullable String name,
        @Nullable String alias,
        @Nullable ProjectBasicBidType bidType,
        @Nullable User receptionManager,
        @Nullable Boolean resetReceptionManager,
        @Nullable User salesManager,
        @Nullable Boolean resetSalesManager,
        @Nullable User projectManager,
        @Nullable Boolean resetProjectManager,
        @Nullable LocalDate expectedMonth,
        @Nullable Boolean resetExpectedMonth,
        @Nullable LocalDate requestedMonth,
        @Nullable Boolean resetRequestedMonth,
        @Nullable Boolean isLh
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        if (Objects.nonNull(name)) {
            eventList.add(EventEntity.of(
                "프로젝트명 변경",
                this.name,
                name
            ));
            this.name = name;
        }
        if (Objects.nonNull(alias)) {
            eventList.add(EventEntity.of(
                "닉네임 변경",
                this.alias,
                alias
            ));
            this.alias = alias;
        }
        if (Objects.nonNull(bidType)) {
            eventList.add(EventEntity.of(
                "견적 구분 변경",
                Optional.ofNullable(this.bidType).map(ProjectBasicBidType::getName).orElse(null),
                bidType.getName()
            ));
            this.bidType = bidType;
        }
        if (Objects.nonNull(receptionManager) || Boolean.TRUE.equals(resetReceptionManager)) {
            eventList.add(EventEntity.of(
                "문의 접수자 변경",
                this.receptionManager,
                receptionManager
            ));
            this.receptionManager = receptionManager;
        }
        if (Objects.nonNull(salesManager) || Boolean.TRUE.equals(resetSalesManager)) {
            eventList.add(EventEntity.of(
                "영업 담당자 변경",
                this.salesManager,
                salesManager
            ));
            this.salesManager = salesManager;
        }
        if (Objects.nonNull(projectManager) || Boolean.TRUE.equals(resetProjectManager)) {
            eventList.add(EventEntity.of(
                "담당 PM 변경",
                this.projectManager,
                projectManager
            ));
            this.projectManager = projectManager;
        }
        if (Objects.nonNull(expectedMonth) || Boolean.TRUE.equals(resetExpectedMonth)) {
            eventList.add(EventEntity.of(
                "예상 착수 시기 변경",
                this.expectedMonth,
                expectedMonth,
                "yyyy-MM"
            ));
            this.expectedMonth = expectedMonth;
        }
        if (Objects.nonNull(requestedMonth) || Boolean.TRUE.equals(resetRequestedMonth)) {
            eventList.add(EventEntity.of(
                "요청 일정 변경",
                this.requestedMonth,
                requestedMonth,
                "yyyy-MM"
            ));
            this.requestedMonth = requestedMonth;
        }
        if (Objects.nonNull(isLh)) {
            eventList.add(EventEntity.of(
                "LH 여부 변경",
                this.isLh,
                isLh
            ));
            this.isLh = isLh;
        }

        return eventList;
    }

    /**
     * @migration 마이그레이션 용도 한정
     * @param code
     * @param name
     * @param bidType
     * @param receptionManager
     * @return
     */

    public static ProjectBasic of(
        @Nullable String code,
        String name,
        ProjectBasicBidType bidType,
        User receptionManager
    ) {
        ProjectBasic instance = new ProjectBasic();
        instance.name = name;
        instance.code = code;
        instance.bidType = bidType;
        instance.receptionManager = receptionManager;
        return instance;
    }

    /**
     * @migration 마이그레이션 용도 한정
     * @param fullName
     * @return
     */
    public ProjectBasic updateName(String name) {
        this.name = name;
        return this;
    }

    /**
     * @migration 마이그레이션 용도 한정
     * @param isLh
     * @return
     */
    public ProjectBasic updateIsLh(Boolean isLh) {
        this.isLh = isLh;
        return this;
    }
}
