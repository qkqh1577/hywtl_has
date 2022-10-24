package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;

/**
 * 프로젝트 - 기본 정보 - 수주 기여자 - 사내
 */
@Slf4j
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("INTERNAL")
public class ProjectBasicInternalContributor extends ProjectBasicContributor {

    public static final String KEY = "project_basic_internal_contributor";


    /**
     * 내부 기여자
     */
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public static ProjectBasicInternalContributor of(
        Project project
    ) {
        ProjectBasicInternalContributor instance = new ProjectBasicInternalContributor();
        instance.project = project;
        return instance;
    }

    public List<EventEntity> update(
        @Nullable Double rate,
        @Nullable User user
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        if (Objects.nonNull(rate)) {
            eventList.add(EventEntity.of(
                "기여도 변경",
                this.rate,
                rate
            ));
            this.rate = rate;
        }
        if (Objects.nonNull(rate)) {
            eventList.add(EventEntity.of(
                "기여자 변경",
                this.user,
                user
            ));
            this.user = user;
        }
        return eventList;
    }

}
