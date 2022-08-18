package com.howoocast.hywtl_has.project.domain;

import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
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
    @NotBlank
    @Column(nullable = false)
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
    private ProjectEstimateType estimateType;

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
    private Boolean isLh;

    public static ProjectBasic of(
        @Nullable String code,
        String name,
        String alias,
        ProjectEstimateType estimateType,
        User receptionManager
    ) {
        ProjectBasic instance = new ProjectBasic();
        instance.name = name;
        instance.code = code;
        instance.alias = alias;
        instance.estimateType = estimateType;
        instance.receptionManager = receptionManager;
        return instance;
    }

    public void changeCode(String code) {
        this.code = code;
    }

    public void change(
        String name,
        String code,
        String alias,
        User salesManager,
        User projectManager
    ) {
        this.name = name;
        this.code = code;
        this.alias = alias;
        this.salesManager = salesManager;
        this.projectManager = projectManager;
    }

}
