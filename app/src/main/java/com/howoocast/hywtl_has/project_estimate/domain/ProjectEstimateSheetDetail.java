package com.howoocast.hywtl_has.project_estimate.domain;

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
@Table(name = "project_estimate_sheet_detail")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_estimate_sheet_detail set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateSheetDetail extends CustomEntity {

    @NotBlank
    @Column(nullable = false)
    private String title; // 용역 항목 정보

    @NotEmpty
    @ElementCollection
    private List<String> subTitleList; // 용역 항목 부가 정보

    @NotNull
    @Column(nullable = false)
    private Integer seq;

    @NotBlank
    @Column(nullable = false)
    private String unit; // 단위

    @NotNull
    @Column(nullable = false)
    private Integer count; // 수량

    @NotNull
    @Column(nullable = false)
    private Long unitPrice; // 단가

    @NotNull
    @Column(nullable = false)
    private Long totalPrice; // 총 금액

    @NotNull
    @Column(nullable = false)
    private Boolean isIncluded; // 금액 사용 여부 (총액에 포함 여부)

    private String memo; // 비고

    public static ProjectEstimateSheetDetail of(
        String title,
        List<String> subTitleList,
        Integer seq,
        String unit,
        Integer count,
        Long unitPrice,
        Long totalPrice,
        Boolean isIncluded,
        String memo
    ) {
        ProjectEstimateSheetDetail instance = new ProjectEstimateSheetDetail();
        instance.title = title;
        instance.subTitleList = subTitleList;
        instance.seq = seq;
        instance.unit = unit;
        instance.count = count;
        instance.unitPrice = unitPrice;
        instance.totalPrice = totalPrice;
        instance.isIncluded = isIncluded;
        instance.memo = memo;
        return instance;
    }
}
