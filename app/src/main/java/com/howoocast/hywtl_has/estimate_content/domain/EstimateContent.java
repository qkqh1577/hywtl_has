package com.howoocast.hywtl_has.estimate_content.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = EstimateContent.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EstimateContent extends CustomEntity {

    public static final String KEY = "estimate_content";

    /**
     * 제목
     */
    @NotBlank
    @Column(nullable = false)
    private String name;

    /**
     * 실험 타입
     */
    @ElementCollection
    private List<TestType> testTypeList;

    /**
     * 문구
     */
    @ElementCollection
    private List<String> detailList;

    public static EstimateContent of(
        String name,
        List<TestType> testTypeList,
        List<String> detailList
    ) {
        EstimateContent instance = new EstimateContent();
        instance.name = name;
        instance.testTypeList = testTypeList;
        instance.detailList = detailList;
        return instance;
    }

    public void change(
        String name,
        List<String> detailList
    ) {
        this.name = name;
        this.detailList = detailList;
    }
}
