package com.howoocast.hywtl_has.project_target.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetDocument;
import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetDocumentAddParameter;
import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetDocumentChangeParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_target.repository.ProjectTargetDocumentRepository;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetDocumentView;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectTargetDocumentService {

    private final ProjectTargetDocumentRepository repository;

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public List<ProjectTargetDocumentView> getList(Long projectId) {
        return repository.findByProject_Id(projectId)
            .stream().map(ProjectTargetDocumentView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectTargetDocumentView get(Long id) {
        return ProjectTargetDocumentView.assemble(load(id));
    }

    @Transactional
    public ProjectTargetDocumentView add(
        Long projectId,
        String username,
        ProjectTargetDocumentAddParameter params
    ) {
        ProjectTargetDocument instance = ProjectTargetDocument.of(
            projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException("project", projectId)),
            Objects.requireNonNull(fileItemService.build(params.getFileItem())),
            userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username))),
            params.getMemo()
        );
        return ProjectTargetDocumentView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, ProjectTargetDocumentChangeParameter params) {
        ProjectTargetDocument instance = this.load(id);
        instance.change(params.getMemo());
    }

    @Transactional
    public void delete(Long id) {
        ProjectTargetDocument instance = this.load(id);
        fileItemService.delete(instance.getFileItem());
        repository.deleteById(instance.getId());
    }

    private ProjectTargetDocument load(Long id) {
        return repository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("project-target-document", id));
    }
}