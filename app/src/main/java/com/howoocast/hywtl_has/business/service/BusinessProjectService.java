package com.howoocast.hywtl_has.business.service;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.view.BusinessRivalProjectView;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_bid.repository.ProjectBidRepository;
import com.howoocast.hywtl_has.rival_estimate.repository.RivalEstimateRepository;
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

    private final RivalEstimateRepository rivalEstimateRepository;

    private final ProjectBidRepository projectBidRepository;


    @Transactional(readOnly = true)
    public List<ProjectBasicBusiness> getInvolvedList(
        Long businessId,
        @Nullable ProjectInvolvedType involvedType
    ) {
        if (Objects.nonNull(involvedType)) {
            return projectBasicBusinessRepository.findByBusiness_IdAndInvolvedType(businessId, involvedType);
        }
        return projectBasicBusinessRepository.findByBusiness_Id(businessId);
    }

    @Transactional(readOnly = true)
    public List<BusinessRivalProjectView> getRivalList(
        Long businessId
    ) {
        return rivalEstimateRepository.findByBusiness_Id(businessId).stream()
            .map(rivalEstimate -> {
                ProjectBid projectBid = projectBidRepository.findByProject_Id(rivalEstimate.getProject().getId())
                    .orElse(null);
                return BusinessRivalProjectView.assemble(rivalEstimate, projectBid);
            })
            .collect(Collectors.toList());
    }
}
