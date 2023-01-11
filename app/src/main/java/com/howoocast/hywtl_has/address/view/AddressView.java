package com.howoocast.hywtl_has.address.view;

import com.howoocast.hywtl_has.address.domain.Address;
import lombok.Getter;
import org.springframework.util.StringUtils;

@Getter
public class AddressView {

    private String code;
    private String name;

    public static AddressView assemble(Address source) {
        AddressView addressView = new AddressView();
        addressView.code = source.getCode();
        if (StringUtils.hasText(source.getDepth2())) {
            addressView.name = source.getDepth2();
        } else {
            addressView.name = source.getDepth1();
        }
        return addressView;
    }
}
