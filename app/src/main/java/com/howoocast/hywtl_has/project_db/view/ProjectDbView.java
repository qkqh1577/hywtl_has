package com.howoocast.hywtl_has.project_db.view;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.view.ProjectView;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_bid.view.ProjectBidView;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_complex.view.ProjectComplexSiteView;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_contract.view.ProjectContractView;
import com.howoocast.hywtl_has.project_db.repository.NoMappedEntityFoundException;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.view.ProjectMemoView;
import lombok.Getter;

@Getter
//@AllArgsConstructor
public class ProjectDbView {
    private ProjectView project;
    private ProjectEstimateView projectEstimate;
    private ProjectComplexSiteView projectComplexSite;
    private ProjectMemoView projectMemo;
    private ProjectBidView projectBid;
    private ProjectContractView projectContract;

    public ProjectDbView(Object[] lists) {

        for (Object entity : lists) {
            if (entity == null) continue;

            if (entity instanceof Project) {
                this.project = ProjectView.assemble((Project) entity);
            } else if (entity instanceof ProjectEstimate) {
                this.projectEstimate = ProjectEstimateView.assemble((ProjectEstimate) entity);
            } else if (entity instanceof ProjectComplexSite) {
                this.projectComplexSite = ProjectComplexSiteView.assemble((ProjectComplexSite) entity);
            } else if (entity instanceof ProjectMemo) {
                this.projectMemo = ProjectMemoView.assemble((ProjectMemo) entity);
            } else if (entity instanceof ProjectBid) {
                this.projectBid = ProjectBidView.assemble((ProjectBid) entity);
            } else if (entity instanceof ProjectContract) {
                this.projectContract = ProjectContractView.assemble((ProjectContract) entity);
            } else {
                throw new NoMappedEntityFoundException(
                        String.format("No member found for the requested type of %s", entity)
                );
            }
        }
    }
}
