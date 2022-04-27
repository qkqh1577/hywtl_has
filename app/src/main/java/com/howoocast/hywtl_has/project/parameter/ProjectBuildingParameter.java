package com.howoocast.hywtl_has.project.parameter;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBuildingParameter {

    // TODO: 주소 컴포넌트 개발 이후 변경
    @NotNull(message = "project.building.address.not-null")
    private String address;

    private String purpose1;

    private String purpose2;

    private Double lotArea;

    private Double totalArea;

    private Integer buildingCount;

    private Integer householdCount;

    private Integer floorCount;

    private Integer baseCount;
}
