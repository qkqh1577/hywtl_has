package com.howoocast.hywtl_has.address.repository;

import com.howoocast.hywtl_has.address.domain.Address;
import java.util.List;

public interface AddressSearchRepository {
    List<Address> search(String code);
}
