package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;

/**
 * 프로젝트 - 기본 정보 - 수주 기여자 - 사외
 */
@Slf4j
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("EXTERNAL")
public class ProjectBasicExternalContributor extends ProjectBasicContributor {

    public static final String KEY = "project_basic_external_contributor";

    /**
     * 기여자 소속 업체
     */
    @ManyToOne
    private Business business;

    /**
     * 기여자
     */
    @OneToOne
    @JoinColumn(name = "business_manager_id")
    private BusinessManager businessManager;

    public static ProjectBasicExternalContributor of(
        Project project
    ) {
        ProjectBasicExternalContributor instance = new ProjectBasicExternalContributor();
        instance.project = project;
        return instance;
    }

    public List<EventEntity> update(
        @Nullable Double rate,
        @Nullable Business business,
        @Nullable BusinessManager businessManager
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
                "업체 변경",
                this.business,
                business
            ));
            this.business = business;
        }
        if (Objects.nonNull(rate)) {
            eventList.add(EventEntity.of(
                "기여자 변경",
                this.businessManager,
                businessManager
            ));
            this.businessManager = businessManager;
        }

        return eventList;
    }
}
