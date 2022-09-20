package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.Objects;
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
import org.springframework.lang.Nullable;

/**
 * 프로젝트 - 기본 정보 - 설계 개요
 */
@Slf4j
@Getter
@Entity
@Table(name = ProjectBasicDesign.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectBasicDesign.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBasicDesign extends CustomEntity {

    public static final String KEY = "project_basic_design";

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    private String city;

    private String address;

    private Integer complexCount;

    private String purpose1;

    private String purpose2;

    private Double lotArea;

    private Double totalArea;

    private Integer totalBuildingCount;

    private Integer householdCount;

    private Integer maximumFloor;

    private Double maximumHeight;

    public static ProjectBasicDesign of(
        Project project
    ) {
        ProjectBasicDesign instance = new ProjectBasicDesign();
        instance.project = project;
        return instance;
    }

    public void update(
        @Nullable String city,
        @Nullable String address,
        @Nullable Integer complexCount,
        @Nullable String purpose1,
        @Nullable String purpose2,
        @Nullable Double lotArea,
        @Nullable Double totalArea,
        @Nullable Integer totalBuildingCount,
        @Nullable Integer householdCount,
        @Nullable Integer maximumFloor,
        @Nullable Double maximumHeight
    ) {
        if (Objects.nonNull(city)) {
            this.city = city;
        }
        if (Objects.nonNull(address)) {
            this.address = address;
        }
        if (Objects.nonNull(complexCount)) {
            this.complexCount = complexCount;
        }
        if (Objects.nonNull(purpose1)) {
            this.purpose1 = purpose1;
        }
        if (Objects.nonNull(purpose2)) {
            this.purpose2 = purpose2;
        }
        if (Objects.nonNull(lotArea)) {
            this.lotArea = lotArea;
        }
        if (Objects.nonNull(totalArea)) {
            this.totalArea = totalArea;
        }
        if (Objects.nonNull(totalBuildingCount)) {
            this.totalBuildingCount = totalBuildingCount;
        }
        if (Objects.nonNull(householdCount)) {
            this.householdCount = householdCount;
        }
        if (Objects.nonNull(maximumFloor)) {
            this.maximumFloor = maximumFloor;
        }
        if (Objects.nonNull(maximumHeight)) {
            this.maximumHeight = maximumHeight;
        }
    }
}
