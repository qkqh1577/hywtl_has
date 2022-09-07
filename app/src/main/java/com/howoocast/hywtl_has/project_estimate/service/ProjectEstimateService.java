package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateAddParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectCustomEstimateRepository;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectEstimateService {

    private final ProjectEstimateRepository estimateRepository;

    private final ProjectCustomEstimateRepository customEstimateRepository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final BusinessRepository businessRepository;

    private final FileItemService fileItemService;


    @Transactional(readOnly = true)
    public List<ProjectEstimate> getList(
        Long projectId
    ) {
        return estimateRepository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectCustomEstimate getCustom(Long id) {
        return customEstimateRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectCustomEstimate.KEY, id);
        });
    }

    @Transactional
    public void addSystem(
        Long projectId,
        String username
    ) {

    }

    @Transactional

    public void addCustom(
        Long projectId,
        String username,
        ProjectCustomEstimateAddParameter parameter
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        String code = getCode(project);
        FileItem file = Objects.requireNonNull(fileItemService.build(parameter.getFile()));

        ProjectCustomEstimate instance = ProjectCustomEstimate.of(
            file,
            code,
            parameter.getType(),
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            writer,
            project,
            business
        );

        customEstimateRepository.save(instance);

    }

    private String getCode(Project project) {
        Long nextSeq = estimateRepository.findNextSeq(project.getId());

        String code = "";
        code += "Q";
        code += project.getBasic().getCode();
        code += String.format("%02d", nextSeq);

        return code;
    }
}
