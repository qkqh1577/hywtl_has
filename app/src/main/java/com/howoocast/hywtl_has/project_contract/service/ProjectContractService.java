package com.howoocast.hywtl_has.project_contract.service;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCondition;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractBasicParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractCollectionParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConditionParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConfirmedParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractParameter;
import com.howoocast.hywtl_has.project_contract.repository.ProjectContractRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectContractService {

    private final ProjectContractRepository repository;
    private final ProjectEstimateRepository estimateRepository;
    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public List<ProjectContract> getList(Long projectId) {
        return repository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectContract get(Long id) {
        return this.load(id);
    }

    @Transactional
    public void add(
        Long projectId,
        String username,
        ProjectContractParameter parameter
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectEstimate estimate = new CustomFinder<>(estimateRepository, ProjectEstimate.class).byId(
            parameter.getEstimateId());
        User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        ProjectContract instance = ProjectContract.of(
            project,
            estimate,
            getCode(project),
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            toBasic(parameter.getBasic()),
            toCollection(parameter.getCollection()),
            toConditionList(parameter.getConditionList()),
            writer
        );
        repository.save(instance);
    }

    @Transactional
    public void change(
        Long id,
        ProjectContractParameter parameter
    ) {
        ProjectContract instance = this.load(id);
        ProjectEstimate estimate = new CustomFinder<>(estimateRepository, ProjectEstimate.class).byId(
            parameter.getEstimateId());
        FileItem pdfFile = fileItemService.build(parameter.getPdfFile());

        instance.change(
            estimate,
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            toBasic(parameter.getBasic()),
            toCollection(parameter.getCollection()),
            toConditionList(parameter.getConditionList()),
            pdfFile
        );
    }

    @Transactional
    public void confirm(Long projectId, ProjectContractConfirmedParameter parameter) {
        List<ProjectContract> list = repository.findByProject_Id(projectId);
        ProjectContract instance = this.load(parameter.getContractId());
        if (list.isEmpty()) {
            throw new IllegalRequestException(ProjectContract.KEY + ".is_empty", "선택할 수 있는 계약서가 없습니다.");
        }
        if (instance.getConfirmed()) {
            throw new IllegalRequestException(ProjectContract.KEY + ".already_confirmed", "이미 확정된 계약서입니다.");
        }
        list.stream()
            .filter(ProjectContract::getConfirmed)
            .findFirst()
            .ifPresent(item -> item.changeConfirmed(Boolean.FALSE));
        instance.changeConfirmed(Boolean.TRUE);
    }

    private ProjectContract load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectContract.KEY, id);
        });
    }

    private ProjectContractBasic toBasic(ProjectContractBasicParameter parameter) {
        return ProjectContractBasic.of(
            parameter.getServiceName(),
            parameter.getServiceDuration(),
            parameter.getOutcome(),
            parameter.getDescription(),
            parameter.getContractDate(),
            parameter.getOrdererAddress(),
            parameter.getOrdererCompanyName(),
            parameter.getOrdererCeoName(),
            parameter.getContractorAddress(),
            parameter.getContractorCompanyName(),
            parameter.getContractorCeoName()
        );
    }

    private ProjectContractCollection toCollection(ProjectContractCollectionParameter parameter) {
        return ProjectContractCollection.of(
            parameter.getStageNote(),
            parameter.getStageList().stream().map(item -> ProjectContractCollectionStage.of(
                    item.getName(),
                    item.getRatio(),
                    item.getNote(),
                    item.getExpectedDate()
                ))
                .collect(Collectors.toList()),
            parameter.getTotalAmountNote()
        );
    }

    private List<ProjectContractCondition> toConditionList(List<ProjectContractConditionParameter> parameterList) {
        return parameterList.stream()
            .map(parameter -> ProjectContractCondition.of(
                parameter.getTitle(),
                parameter.getDescriptionList()
            ))
            .collect(Collectors.toList());
    }

    private String getCode(Project project) {
        Long nextSeq = repository.findNextSeq(project.getId());

        String code = "";
        code += "C";
        code += project.getBasic().getCode();
        code += String.format("%02d", nextSeq);

        return code;
    }

}
