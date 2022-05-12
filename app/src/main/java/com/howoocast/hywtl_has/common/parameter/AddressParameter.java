package com.howoocast.hywtl_has.common.parameter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressParameter {

    @NotBlank(message = "address.depth1.not-blank")
    private String depth1;

    @NotBlank(message = "address.depth2.not-blank")
    private String depth2;

    @NotBlank(message = "address.road.not-blank")
    private String road;

    private String landNumber;

    private String place;

    private String extra;

    @NotNull(message = "address.latitude.not-null")
    private Double latitude;

    @NotNull(message = "address.longitude.not-null")
    private Double longitude;
}
