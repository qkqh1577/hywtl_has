package com.howoocast.hywtl_has.business.service;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.view.BusinessInvolvedProjectView;
import com.howoocast.hywtl_has.business.view.BusinessRivalProjectView;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_bid.repository.ProjectBidRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_contract.repository.ProjectContractRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.rival_bid.repository.RivalBidRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessProjectService {

    private final ProjectBasicBusinessRepository projectBasicBusinessRepository;

    private final RivalBidRepository rivalBidRepository;

    private final ProjectBidRepository projectBidRepository;

    private final ProjectEstimateRepository projectEstimateRepository;

    private final ProjectContractRepository projectContractRepository;

    @Transactional(readOnly = true)
    public List<BusinessInvolvedProjectView> getInvolvedList(
        Long businessId,
        @Nullable ProjectInvolvedType involvedType
    ) {
        if (Objects.nonNull(involvedType)) {
            projectBasicBusinessRepository.findByBusiness_IdAndInvolvedType(businessId, involvedType).stream().map(
                projectBasicBusiness -> {
                    ProjectEstimate projectEstimate = getProjectEstimate(projectBasicBusiness);
                    ProjectContract projectContract = getProjectContract(projectBasicBusiness);
                    return BusinessInvolvedProjectView.assemble(
                        projectBasicBusiness,
                        projectEstimate,
                        projectContract
                    );
                }).collect(Collectors.toList());
        }
        return projectBasicBusinessRepository.findByBusiness_Id(businessId).stream().map(
            projectBasicBusiness -> {
                if (Objects.nonNull(projectBasicBusiness)) {
                    ProjectEstimate projectEstimate = getProjectEstimate(projectBasicBusiness);
                    ProjectContract projectContract = getProjectContract(projectBasicBusiness);
                    return BusinessInvolvedProjectView.assemble(
                        projectBasicBusiness,
                        projectEstimate,
                        projectContract
                    );
                }else{
                    return null;
                }
            }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BusinessRivalProjectView> getRivalList(
        Long businessId
    ) {
        return rivalBidRepository.findByBusiness_Id(businessId).stream()
            .map(rivalBid -> {
                ProjectBid projectBid = projectBidRepository.findByProject_Id(rivalBid.getProject().getId())
                    .orElse(null);
                return BusinessRivalProjectView.assemble(rivalBid, projectBid);
            })
            .collect(Collectors.toList());
    }

    private ProjectContract getProjectContract(ProjectBasicBusiness projectBasicBusiness) {
        ProjectContract projectContract = projectContractRepository.findByProject_IdAndConfirmed(
            projectBasicBusiness.getProject().getId(),
            Boolean.TRUE).orElse(null);
        return projectContract;
    }

    private ProjectEstimate getProjectEstimate(ProjectBasicBusiness projectBasicBusiness) {
        ProjectEstimate projectEstimate = projectEstimateRepository.findByProject_IdAndConfirmed(
            projectBasicBusiness.getProject().getId(),
            Boolean.TRUE).orElse(null);
        return projectEstimate;
    }

}
