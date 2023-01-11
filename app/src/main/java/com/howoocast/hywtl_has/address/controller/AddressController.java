package com.howoocast.hywtl_has.address.controller;

import com.howoocast.hywtl_has.address.domain.Address;
import com.howoocast.hywtl_has.address.service.AddressService;
import com.howoocast.hywtl_has.address.view.AddressView;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/address")
    public List<AddressView> list(
        @RequestParam(required = false) String code
    ) {
        List<Address> addressList = addressService.search(code);
        return addressList.stream().map(AddressView::assemble).collect(Collectors.toList());
    }
}

