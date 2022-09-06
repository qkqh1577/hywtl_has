package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("CUSTOM")
public class ProjectCustomEstimate extends ProjectEstimate {

    @OneToOne
    @JoinColumn(name = "file_id")
    private FileItem file;

    protected ProjectCustomEstimate(
        String code,
        ProjectEstimateType type,
        Boolean isSent,
        String business,
        String note,
        User writer,
        Project project
    ) {
        super(
            code,
            type,
            isSent,
            business,
            note,
            writer,
            project
        );
    }

    public static ProjectCustomEstimate of(
        FileItem file,
        String code,
        ProjectEstimateType type,
        Boolean isSent,
        String business,
        String note,
        User writer,
        Project project
    ) {
        ProjectCustomEstimate instance =
            new ProjectCustomEstimate(
                code,
                type,
                isSent,
                business,
                note,
                writer,
                project
            );
        instance.file = file;
        return instance;
    }


}
