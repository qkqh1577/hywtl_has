package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
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
        String recipient,
        String note,
        User writer,
        Project project,
        Business business
    ) {
        super(
            code,
            type,
            isSent,
            recipient,
            note,
            writer,
            project,
            business
        );
    }

    public static ProjectCustomEstimate of(
        ProjectEstimate dto,
        FileItem file,
        ProjectEstimateType type,
        Boolean isSent,
        String recipient,
        String note,
        Business business
    ) {
        ProjectCustomEstimate instance =
            new ProjectCustomEstimate(
                dto.getCode(),
                type,
                isSent,
                recipient,
                note,
                dto.getWriter(),
                dto.getProject(),
                business
            );
        instance.file = file;
        return instance;
    }

    public List<EventEntity> change(
        Boolean isSent,
        String recipient,
        Boolean isLh,
        String note,
        Business business
    ) {
        return super.change(
            isSent,
            recipient,
            isLh,
            note,
            business
        );
    }

}
