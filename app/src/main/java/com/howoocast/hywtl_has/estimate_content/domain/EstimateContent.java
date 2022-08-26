package com.howoocast.hywtl_has.estimate_content.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
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
@Table(name = EstimateContent.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + EstimateContent.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
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
    @NotEmpty
    @ElementCollection
    private List<TestType> testTypeList;

    /**
     * 문구
     */
    @NotEmpty
    @ElementCollection
    private List<String> detailList;

    /**
     * 정렬 순서
     */
    @NotNull
    @Column(nullable = false)
    private Long seq;

    public static EstimateContent of(
        String name,
        List<TestType> testTypeList,
        List<String> detailList,
        Long seq
    ) {
        EstimateContent instance = new EstimateContent();
        instance.change(
            name,
            testTypeList,
            detailList
        );
        instance.changeSeq(seq);
        return instance;
    }

    public void change(
        String name,
        List<TestType> testTypeList,
        List<String> detailList
    ) {
        this.name = name;
        this.testTypeList = testTypeList;
        this.detailList = detailList;
    }

    public void changeSeq(
        Long seq
    ) {
        this.seq = seq;
    }

}
