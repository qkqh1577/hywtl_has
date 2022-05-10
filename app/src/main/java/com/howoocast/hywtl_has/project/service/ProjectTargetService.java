package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
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
import com.howoocast.hywtl_has.user.domain.User;
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
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public ProjectTargetView getOne(Long projectId) {
        return ProjectTargetView.assemble(Project.load(projectRepository, projectId).getTarget());
    }

    @Transactional(readOnly = true)
    public List<ProjectTargetDocumentView> getDocumentList(Long projectId) {
        return ProjectTargetDocument.loadByProjectId(projectTargetDocumentRepository, projectId).stream()
            .map(ProjectTargetDocumentView::assemble).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectTargetDocumentView getDocument(Long documentId) {
        return ProjectTargetDocumentView.assemble(
            ProjectTargetDocument.load(projectTargetDocumentRepository, documentId)
        );
    }

    @Transactional
    public void update(Long projectId, ProjectTargetParameter params) {
        Project.load(projectRepository, projectId)
            .changeTarget(
                params.getLandModelCount()
            );
    }

    @Transactional
    public ProjectTargetDocumentView addDocument(
        Long projectId, String username,
        ProjectTargetDocumentAddParameter params
    ) {
        return ProjectTargetDocumentView.assemble(
            ProjectTargetDocument.of(
                projectTargetDocumentRepository,
                Project.load(projectRepository, projectId),
                Optional.ofNullable(fileItemService.build(params.getFileItem()))
                    .orElseThrow(() -> new FileSystemException(FileSystemExceptionType.IO_EXCEPTION)),
                User.loadByUsername(userRepository, username),
                params.getMemo()
            )
        );
    }

    @Transactional
    public void updateDocument(Long documentId, ProjectTargetDocumentChangeParameter params) {
        ProjectTargetDocument source = ProjectTargetDocument.load(projectTargetDocumentRepository, documentId);
        source.change(params.getMemo());
    }

    @Transactional
    public void deleteDocument(Long documentId) {
        ProjectTargetDocument.load(projectTargetDocumentRepository, documentId).delete();
    }
}
