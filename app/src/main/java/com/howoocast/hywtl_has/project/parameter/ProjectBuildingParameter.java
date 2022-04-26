package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.common.parameter.AddressParameter;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBuildingParameter {

    @NotNull(message = "project.building.address.not-null")
    private AddressParameter address;

    private String purpose1;

    private String purpose2;

    private Double lotArea;

    private Double totalArea;

    private Integer buildingCount;

    private Integer householdCount;

    private Integer floorCount;

    private Integer baseCount;
}
