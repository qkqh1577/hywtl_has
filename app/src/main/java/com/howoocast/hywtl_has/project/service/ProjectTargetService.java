package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectTargetDocument;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetDocumentAddParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetDocumentChangeParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.repository.ProjectTargetDocumentRepository;
import com.howoocast.hywtl_has.project.view.ProjectTargetDocumentView;
import com.howoocast.hywtl_has.project.view.ProjectTargetView;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectTargetService {

    private final ProjectTargetDocumentRepository projectTargetDocumentRepository;
    private final ProjectRepository repository;
    private final UserRepository userRepository;
    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public ProjectTargetView getOne(Long projectId) {
        Project instance = this.load(projectId);
        return ProjectTargetView.assemble(instance.getTarget());
    }

    @Transactional(readOnly = true)
    public List<ProjectTargetDocumentView> getDocumentList(Long projectId) {
        return projectTargetDocumentRepository.findByProject_Id(projectId)
            .stream().map(ProjectTargetDocumentView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectTargetDocumentView getDocument(Long documentId) {
        return ProjectTargetDocumentView.assemble(loadDocument(documentId));
    }

    @Transactional
    public void update(Long projectId, ProjectTargetParameter params) {
        Project instance = this.load(projectId);
        instance.changeTarget(params.getLandModelCount());
    }

    @Transactional
    public ProjectTargetDocumentView addDocument(
        Long projectId, String username,
        ProjectTargetDocumentAddParameter params
    ) {
        ProjectTargetDocument instance = ProjectTargetDocument.of(
            this.load(projectId),
            Optional.ofNullable(fileItemService.build(params.getFileItem()))
                .orElseThrow(() -> new FileSystemException(FileSystemExceptionType.IO_EXCEPTION)),
            userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username))),
            params.getMemo()
        );
        return ProjectTargetDocumentView.assemble(
            projectTargetDocumentRepository.save(instance)
        );
    }

    @Transactional
    public void updateDocument(Long documentId, ProjectTargetDocumentChangeParameter params) {
        ProjectTargetDocument source = loadDocument(documentId);
        source.change(params.getMemo());
    }

    @Transactional
    public void deleteDocument(Long documentId) {
        projectTargetDocumentRepository.findById(documentId)
            .ifPresent(instance -> {
                fileItemService.delete(instance.getFileItem());
                projectTargetDocumentRepository.deleteById(instance.getId());
            });
    }

    private ProjectTargetDocument loadDocument(Long documentId) {
        return projectTargetDocumentRepository
            .findById(documentId)
            .orElseThrow(() -> new NotFoundException("project-target-document", documentId));
    }

    private Project load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project", id));
    }
}