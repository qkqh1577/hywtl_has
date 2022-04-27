package com.howoocast.hywtl_has.project_comment.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_comment.domain.ProjectComment;
import com.howoocast.hywtl_has.project_comment.parameter.ProjectCommentAddParameter;
import com.howoocast.hywtl_has.project_comment.repository.ProjectCommentRepository;
import com.howoocast.hywtl_has.project_comment.view.ProjectCommentView;
import com.howoocast.hywtl_has.user.domain.User;
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

    private final ProjectCommentRepository projectCommentRepository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProjectCommentView> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return projectCommentRepository
            .findAll(predicate, pageable)
            .map(ProjectCommentView::assemble);
    }

    @Transactional
    public ProjectCommentView add(String username, ProjectCommentAddParameter params) {
        return ProjectCommentView.assemble(ProjectComment.of(
                projectCommentRepository,
                Project.load(projectRepository, params.getProjectId()),
                User.load(userRepository, username),
                params.getDescription()
            )
        );
    }
}
