package com.howoocast.hywtl_has.project_basic.view;

import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectBasicDesignView {

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
    private LocalDateTime modifiedAt;

    public static ProjectBasicDesignView assemble(ProjectBasicDesign source) {
        ProjectBasicDesignView target = new ProjectBasicDesignView();
        target.city = source.getCity();
        target.address = source.getAddress();
        target.complexCount = source.getComplexCount();
        target.purpose1 = source.getPurpose1();
        target.purpose2 = source.getPurpose2();
        target.lotArea = source.getLotArea();
        target.totalArea = source.getTotalArea();
        target.totalBuildingCount = source.getTotalBuildingCount();
        target.householdCount = source.getHouseholdCount();
        target.maximumFloor = source.getMaximumFloor();
        target.maximumHeight = source.getMaximumHeight();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }

}
