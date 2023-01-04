package com.howoocast.hywtl_has.project.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = Project.KEY, indexes = {
    @Index(name = "idx_project_code", columnList = "code", unique = true)
})
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project extends CustomEntity {

    public static final String KEY = "project";

    @NotNull
    @Embedded
    private ProjectBasic basic;

    @NotNull
    @Embedded
    private ProjectStatus status;

    private Boolean isFavorite = false;

    public static Project of(
            @Nullable String code,
            String name,
            String alias,
            ProjectBasicBidType bidType,
            User receptionManager,
            ProjectProgressStatus progressStatus
    ) {
        Project instance = new Project();
        instance.basic = ProjectBasic.of(
                code,
                name,
                alias,
                bidType,
                receptionManager
        );
        instance.status = ProjectStatus.of(
                progressStatus
        );
        return instance;
    }

    public void update(Boolean isFavorite) {
        this.isFavorite = isFavorite;
    }

    /**
     * @migration 마이그레이션 용도 한정
     * @param code
     * @param name
     * @param bidType
     * @param receptionManager
     * @param status
     * @return
     */
    public static Project of(
        @Nullable String code,
        String name,
        ProjectBasicBidType bidType,
        User receptionManager,
        ProjectStatus status
    ) {
        Project instance = new Project();
        instance.basic = ProjectBasic.of(
            code,
            name,
            bidType,
            receptionManager
        );
        instance.status = status;
        return instance;
    }

    public static Project of(
        @Nullable String code,
        String name,
        ProjectBasicBidType bidType,
        User receptionManager,
        ProjectProgressStatus progressStatus
    ) {
        Project instance = new Project();
        instance.basic = ProjectBasic.of(
            code,
            name,
            bidType,
            receptionManager
        );
        instance.status = ProjectStatus.of(
            progressStatus
        );
        return instance;
    }

    /**
     * @migration
     * @param date
     * @return
     */
    public Project updateCreatedAt(LocalDate date) {
        super.setCreatedAt(date);
        return this;
    }
}
