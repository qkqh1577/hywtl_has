package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectSystemEstimateParameter.Content;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;

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
        Project project,
        Business business
    ) {
        super(
            code,
            ProjectEstimateType.SYSTEM,
            isSent,
            recipient,
            note,
            writer,
            project,
            business
        );
    }

    public static ProjectSystemEstimate of(
        ProjectEstimate dto,
        Boolean isSent,
        String recipient,
        String note,
        List<ProjectEstimateTemplate> templateList,
        List<Content> contentList,
        Business business
    ) {
        ProjectSystemEstimate instance = new ProjectSystemEstimate(
            dto.getCode(),
            isSent,
            recipient,
            note,
            dto.getWriter(),
            dto.getProject(),
            business
        );
        instance.templateList = templateList;
        instance.contentList = contentList.stream().map(Content::getContent).collect(Collectors.toList());
        return instance;
    }

    public List<EventEntity> change(
        Boolean isSent,
        String recipient,
        Boolean isLh,
        String note,
        List<ProjectEstimateTemplate> templateList,
        List<Content> contentList
    ) {
        List<EventEntity> eventList = super.change(
            isSent,
            recipient,
            isLh,
            note,
            this.getBusiness()
        );

        eventList.add(EventEntity.of(
            "용역 항목 변경",
            Objects.isNull(this.templateList) || this.templateList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함",
            templateList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함"
        ));
        this.templateList = templateList;
        eventList.add(EventEntity.of(
            "용역 내용 변경",
            Objects.isNull(this.contentList) || this.contentList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함",
            contentList.isEmpty()
                ? null
                : "복합 내용은 일시 정보만 기록함"
        ));
        this.contentList = contentList.stream().map(Content::getContent).collect(Collectors.toList());

        return eventList;
    }

    /**
     * @migration
     * @param code
     * @param isSent
     * @param recipient
     * @param writer
     * @param project
     */
    protected ProjectSystemEstimate(
        String code,
        Boolean isSent,
        String recipient,
        User writer,
        Project project,
        Business business,
        ProjectEstimatePlan plan,
        List<ProjectEstimateComplexSite> siteList,
        List<ProjectEstimateComplexBuilding> buildingList
    ) {
        super(
            code,
            ProjectEstimateType.SYSTEM,
            isSent,
            recipient,
            writer,
            project,
            business,
            plan,
            siteList,
            buildingList
        );
    }

    /**
     * @migration
     * @param dto
     * @param isSent
     * @param recipient
     * @param templateList
     * @param contentList
     * @return
     */

    public static ProjectSystemEstimate of(
        ProjectEstimate dto,
        Boolean isSent,
        String recipient,
        List<ProjectEstimateTemplate> templateList,
        @Nullable List<Content> contentList,
        Business business
    ) {
        ProjectSystemEstimate instance = new ProjectSystemEstimate(
            dto.getCode(),
            isSent,
            recipient,
            dto.getWriter(),
            dto.getProject(),
            business,
            dto.getPlan(),
            dto.getSiteList(),
            dto.getBuildingList()
        );

        instance.templateList = templateList;
        /**
         * @migration
         */
        if (Objects.nonNull(contentList)) {
            instance.contentList = contentList.stream().map(Content::getContent).collect(Collectors.toList());
        }
        return instance;
    }
}
