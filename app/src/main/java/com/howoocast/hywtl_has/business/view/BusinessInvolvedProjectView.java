package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class BusinessInvolvedProjectView {

    private Long id;
    private String code;
    private String name;
    private ProjectInvolvedType involvedType;
    private String manager;
    private LocalDate beginDate;
    private LocalDate closeDate;

    public static BusinessInvolvedProjectView assemble(ProjectBasicBusiness source) {

        BusinessInvolvedProjectView target = new BusinessInvolvedProjectView();
        target.id = source.getProject().getId();
        target.code = source.getProject().getBasic().getCode();
        target.name = source.getProject().getBasic().getName();
        target.involvedType = source.getInvolvedType();
        target.manager = source.getBusinessManager().getName();
        // TODO: beginDate and closeDate
        return target;
    }
}
