package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("SYSTEM")
public class ProjectSystemEstimate extends ProjectEstimate {

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectEstimateTemplate> templateList;

    @ElementCollection
    private List<String> contentList;

    protected ProjectSystemEstimate(
        String code,
        Boolean isSent,
        String recipient,
        String note,
        User writer,
        Project project
    ) {
        super(
            code,
            ProjectEstimateType.SYSTEM,
            isSent,
            recipient,
            note,
            writer,
            project
        );
    }

    public static ProjectSystemEstimate of(
        ProjectEstimate dto,
        Boolean isSent,
        String recipient,
        String note,
        List<ProjectEstimateTemplate> templateList,
        List<String> contentList
    ) {
        ProjectSystemEstimate instance = new ProjectSystemEstimate(
            dto.getCode(),
            isSent,
            recipient,
            note,
            dto.getWriter(),
            dto.getProject()
        );
        instance.templateList = templateList;
        instance.contentList = contentList;
        return instance;
    }

    public void change(
        Boolean isSent,
        String recipient,
        String note,
        List<ProjectEstimateTemplate> templateList,
        List<String> contentList
    ) {
        super.change(
            isSent,
            recipient,
            note
        );
        this.templateList = templateList;
        this.contentList = contentList;
    }
}
