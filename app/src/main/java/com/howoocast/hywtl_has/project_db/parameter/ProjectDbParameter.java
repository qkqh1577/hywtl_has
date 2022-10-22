package com.howoocast.hywtl_has.project_db.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDbParameter {
    private Boolean estimate = Boolean.FALSE;
    private Boolean complexSite = Boolean.FALSE;
    private Boolean bid = Boolean.FALSE;
    private Boolean memo = Boolean.FALSE;

    @Override
    public String toString() {
        return "ProjectDbParameter{" +
                "estimate=" + estimate +
                ", complexSite=" + complexSite +
                ", bid=" + bid +
                ", memo=" + memo +
                '}';
    }
}
