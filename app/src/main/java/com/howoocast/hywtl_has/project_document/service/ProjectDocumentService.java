package com.howoocast.hywtl_has.project_document.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexBuildingRepository;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocumentType;
import com.howoocast.hywtl_has.project_document.parameter.ProjectDocumentAddParameter;
import com.howoocast.hywtl_has.project_document.parameter.ProjectDocumentChangeParameter;
import com.howoocast.hywtl_has.project_document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectDocumentService {

    private final ProjectDocumentRepository repository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final FileItemService fileItemService;

    private final ApplicationEventPublisher eventPublisher;

    private final ProjectComplexBuildingRepository projectComplexBuildingRepository;

    @Transactional(readOnly = true)
    public List<ProjectDocument> list(
        Long projectId,
        @Nullable ProjectDocumentType type
    ) {
        if (Objects.isNull(type)) {
            return repository.findByProject_IdOrderByCode(projectId);
        }
        return repository.findByProject_IdAndTypeOrderByCode(projectId, type);
    }

    @Transactional(readOnly = true)
    public ProjectDocument get(Long id) {
        return this.load(id);
    }

    @Transactional
    public void add(
        Long projectId,
        String username,
        ProjectDocumentAddParameter parameter
    ) {
        User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        FileItem file = Objects.requireNonNull(fileItemService.build(parameter.getFile()));
        FileItem mailFile = fileItemService.build(parameter.getMailFile());

        ProjectDocument instance = ProjectDocument.of(
            project,
            parameter.getType(),
            getCode(project, parameter.getType()),
            parameter.getRecipient(),
            file,
            mailFile,
            parameter.getNote(),
            writer
        );

        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            String.format("%s ??????", instance.getType().getName()),
            null,
            instance.getCode()
        ));
    }

    @Transactional
    public void change(
        Long id,
        ProjectDocumentChangeParameter parameter
    ) {
        ProjectDocument instance = this.load(id);
        FileItem mailFile = fileItemService.build(parameter.getMailFile());
        List<EventEntity> eventList = instance.change(
            parameter.getRecipient(),
            mailFile,
            parameter.getNote()
        );

        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void delete(Long id) {
        projectComplexBuildingRepository.findByBuildingDocument_Id(id).ifPresent(building -> {
            throw new IllegalRequestException(ProjectDocument.KEY + ".document.violation",
                "?????? ????????? ??? ????????? ???????????? ????????? ??? ????????????. ????????? ???????????????, ??? ?????? ????????? ????????? ?????????.");
        });
        ProjectDocument instance = this.load(id);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "?????? ??????",
            instance.getCode(),
            null
        ));
        instance.delete();
    }

    private String getCode(Project project, ProjectDocumentType type) {
        Long nextSeq = repository.findNextSeq(project.getId(), type.toString());

        String code = "";
        switch (type) {
            case RECEIVED:
                code += "R";
                break;
            case SENT:
                code += "S";
                break;
            case BUILDING:
                code += "A";
                break;
        }
        code += project.getBasic().getCode();
        code += String.format("%02d", nextSeq);
        return code;
    }

    private ProjectDocument load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectDocument.KEY, id);
        });
    }
}
