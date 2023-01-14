package com.howoocast.hywtl_has.project_basic.view;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.view.BusinessManagerView;
import com.howoocast.hywtl_has.business.view.BusinessView;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Getter
public class ProjectBasicBusinessView {

    private Long id;
    private ProjectInvolvedType involvedType;
    private BusinessView business;
    private BusinessManagerView businessManager;
    private LocalDateTime modifiedAt;

    public static ProjectBasicBusinessView assemble(ProjectBasicBusiness source) {
        ProjectBasicBusinessView target = new ProjectBasicBusinessView();
        target.id = source.getId();
        target.involvedType = source.getInvolvedType();
        target.business = BusinessView.assemble(source.getBusiness());
        if (Objects.nonNull(source.getBusinessManager())) {
            target.businessManager = BusinessManagerView.assemble(source.getBusinessManager());
        }
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }

}
