package com.howoocast.hywtl_has.estimate_template.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = EstimateTemplate.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EstimateTemplate extends CustomEntity {

    public static final String KEY = "estimate_template";

    /**
     * 용역 항목명
     */
    @NotBlank
    @Column(nullable = false)
    private String title;

    /**
     * 실험 타입
     */
    @Enumerated(EnumType.STRING)
    private TestType testType;

    /**
     * 정렬 순서
     */
    @NotNull
    @Column(nullable = false)
    private Integer seq;

    /**
     * 세부 항목 목록
     */
    @OneToMany(cascade = CascadeType.ALL)
    private List<EstimateTemplateDetail> detailList;

    public static EstimateTemplate of(
        String title,
        TestType testType,
        Integer seq,
        List<EstimateTemplateDetail> detailList
    ) {
        EstimateTemplate instance = new EstimateTemplate();
        instance.title = title;
        instance.testType = testType;
        instance.seq = seq;
        instance.detailList = detailList;
        return instance;
    }

    public void change(
        String title,
        TestType testType,
        List<EstimateTemplateDetail> detailList
    ) {
        this.title = title;
        this.testType = testType;
        this.detailList = detailList;
    }


    public void changeSeq(Integer seq) {
        this.seq = seq;
    }
}
