package com.howoocast.hywtl_has.estimate_template.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = EstimateTemplateDetail.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EstimateTemplateDetail extends CustomEntity {

    public static final String KEY = "estimate_template_detail";

    /**
     * 세부 항목 문구 목록
     */
    @ElementCollection
    private List<String> titleList;

    /**
     * 단위
     */
    @Enumerated(EnumType.STRING)
    private EstimateUnit unit;

    /**
     * 단가
     */
    @NotNull
    @Column(nullable = false)
    private Long unitAmount;

    @NotNull
    @Column(nullable = false)
    private Boolean inUse;

    /**
     * 비고
     */
    private String note;

    public static EstimateTemplateDetail of(
        List<String> titleList,
        EstimateUnit unit,
        Long unitAmount,
        Boolean inUse,
        String note
    ) {
        EstimateTemplateDetail instance = new EstimateTemplateDetail();
        instance.titleList = titleList;
        instance.unit = unit;
        instance.unitAmount = unitAmount;
        instance.inUse = inUse;
        instance.note = note;
        return instance;
    }
}
