package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectCustomEstimateComplexSite.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectCustomEstimateComplexSite.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectCustomEstimateComplexSite extends CustomEntity {

    public static final String KEY = "project_custom_estimate_complex_site";

    private String name;
    private Boolean withEnvironmentTest;
    private String estimateFigureDifficulty;
    private String figureDifficulty;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToOne
    private ProjectCustomEstimate estimate;

    public static ProjectCustomEstimateComplexSite of(
        ProjectCustomEstimate estimate
    ) {
        ProjectCustomEstimateComplexSite instance = new ProjectCustomEstimateComplexSite();
        instance.estimate = estimate;
        return instance;
    }

    public void change(
        @Nullable String name,
        @Nullable Boolean withEnvironmentTest,
        @Nullable String estimateFigureDifficulty,
        @Nullable String figureDifficulty,
        @Nullable User manager
    ) {
        this.name = name;
        this.withEnvironmentTest = withEnvironmentTest;
        this.estimateFigureDifficulty = estimateFigureDifficulty;
        this.figureDifficulty = figureDifficulty;
        this.manager = manager;
    }
}
