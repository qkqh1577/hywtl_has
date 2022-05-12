package com.howoocast.hywtl_has.project_estimate.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
@Table(name = "project_estimate")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_estimate set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimate extends CustomEntity {

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "id")
    private Project project;

    private LocalDate receivedDate; // 견적 의뢰 접수일

    private String figureLevel; // 모형 제작 난이도

    private String testLevel; // 실험 난이도

    private String reportLevel; // 평가 난이도

    public static ProjectEstimate of(
        Project project,
        LocalDate receivedDate,
        String figureLevel,
        String testLevel,
        String reportLevel
    ) {
        ProjectEstimate instance = new ProjectEstimate();
        instance.project = project;
        instance.id = project.getId();
        instance.change(
            receivedDate,
            figureLevel,
            testLevel,
            reportLevel
        );
        return instance;
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
    }
}