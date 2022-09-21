package com.howoocast.hywtl_has.project.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Embedded;
import javax.persistence.Entity;
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
@Table(name = Project.KEY)
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


}
