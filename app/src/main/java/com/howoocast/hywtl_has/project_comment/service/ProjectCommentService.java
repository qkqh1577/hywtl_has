package com.howoocast.hywtl_has.project_comment.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_comment.domain.ProjectComment;
import com.howoocast.hywtl_has.project_comment.parameter.ProjectCommentAddParameter;
import com.howoocast.hywtl_has.project_comment.parameter.ProjectCommentChangeParameter;
import com.howoocast.hywtl_has.project_comment.repository.ProjectCommentRepository;
import com.howoocast.hywtl_has.project_comment.view.ProjectCommentView;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectCommentService {

    private final ProjectCommentRepository repository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProjectCommentView> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository
            .findAll(predicate, pageable)
            .map(ProjectCommentView::assemble);
    }

    @Transactional(readOnly = true)
    public ProjectCommentView get(Long id) {
        ProjectComment instance = this.load(id);
        return ProjectCommentView.assemble(instance);
    }

    @Transactional
    public ProjectCommentView add(String username, ProjectCommentAddParameter params) {
        ProjectComment instance = ProjectComment.of(
            projectRepository.findById(params.getProjectId())
                .orElseThrow(() -> new NotFoundException("project", params.getProjectId())),
            userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username))),
            params.getDescription()
        );
        return ProjectCommentView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, ProjectCommentChangeParameter params) {
        ProjectComment instance = this.load(id);
        instance.changeDescription(params.getDescription());
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(instance ->
            repository.deleteById(instance.getId())
        );
    }

    private ProjectComment load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project_comment", id));
    }
}
