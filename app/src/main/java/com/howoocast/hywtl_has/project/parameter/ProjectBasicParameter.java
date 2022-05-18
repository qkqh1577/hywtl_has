package com.howoocast.hywtl_has.project.parameter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicParameter {

    @NotBlank(message = "project-basic.name.not-blank")
    private String name;

    @NotBlank(message = "project-basic.code.not-blank")
    private String code;

    private String alias;

    @NotNull(message = "project-basic.sales-manager-id.not-null")
    private Long salesManagerId;

    @NotNull(message = "project-basic.project-manager-id.not-null")
    private Long projectManagerId;

    private String address;

    private String purpose1;

    private String purpose2;

    private Double lotArea;

    private Double totalArea;

    private Integer buildingCount;

    private Integer householdCount;

    private Integer floorCount;

    private Integer baseCount;

    private String clientName;

    private Boolean isClientLH;

    private String clientManager;

    private String clientPhone;

    private String clientEmail;
}

