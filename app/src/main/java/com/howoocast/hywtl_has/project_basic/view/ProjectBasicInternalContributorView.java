package com.howoocast.hywtl_has.project_basic.view;

import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicInternalContributor;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectBasicInternalContributorView {

    private Long id;
    private Double rate;
    private UserShortView user;
    private LocalDateTime modifiedAt;

    public static ProjectBasicInternalContributorView assemble(ProjectBasicInternalContributor source) {
        ProjectBasicInternalContributorView target = new ProjectBasicInternalContributorView();

        target.id = source.getId();
        target.rate = source.getRate();
        if (Objects.nonNull(source.getUser())) {
            target.user = UserShortView.assemble(source.getUser());
        }
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
