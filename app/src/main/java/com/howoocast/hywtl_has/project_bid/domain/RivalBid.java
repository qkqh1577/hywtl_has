package com.howoocast.hywtl_has.project_bid.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
@Table(name = RivalBid.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RivalBid extends BidDTO {

    public static final String KEY = "project_rival_bid";

    @OneToOne
    @JoinColumn(name = Business.KEY + "_id")
    private Business business;

    @ManyToOne
    private Project project;


    public static RivalBid of(
        Project project
    ) {

        RivalBid instance = new RivalBid();
        instance.project = project;
        return instance;
    }

    public void update(
        @Nullable Business business,
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String expectedDuration
    ) {
        super.update(
            testAmount,
            reviewAmount,
            totalAmount,
            expectedDuration
        );
        if (Objects.nonNull(business)) {
            this.business = business;
        }

    }

}
