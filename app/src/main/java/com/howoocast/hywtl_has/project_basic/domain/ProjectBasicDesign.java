package com.howoocast.hywtl_has.project_basic.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
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
@Table(name = ProjectBasicDesign.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectBasicDesign.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBasicDesign extends CustomEntity {

    public static final String KEY = "project_basic_design";

    @OneToOne
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
        Project project,
        String city,
        String address,
        Integer complexCount,
        String purpose1,
        String purpose2,
        Double lotArea,
        Double totalArea,
        Integer totalBuildingCount,
        Integer householdCount,
        Integer maximumFloor,
        Double maximumHeight
    ) {
        ProjectBasicDesign instance = new ProjectBasicDesign();
        instance.project = project;
        instance.id = project.getId();
        instance.change(
            city,
            address,
            complexCount,
            purpose1,
            purpose2,
            lotArea,
            totalArea,
            totalBuildingCount,
            householdCount,
            maximumFloor,
            maximumHeight
        );
        return instance;
    }

    public void change(
        String city,
        String address,
        Integer complexCount,
        String purpose1,
        String purpose2,
        Double lotArea,
        Double totalArea,
        Integer totalBuildingCount,
        Integer householdCount,
        Integer maximumFloor,
        Double maximumHeight
    ) {
        this.city = city;
        this.address = address;
        this.complexCount = complexCount;
        this.purpose1 = purpose1;
        this.purpose2 = purpose2;
        this.lotArea = lotArea;
        this.totalArea = totalArea;
        this.totalBuildingCount = totalBuildingCount;
        this.householdCount = householdCount;
        this.maximumFloor = maximumFloor;
        this.maximumHeight = maximumHeight;
    }

}
