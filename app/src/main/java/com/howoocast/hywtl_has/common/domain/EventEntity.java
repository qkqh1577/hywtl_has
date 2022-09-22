package com.howoocast.hywtl_has.common.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class EventEntity<T extends CustomEntity> {

    private final T target;
    private final String itemName;
    private final String before;
    private final String after;


}
