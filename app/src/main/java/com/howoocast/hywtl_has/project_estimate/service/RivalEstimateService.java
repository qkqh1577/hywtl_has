package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_estimate.domain.RivalEstimate;
import com.howoocast.hywtl_has.project_estimate.parameter.RivalEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.repository.RivalEstimateRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RivalEstimateService {

    private final RivalEstimateRepository repository;

    private final ProjectRepository projectRepository;

    private final BusinessRepository businessRepository;

    @Transactional(readOnly = true)
    public List<RivalEstimate> getList(Long projectId) {
        return repository.findByProject_Id(projectId);
    }

    @Transactional
    public void push(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        RivalEstimate instance = RivalEstimate.of(project);
        repository.save(instance);
    }

    @Transactional
    public void update(Long id, RivalEstimateParameter parameter) {
        RivalEstimate instance = this.load(id);
        Business business = new CustomFinder<>(businessRepository, Business.class).byIdIfExists(
            parameter.getBusinessId());
        instance.update(
            business,
            parameter.getTestAmount(),
            parameter.getReviewAmount(),
            parameter.getTotalAmount(),
            parameter.getExpectedDuration()
        );
    }

    @Transactional
    public void delete(Long id) {
        this.load(id).delete();
    }

    private RivalEstimate load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(RivalEstimate.KEY, id);
        });
    }


}
