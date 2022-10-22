package com.howoocast.hywtl_has.project_db.view;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_db.repository.NoMappedEntityFoundException;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import lombok.Getter;

@Getter
//@AllArgsConstructor
public class ProjectDbView {
    private Project project;
    private ProjectEstimate projectEstimate;
    private ProjectComplexSite projectComplexSite;
    private ProjectMemo projectMemo;

    public ProjectDbView(Object[] lists) {

        for (Object entity : lists) {
            if (entity == null) continue;

            if (entity instanceof Project) {
                this.project = (Project) entity;
            } else if (entity instanceof ProjectEstimate) {
                this.projectEstimate = (ProjectEstimate) entity;
            } else if (entity instanceof ProjectComplexSite) {
                this.projectComplexSite = (ProjectComplexSite) entity;
            } else if (entity instanceof ProjectMemo) {
                this.projectMemo = (ProjectMemo) entity;
            } else {
                throw new NoMappedEntityFoundException(
                        String.format("No member found for the requested type of %s", entity)
                );
            }
        }
    }
}
