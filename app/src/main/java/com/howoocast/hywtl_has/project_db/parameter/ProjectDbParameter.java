package com.howoocast.hywtl_has.project_db.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDbParameter {
    private Boolean projectEstimate = Boolean.FALSE;
    private Boolean projectComplexSite = Boolean.FALSE;
    private Boolean projectMemo = Boolean.FALSE;
    private Boolean projectBid = Boolean.FALSE;

    @Override
    public String toString() {
        return "ProjectDbParameter{" +
                "estimate=" + projectEstimate +
                ", complexSite=" + projectComplexSite +
                ", bid=" + projectBid +
                ", memo=" + projectMemo +
                '}';
    }
}
