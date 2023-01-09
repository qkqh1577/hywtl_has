package com.howoocast.hywtl_has.address.repository;

import com.howoocast.hywtl_has.address.domain.Address;
import com.howoocast.hywtl_has.common.repository.CustomRepository;

public interface AddressRepository extends CustomRepository<Address> {

    Address findByDepth1AndDepth2IsNull(String name);

    Address findByDepth1AndDepth2(String city1, String city2);
}
