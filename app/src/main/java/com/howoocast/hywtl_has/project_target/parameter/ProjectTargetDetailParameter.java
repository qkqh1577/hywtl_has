package com.howoocast.hywtl_has.project_target.parameter;

import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetDetailParameter {

    private Long id;

    @NotBlank(message = "project-target-detail.building-name.not-blank")
    private String buildingName;

    private List<String> testList;

    private String memo;
}