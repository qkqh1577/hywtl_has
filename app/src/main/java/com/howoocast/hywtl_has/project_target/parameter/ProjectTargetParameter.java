package com.howoocast.hywtl_has.project_target.parameter;

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetParameter {

    @NotBlank(message = "project_target.code.not_blank")
    private String code;

    private List<String> testList;

    private String note;

    @NotEmpty(message = "project_target.detail_list.not_empty")
    private List<ProjectTargetDetailParameter> detailList;

}
