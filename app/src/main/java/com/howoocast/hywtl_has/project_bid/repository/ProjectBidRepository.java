package com.howoocast.hywtl_has.project_bid.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import java.util.Optional;

public interface ProjectBidRepository extends CustomRepository<ProjectBid> {

    Optional<ProjectBid> findByProject_Id(Long projectId);
}
