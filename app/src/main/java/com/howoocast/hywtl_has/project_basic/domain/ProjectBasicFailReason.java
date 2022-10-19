package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.BidDTO;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.List;
import java.util.Objects;
import javax.annotation.Nullable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = ProjectBasicFailReason.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBasicFailReason extends BidDTO {

    public static final String KEY = "project_basic_fail_reason";

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    private Business win;

    @NotBlank
    @Column(nullable = false)
    private String reason;

    public static ProjectBasicFailReason of(
        Project project
    ) {
        ProjectBasicFailReason instance = new ProjectBasicFailReason();
        instance.project = project;
        return instance;
    }

    public List<EventEntity> update(
        @Nullable Business win,
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String expectedDuration,
        @Nullable String reason
    ) {
        List<EventEntity> eventList = super.update(
            testAmount,
            reviewAmount,
            totalAmount,
            expectedDuration
        );
        if (Objects.nonNull(win)) {
            eventList.add(EventEntity.of(
                "수주 업체 변경",
                this.win,
                win
            ));
            this.win = win;
        }
        if (Objects.nonNull(reason)) {
            eventList.add(EventEntity.of(
                "원인 변경",
                this.reason,
                reason
            ));
            this.reason = reason;
        }
        return eventList;
    }
}
