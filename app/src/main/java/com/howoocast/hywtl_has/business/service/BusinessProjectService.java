package com.howoocast.hywtl_has.business.service;

import com.howoocast.hywtl_has.business.view.BusinessRivalProjectView;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_bid.repository.ProjectBidRepository;
import com.howoocast.hywtl_has.project_estimate.repository.RivalEstimateRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        Long businessId
    ) {
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
