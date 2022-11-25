package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

/**
 * 프로젝트 - 기본 정보 - 설계 개요
 */
@Slf4j
@Getter
@Entity
@Table(name = ProjectBasicDesign.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBasicDesign extends CustomEntity {

    public static final String KEY = "project_basic_design";

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    private String city1;

    private String city2;

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

    public List<EventEntity> update(
        @Nullable String city1,
        @Nullable String city2,
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
        List<EventEntity> eventList = new ArrayList<>();
        if (Objects.nonNull(city1)) {
            eventList.add(EventEntity.of(
                "시/도1 변경",
                this.city1,
                city1
            ));
            this.city1 = city1;
        }
        if (Objects.nonNull(city2)) {
            eventList.add(EventEntity.of(
                "시/도2 변경",
                this.city2,
                city2
            ));
            this.city2 = city2;
        }
        if (Objects.nonNull(address)) {
            eventList.add(EventEntity.of(
                "주소 변경",
                this.address,
                address
            ));
            this.address = address;
        }
        if (Objects.nonNull(complexCount)) {
            eventList.add(EventEntity.of(
                "단지 수 변경",
                this.complexCount,
                complexCount
            ));
            this.complexCount = complexCount;
        }
        if (Objects.nonNull(purpose1)) {
            eventList.add(EventEntity.of(
                "건물 용도1 변경",
                this.purpose1,
                purpose1
            ));
            this.purpose1 = purpose1;
        }
        if (Objects.nonNull(purpose2)) {
            eventList.add(EventEntity.of(
                "건물 용도2 변경",
                this.purpose2,
                purpose2
            ));
            this.purpose2 = purpose2;
        }
        if (Objects.nonNull(lotArea)) {
            eventList.add(EventEntity.of(
                "대지 면적 변경",
                this.lotArea,
                lotArea
            ));
            this.lotArea = lotArea;
        }
        if (Objects.nonNull(totalArea)) {
            eventList.add(EventEntity.of(
                "연면적 변경",
                this.totalArea,
                totalArea
            ));
            this.totalArea = totalArea;
        }
        if (Objects.nonNull(totalBuildingCount)) {
            eventList.add(EventEntity.of(
                "총 동 수 변경",
                this.totalBuildingCount,
                totalBuildingCount
            ));
            this.totalBuildingCount = totalBuildingCount;
        }
        if (Objects.nonNull(householdCount)) {
            eventList.add(EventEntity.of(
                "세대 수 변경",
                this.householdCount,
                householdCount
            ));
            this.householdCount = householdCount;
        }
        if (Objects.nonNull(maximumFloor)) {
            eventList.add(EventEntity.of(
                "최고 층 수 변경",
                this.maximumFloor,
                maximumFloor
            ));
            this.maximumFloor = maximumFloor;
        }
        if (Objects.nonNull(maximumHeight)) {
            eventList.add(EventEntity.of(
                "최고 높이 변경",
                this.maximumHeight,
                maximumHeight
            ));
            this.maximumHeight = maximumHeight;
        }
        return eventList;
    }
}
