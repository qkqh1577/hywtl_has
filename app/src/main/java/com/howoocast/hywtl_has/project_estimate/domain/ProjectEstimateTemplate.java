package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
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
@Table(name = ProjectEstimateTemplate.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateTemplate extends CustomEntity {

    public static final String KEY = "project_estimate_template";

    /**
     * 용역 항목명
     */
    @NotBlank
    @Column(nullable = false)
    private String title;

    /**
     * 실험 타입
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TestType testType;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectEstimateTemplateDetail> detailList;

    public static ProjectEstimateTemplate of(
        String title,
        TestType testType,
        List<ProjectEstimateTemplateDetail> detailList
    ) {
        ProjectEstimateTemplate instance = new ProjectEstimateTemplate();
        instance.title = title;
        instance.testType = testType;
        instance.detailList = detailList;
        return instance;
    }
}
