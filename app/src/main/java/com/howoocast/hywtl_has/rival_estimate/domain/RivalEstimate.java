package com.howoocast.hywtl_has.rival_estimate.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.BidDTO;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = RivalEstimate.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RivalEstimate extends BidDTO {

    public static final String KEY = "project_rival_estimate";

    @ManyToOne
    private Business business;

    @ManyToOne
    private Project project;

    public static RivalEstimate of(
        Project project
    ) {

        RivalEstimate instance = new RivalEstimate();
        instance.project = project;
        return instance;
    }

    public List<EventEntity> update(
        @Nullable Business business,
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String expectedDuration
    ) {
        List<EventEntity> eventList = super.update(
            testAmount,
            reviewAmount,
            totalAmount,
            expectedDuration
        );
        if (Objects.nonNull(business)) {
            eventList.add(EventEntity.of(
                "타 업체 변경",
                this.business,
                business
            ));
            this.business = business;
        }
        return eventList;
    }
}
