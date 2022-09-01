package com.howoocast.hywtl_has.project_basic.view;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.view.BusinessManagerShortView;
import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectBasicBusinessView {

    private Long id;
    private ProjectInvolvedType involvedType;
    private BusinessShortView business;
    private BusinessManagerShortView businessManager;
    private LocalDateTime modifiedAt;

    public static ProjectBasicBusinessView assemble(ProjectBasicBusiness source) {
        ProjectBasicBusinessView target = new ProjectBasicBusinessView();
        target.id = source.getId();
        target.involvedType = source.getInvolvedType();
        target.business = BusinessShortView.assemble(source.getBusiness());
        target.businessManager = BusinessManagerShortView.assemble(source.getBusinessManager());
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }

}
