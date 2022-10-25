package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ProjectCollectionView {

    private UserShortView user;
    private List<ProjectCollectionStageShortView> stageList;

    public static ProjectCollectionView assemble(@Nullable ProjectCollection source) {
        ProjectCollectionView target = new ProjectCollectionView();
        if (Objects.isNull(source)) {
            return target;
        }
        if (Objects.nonNull(source.getUser())) {
            target.user = UserShortView.assemble(source.getUser());
        }

        target.stageList = source.getStageList().stream()
            .sorted(Comparator.comparing(ProjectCollectionStage::getSeq))
            .map(ProjectCollectionStageShortView::assemble)
            .collect(Collectors.toList());

        return target;
    }
}
