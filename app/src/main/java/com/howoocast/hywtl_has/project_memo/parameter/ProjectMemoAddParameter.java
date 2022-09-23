package com.howoocast.hywtl_has.project_memo.parameter;

import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectMemoAddParameter {

    @NotBlank(message = ProjectMemo.KEY + ".description.not_blank")
    private String description;

    @NotNull(message = ProjectMemo.KEY + ".category.not_null")
    private ProjectMemoCategory category;

    private List<Long> attendanceList;
}
