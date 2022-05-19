package com.howoocast.hywtl_has.project_target.parameter;

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetParameter {

    @NotBlank(message = "project-target.code.not-blank")
    private String code;

    private List<String> testList;

    private String memo;

    @NotEmpty(message = "project-target.detail-list.not-empty")
    private List<ProjectTargetDetailParameter> detailList;

}
