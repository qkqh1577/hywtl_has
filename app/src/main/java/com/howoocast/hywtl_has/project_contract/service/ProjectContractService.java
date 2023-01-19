package com.howoocast.hywtl_has.project_contract.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionStageRepository;
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
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
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
    private final ProjectCollectionStageRepository stageRepository;
    private final FileItemService fileItemService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public List<ProjectContract> getList(Long projectId) {
        return repository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectContract get(Long id) {
        return this.load(id);
    }

    @Transactional(readOnly = true)
    @Nullable
    public List<ProjectContract> getFinal(Long projectId) {
        return repository.findByProject_IdAndConfirmed(projectId, Boolean.TRUE);
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
            writer,
            parameter.getContractType()
        );
        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "계약서 추가",
            null,
            instance.getCode()
        ));

        convert(parameter.getFile(), instance);
    }

    @Transactional
    public void change(
        Long id,
        ProjectContractParameter parameter
    ) {
        ProjectContract instance = this.load(id);
        ProjectEstimate estimate = new CustomFinder<>(estimateRepository, ProjectEstimate.class).byId(
            parameter.getEstimateId());

        List<EventEntity> eventList = instance.change(
            estimate,
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            toBasic(parameter.getBasic()),
            toCollection(parameter.getCollection()),
            toConditionList(parameter.getConditionList()),
            parameter.getContractType()
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
        convert(parameter.getFile(), instance);
    }

    @Transactional
    public void changePdfFile(
        Long id,
        FileItemParameter parameter
    ) {
        ProjectContract instance = this.load(id);
        FileItem pdfFile = fileItemService.build(parameter);
        List<EventEntity> eventList = instance.changePdfFile(pdfFile);
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void confirm(Long projectId, ProjectContractConfirmedParameter parameter) {
        List<ProjectContract> projectContractlist = repository.findByProject_Id(projectId);
        List<ProjectEstimate> projectEstimateList = estimateRepository.findByProject_Id(projectId);
        // custom api가 [], 0, undefined을 막는 로직이 존재.
        if (Objects.isNull(parameter.getContractIdList())) {
            projectContractlist.forEach(c -> c.changeConfirmed(Boolean.FALSE));
            projectEstimateList.forEach(e -> e.changeConfirmed(Boolean.FALSE));
            return;
        }
        // 견적서에서 따로 최종 선택을 하는 로직이 있어서 생기는 문제 수정
        projectEstimateList.forEach(e -> e.changeConfirmed(Boolean.FALSE));

        List<ProjectContract> confirmedList = new ArrayList<>();
        projectContractlist.forEach(c -> parameter.getContractIdList().forEach(fc -> {
            if (c.getId().equals(fc)) {
                confirmedList.add(c);
            }
        }));

        List<ProjectContract> unconfirmedList = projectContractlist.stream().filter(c -> !confirmedList.contains(c))
            .collect(Collectors.toList());

        confirmedList.forEach(fc -> {
            updateHistory(confirmedList, fc, Boolean.TRUE);
        });
        unconfirmedList.forEach(uc -> {
            updateHistory(unconfirmedList, uc, Boolean.FALSE);
        });

        List<Long> confirmedEstimateList = confirmedList.stream().map(c -> c.getEstimate().getId()).distinct()
            .collect(Collectors.toList());
        List<Long> unconfirmedEstimateList = unconfirmedList.stream().filter(uc-> !confirmedEstimateList.contains(uc.getEstimate().getId())).map(uc -> uc.getEstimate().getId()).distinct()
            .collect(Collectors.toList());

        if (!confirmedList.isEmpty()) {
            setConfirmedEstimate(confirmedEstimateList, Boolean.TRUE);
        }

        if (!unconfirmedList.isEmpty()) {
            setConfirmedEstimate(unconfirmedEstimateList, Boolean.FALSE);
        }
    }

    private static void validate(List<ProjectContract> list, ProjectContract instance) {
        if (list.isEmpty()) {
            throw new IllegalRequestException(ProjectContract.KEY + ".is_empty", "선택할 수 있는 계약서가 없습니다.");
        }
        if (instance.getConfirmed()) {
            throw new IllegalRequestException(ProjectContract.KEY + ".already_confirmed", "이미 확정된 계약서입니다.");
        }
    }

    private void updateHistory(List<ProjectContract> list, ProjectContract instance, Boolean value) {
        ProjectContract prev = list.stream()
            .filter(c -> c.getId().equals(instance.getId()))
            .findFirst().orElse(null);
        if (Objects.isNull(prev)) {
            throw new NotFoundException(ProjectContract.KEY + ".is_empty", "해당하는 계약서가 존재하지 않습니다.");
        }
        Boolean prevIsConfirmed = prev.getConfirmed();
        instance.changeConfirmed(value);

        if (instance.getConfirmed().equals(prevIsConfirmed)) {
            return;
        }

        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "확정 여부 변경",
            prevIsConfirmed ? "계약서 확정" : "계약서 미확정",
            instance.getConfirmed() ? "계약서 확정" : "계약서 미확정"
        ));
    }

    private void setConfirmedEstimate(List<Long> list, Boolean isConfirmed) {
        list.forEach(id -> {
            estimateRepository.findById(id).ifPresent(estimateByContract -> {
                estimateByContract.changeConfirmed(isConfirmed);
            });
        });
    }

    @Transactional
    public void delete(Long id) {
        ProjectContract instance = this.load(id);
        instance.delete();
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
                    item.getRate(),
                    item.getAmount(),
                    item.getNote(),
                    item.getExpectedDate()
                ))
                .collect(Collectors.toList()),
            parameter.getTotalAmountNote(),
            parameter.getTotalAmount()
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

    private void convert(FileItemParameter parameter, ProjectContract instance) {
        try {
            fileItemService.convertToContractPDF(parameter, instance);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
