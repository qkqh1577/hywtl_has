package com.howoocast.hywtl_has.estimate_template.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
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
@Table(name = EstimateTemplateDetail.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + EstimateTemplateDetail.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EstimateTemplateDetail extends CustomEntity {

    public static final String KEY = "estimate_template_detail";

    /**
     * 세부 항목 문구 목록
     */
    @NotEmpty
    @ElementCollection
    private List<String> titleList;

    /**
     * 단위
     */
    @NotBlank
    @Column(nullable = false)
    private String unit;

    /**
     * 단가
     */
    @NotNull
    @Column(nullable = false)
    private Long unitPrice;

    /**
     * 비고
     */
    private String note;

    /**
     * 정렬 순서
     */
    @NotNull
    @Column(nullable = false)
    private Integer seq;


    public static EstimateTemplateDetail of(
        List<String> titleList,
        String unit,
        Long unitPrice,
        String note,
        Integer seq
    ) {
        EstimateTemplateDetail instance = new EstimateTemplateDetail();
        instance.titleList = titleList;
        instance.unit = unit;
        instance.unitPrice = unitPrice;
        instance.note = note;
        instance.seq = seq;
        return instance;
    }

    public void change(
        List<String> titleList,
        String unit,
        Long unitPrice,
        String note,
        Integer seq
    ) {
        this.titleList = titleList;
        this.unit = unit;
        this.unitPrice = unitPrice;
        this.note = note;
        this.seq = seq;
    }
}
