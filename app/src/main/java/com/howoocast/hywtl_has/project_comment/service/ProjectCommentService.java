package com.howoocast.hywtl_has.project_comment.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.service.ProjectFinder;
import com.howoocast.hywtl_has.project_comment.domain.ProjectComment;
import com.howoocast.hywtl_has.project_comment.parameter.ProjectCommentAddParameter;
import com.howoocast.hywtl_has.project_comment.parameter.ProjectCommentChangeParameter;
import com.howoocast.hywtl_has.project_comment.repository.ProjectCommentRepository;
import com.howoocast.hywtl_has.project_comment.view.ProjectCommentView;
import com.howoocast.hywtl_has.user.service.UserFinder;
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

    private final ProjectFinder projectFinder;

    private final UserFinder userFinder;

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
    public ProjectCommentView add(String username, ProjectCommentAddParameter parameter) {
        ProjectComment instance = ProjectComment.of(
            projectFinder.load(parameter.getProjectId()),
            userFinder.load(username),
            parameter.getDescription()
        );
        return ProjectCommentView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, ProjectCommentChangeParameter parameter) {
        ProjectComment instance = this.load(id);
        instance.changeDescription(parameter.getDescription());
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
