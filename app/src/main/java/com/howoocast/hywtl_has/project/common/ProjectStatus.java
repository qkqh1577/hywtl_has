package com.howoocast.hywtl_has.project.common;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ProjectStatus {
    TEMPLATE("가등록"),
    ON_GOING("진행")
    ;

    private final String message;
    public String message() {
        return this.message;
    }
    public final List<String> getAllMessage() {
        return Arrays.stream(ProjectStatus.values()).map(ProjectStatus::message).collect(Collectors.toList());
    }
}
