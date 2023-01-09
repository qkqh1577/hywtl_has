package com.howoocast.hywtl_has.migration.enums;

public enum AddressHeader {
    CODE("행정동코드"),
    CITY1("시도명"),
    CITY2("시군구명");
    private final String name;
    AddressHeader(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
