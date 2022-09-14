package com.howoocast.hywtl_has.project_bid.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_bid.domain.RivalBid;
import java.util.List;

public interface RivalBidRepository extends CustomRepository<RivalBid> {

    List<RivalBid> findByProject_Id(Long projectId);

    List<RivalBid> findByBusiness_Id(Long businessId);
}
