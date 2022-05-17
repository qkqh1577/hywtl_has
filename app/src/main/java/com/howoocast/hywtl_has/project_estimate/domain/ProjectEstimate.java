package com.howoocast.hywtl_has.project_estimate.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimate {

    private LocalDate receivedDate; // 견적 의뢰 접수일

    private String figureLevel; // 모형 제작 난이도

    private String testLevel; // 실험 난이도

    private String reportLevel; // 평가 난이도

    @JsonManagedReference
    @OneToMany(mappedBy = "project")
    @OrderBy("createdAt desc")
    private List<ProjectEstimateSheet> sheetList; //시스템 견적서 목록

    @NotNull
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    public static ProjectEstimate of() {
        return new ProjectEstimate();
    }

    public void change(
        LocalDate receivedDate,
        String figureLevel,
        String testLevel,
        String reportLevel
    ) {
        this.receivedDate = receivedDate;
        this.figureLevel = figureLevel;
        this.testLevel = testLevel;
        this.reportLevel = reportLevel;
        this.modifiedAt = LocalDateTime.now();
    }
}