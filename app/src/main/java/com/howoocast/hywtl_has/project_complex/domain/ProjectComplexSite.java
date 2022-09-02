package com.howoocast.hywtl_has.project_complex.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
@Table(name = ProjectComplexSite.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectComplexSite.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectComplexSite extends CustomEntity {

    public static final String KEY = "project_complex_site";

    private String name;

    private Boolean withEnvironmentTest;
    private String estimateFigureDifficulty;
    private String figureDifficulty;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToOne
    private Project project;

    public static ProjectComplexSite of(
        @NotNull Project project
    ) {
        ProjectComplexSite instance = new ProjectComplexSite();
        instance.project = project;
        return instance;
    }

    public void update(
        String name,
        Boolean withEnvironmentTest,
        String estimateFigureDifficulty,
        String figureDifficulty,
        User manager
    ) {
        if (Objects.nonNull(name) && !name.isEmpty()) {
            this.name = name;
        }
        if (Objects.nonNull(withEnvironmentTest)) {
            this.withEnvironmentTest = withEnvironmentTest;
        }
        if (Objects.nonNull(estimateFigureDifficulty) && !estimateFigureDifficulty.isEmpty()) {
            this.estimateFigureDifficulty = estimateFigureDifficulty;
        }
        if (Objects.nonNull(figureDifficulty) && !figureDifficulty.isEmpty()) {
            this.figureDifficulty = figureDifficulty;
        }
        if (Objects.nonNull(manager)) {
            this.manager = manager;
        }
    }
}
