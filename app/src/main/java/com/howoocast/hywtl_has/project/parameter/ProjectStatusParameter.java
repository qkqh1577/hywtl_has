package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.common.ProjectStatus;
import com.howoocast.hywtl_has.project.domain.Project;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ProjectStatusParameter {

    @NotNull(message = "project-basic.status.not-null")
    private ProjectStatus status;

    public ProjectBasicStatusChangeBuilder statusChangeBuilder() {
        return new ProjectBasicStatusChangeBuilder(this);
    }

    @RequiredArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ProjectBasicStatusChangeBuilder {

        private final ProjectStatusParameter params;

        public void action(Project instance) {
            instance.changeStatus(params.status);
        }

    }
}
