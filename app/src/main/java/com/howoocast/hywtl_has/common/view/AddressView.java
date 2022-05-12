package com.howoocast.hywtl_has.common.view;

import com.howoocast.hywtl_has.common.domain.Address;
import java.util.Objects;
import lombok.Getter;

@Getter
public class AddressView {

    private String depth1;
    private String depth2;
    private String road;
    private String landNumber;
    private String place;
    private String extra;
    private Double latitude;
    private Double longitude;

    public String getFull() {
        return String.format("%s %s %s%s%s",
            this.depth1,
            this.depth2,
            this.road,
            Objects.isNull(this.place) ? "" : String.format(", %s", this.place),
            Objects.isNull(this.extra) ? "" : String.format(" (%s)", this.extra)
        );
    }

    public static AddressView assemble(Address source) {
        AddressView target = new AddressView();
        target.depth1 = source.getDepth1();
        target.depth2 = source.getDepth2();
        target.road = source.getRoad();
        target.landNumber = source.getLandNumber();
        target.place = source.getPlace();
        target.extra = source.getExtra();
        target.latitude = source.getLatitude();
        target.longitude = source.getLongitude();
        return target;
    }
}
