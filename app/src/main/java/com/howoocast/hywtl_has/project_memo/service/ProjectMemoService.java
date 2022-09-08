package com.howoocast.hywtl_has.project_memo.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.parameter.ProjectMemoParameter;
import com.howoocast.hywtl_has.project_memo.repository.ProjectMemoRepository;
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
public class ProjectMemoService {

    private final ProjectMemoRepository repository;

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public Page<ProjectMemo> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository.findAll(predicate, pageable);
    }

    @Transactional(readOnly = true)
    public ProjectMemo one(Long id) {
        // TODO: with notification list
        return this.load(id);
    }

    @Transactional
    public void add(
        String username,
        Long projectId,
        ProjectMemoParameter parameter
    ) {
        User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");

        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);

        ProjectMemo instance = ProjectMemo.of(
            project,
            parameter.getCategory(),
            writer,
            parameter.getDescription()
        );

        repository.save(instance);
    }

    @Transactional
    public void change(
        Long id,
        ProjectMemoParameter parameter
    ) {
        ProjectMemo instance = this.load(id);
        instance.change(
            parameter.getCategory(),
            parameter.getDescription()
        );
    }

    @Transactional
    public void delete(
        Long id
    ) {
        repository.deleteById(id);
    }

    private ProjectMemo load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectMemo.KEY, id);
        });
    }
}
