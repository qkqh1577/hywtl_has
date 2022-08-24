package com.howoocast.hywtl_has.project_memo.parameter;

import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectMemoParameter {

    @NotBlank(message = ProjectMemo.KEY + ".description.not_blank")
    private String description;
    @NotNull(message = ProjectMemo.KEY + ".category.not_null")
    private ProjectMemoCategory category;

    // TODO: notificant
}
