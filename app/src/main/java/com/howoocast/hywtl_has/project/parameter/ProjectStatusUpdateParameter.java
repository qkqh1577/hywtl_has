package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.domain.ProjectContractStatus;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateStatus;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectStatusUpdateParameter {


    private ProjectProgressStatus progressStatus;

    private ProjectEstimateExpectation estimateExpectation;

    private ProjectEstimateStatus estimateStatus;

    private ProjectContractStatus contractStatus;

}
