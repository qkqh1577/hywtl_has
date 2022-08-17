package com.howoocast.hywtl_has.project_target.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project_target.domain.ProjectTarget;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetDetail;
import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_target.repository.ProjectTargetRepository;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetView;
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
public class ProjectTargetService {

    private final ProjectTargetRepository repository;

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ProjectTargetView> getList(Long projectId) {
        return repository.findByProject_Id(projectId)
            .stream().map(ProjectTargetView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectTargetView get(Long id) {
        return ProjectTargetView.assemble(load(id));
    }

    @Transactional
    public ProjectTargetView add(
        Long projectId,
        String username,
        ProjectTargetParameter parameter
    ) {
        repository.findByCode(parameter.getCode()).ifPresent(instance -> {
            throw new DuplicatedValueException("project-target", "code", parameter.getCode());
        });
        ProjectTarget instance = ProjectTarget.of(
            projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException("project", projectId)),
            parameter.getCode(),
            parameter.getMemo(),
            parameter.getTestList(),
            parameter.getDetailList().stream()
                .map(detailParam -> ProjectTargetDetail.of(
                    detailParam.getBuildingName(),
                    detailParam.getTestList(),
                    detailParam.getMemo()
                ))
                .collect(Collectors.toList()),
            userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username)))
        );
        return ProjectTargetView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, ProjectTargetParameter parameter) {
        repository.findByCode(parameter.getCode()).ifPresent(instance -> {
            if (!instance.getId().equals(id)) {
                throw new DuplicatedValueException("project-target", "code", parameter.getCode());
            }
        });
        ProjectTarget instance = this.load(id);
        List<ProjectTargetDetail> detailList = parameter.getDetailList().stream()
            .map(detailParam -> {
                if (Objects.isNull(detailParam.getId())) {
                    return ProjectTargetDetail.of(
                        detailParam.getBuildingName(),
                        detailParam.getTestList(),
                        detailParam.getMemo()
                    );
                }
                ProjectTargetDetail detailInstance = instance.getDetailList().stream()
                    .filter(item -> item.getId().equals(detailParam.getId()))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("project-target-detail", detailParam.getId()));
                detailInstance.change(
                    detailParam.getBuildingName(),
                    detailParam.getTestList(),
                    detailParam.getMemo()
                );
                return detailInstance;
            }).collect(Collectors.toList());

        instance.change(
            parameter.getCode(),
            parameter.getTestList(),
            detailList,
            parameter.getMemo()
        );

        // TODO: 삭제된 항목 deleted 처리
    }

    @Transactional
    public void delete(Long id) {
        ProjectTarget instance = this.load(id);
        repository.deleteById(instance.getId());
    }

    private ProjectTarget load(Long id) {
        return repository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("project-target", id));
    }
}