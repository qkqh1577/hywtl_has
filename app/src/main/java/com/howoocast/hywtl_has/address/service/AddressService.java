package com.howoocast.hywtl_has.address.service;

import com.howoocast.hywtl_has.address.domain.Address;
import com.howoocast.hywtl_has.address.repository.AddressSearchRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressSearchRepository addressSearchRepository;

    public List<Address> search(String code) {
        return addressSearchRepository.search(code);
    }
}
