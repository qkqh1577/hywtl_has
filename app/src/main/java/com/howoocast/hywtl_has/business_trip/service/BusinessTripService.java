package com.howoocast.hywtl_has.business_trip.service;

import com.howoocast.hywtl_has.business_trip.domain.BusinessTrip;
import com.howoocast.hywtl_has.business_trip.repository.BusinessTripRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessTripService {

    private final BusinessTripRepository businessTripRepository;

    @Transactional
    public void add(BusinessTrip businessTrip) {
        businessTripRepository.save(businessTrip);
    }

}
