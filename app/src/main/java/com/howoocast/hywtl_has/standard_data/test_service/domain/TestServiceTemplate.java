package com.howoocast.hywtl_has.standard_data.test_service.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
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
@Table(name = "test_service_template")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update test_service_template set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TestServiceTemplate extends CustomEntity {

    @NotBlank
    @Column(nullable = false)
    private String title; // 용역 항목명

    @NotBlank
    @Column(nullable = false)
    private String testType; // 실험 타입

    @NotNull
    @Column(nullable = false)
    private Integer seq; // 정렬 순서

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL)
    @OrderBy("seq asc")
    private List<TestServiceDetailTemplate> detailList; // 세부 항목 목록


    public static TestServiceTemplate of(
        String title,
        String testType,
        Integer seq,
        List<TestServiceDetailTemplate> detailList
    ) {
        TestServiceTemplate instance = new TestServiceTemplate();
        instance.title = title;
        instance.testType = testType;
        instance.seq = seq;
        instance.detailList = detailList;
        return instance;
    }

    public void change(
        String title,
        String testType,
        List<TestServiceDetailTemplate> detailList
    ) {
        this.title = title;
        this.testType = testType;
        this.detailList = detailList;
    }

    public void changeSeq(Integer seq) {
        this.seq = seq;
    }
}
