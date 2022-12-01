package com.howoocast.hywtl_has.project_memo.parameter;

import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
public class ProjectMemoChangeParameter {

    @NotBlank(message = ProjectMemo.KEY + ".description.not_blank")
    private String description;
    @NotNull(message = ProjectMemo.KEY + ".category.not_null")
    private ProjectMemoCategory category;
    @Nullable
    private Boolean isOpenedAttendanceList;
}
