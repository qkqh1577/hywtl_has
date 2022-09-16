package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = ProjectEstimateTemplateDetail.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectEstimateTemplateDetail.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateTemplateDetail extends CustomEntity {

    public static final String KEY = "project_estimate_template_detail";

    /**
     * 세부 항목 문구 목록
     */
    @ElementCollection
    private List<String> titleList;

    /**
     * 단위
     */
    @NotBlank
    @Column(nullable = false)
    private String unit;

    /**
     * 수량
     */
    @NotNull
    @Column(nullable = false)
    private Long testCount;


    /**
     * 단가
     */
    @NotNull
    @Column(nullable = false)
    private Long unitAmount;

    /**
     * 총액
     */
    @NotNull
    @Column(nullable = false)
    private Long totalAmount;

    /**
     * 금액 사용 여부
     */
    @NotNull
    @Column(nullable = false)
    private Boolean inUse;

    /**
     * 비고
     */
    private String note;

    public static ProjectEstimateTemplateDetail of(
        List<String> titleList,
        String unit,
        Long testCount,
        Long unitAmount,
        Long totalAmount,
        Boolean inUse,
        String note
    ) {
        ProjectEstimateTemplateDetail instance = new ProjectEstimateTemplateDetail();
        instance.titleList = titleList;
        instance.unit = unit;
        instance.testCount = testCount;
        instance.unitAmount = unitAmount;
        instance.totalAmount = totalAmount;
        instance.inUse = inUse;
        instance.note = note;
        return instance;
    }
}
