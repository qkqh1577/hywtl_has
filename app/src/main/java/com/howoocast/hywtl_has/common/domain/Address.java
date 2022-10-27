package com.howoocast.hywtl_has.common.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {

    public static final String KEY = "address";
    @NotBlank
    @Column(nullable = false)
    private String depth1; // 시, 도

    @NotBlank
    @Column(nullable = false)
    private String depth2; // 시, 군, 구

    @NotBlank
    @Column(nullable = false)
    private String road; // 도로명 주소

    private String landNumber; // 지번 주소
    private String place; // 장소명, 건물명
    private String extra; // 호수, 층, 기타

    @NotNull
    @Column(nullable = false)
    private Double latitude; // 위도

    @NotNull
    @Column(nullable = false)
    private Double longitude; // 경도

    public static Address of(
        String depth1,
        String depth2,
        String road,
        String landNumber,
        String place,
        String extra,
        Double latitude,
        Double longitude
    ) {
        return new Address(
            depth1,
            depth2,
            road,
            landNumber,
            place,
            extra,
            latitude,
            longitude
        );
    }
}
