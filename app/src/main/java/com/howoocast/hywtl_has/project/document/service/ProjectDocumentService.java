package com.howoocast.hywtl_has.project.document.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocumentType;
import com.howoocast.hywtl_has.project.document.parameter.ProjectDocumentAddParameter;
import com.howoocast.hywtl_has.project.document.parameter.ProjectDocumentChangeParameter;
import com.howoocast.hywtl_has.project.document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.service.ProjectFinder;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user.service.UserFinder;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        User writer = new UserFinder(userRepository).byUsername(username);
        Project project = new ProjectFinder(projectRepository).byId(projectId);
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
    }

    @Transactional
    public void change(
        Long id,
        ProjectDocumentChangeParameter parameter
    ) {
        ProjectDocument instance = this.load(id);
        FileItem mailFile = fileItemService.build(parameter.getMailFile());
        instance.change(
            parameter.getRecipient(),
            mailFile,
            parameter.getNote()
        );
    }

    @Transactional
    public void delete(
        Long id
    ) {
        repository.deleteById(id);
    }

    private String getCode(Project project, ProjectDocumentType type) {
        List<ProjectDocument> list = repository.findByProject_IdAndTypeOrderByCode(project.getId(), type);
        Long maxId = list.stream()
            .map(ProjectDocument::getId)
            .reduce(1L, Math::max);

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
        code += String.format("%02d", maxId + 1L);
        return code;
    }

    private ProjectDocument load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectDocument.KEY, id);
        });
    }
}
