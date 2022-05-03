package com.howoocast.hywtl_has.project.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectOrder {

    private Long amount; // 총 수주 금액

    private LocalDate receivedDate; // 수주일

    private LocalDate beginDate; // 착수일

    private LocalDate closeDate; // 마감일

    private Boolean isOnGoing; // 수주 적용 여부

    @NotNull
    @Column(nullable = false)
    private LocalDateTime updatedTime;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////

    //////////////////////////////////
    //// finder
    //////////////////////////////////

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        Long amount,
        LocalDate receivedDate,
        LocalDate beginDate,
        LocalDate closeDate,
        Boolean isOnGoing
    ) {
        this.amount = amount;
        this.receivedDate = receivedDate;
        this.beginDate = beginDate;
        this.closeDate = closeDate;
        this.isOnGoing = isOnGoing;
        this.updatedTime = LocalDateTime.now();
    }
}
