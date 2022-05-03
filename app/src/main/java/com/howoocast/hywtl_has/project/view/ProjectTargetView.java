package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.domain.ProjectTarget;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ProjectTargetView {

    private Integer landModelCount;

    private LocalDateTime updatedTime;

    public static ProjectTargetView assemble(@Nullable ProjectTarget source) {
        ProjectTargetView target = new ProjectTargetView();
        if (Objects.isNull(source)) {
            return target;
        }
        target.landModelCount = source.getLandModelCount();
        target.updatedTime = source.getUpdatedTime();
        return target;
    }
}
