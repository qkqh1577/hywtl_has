package com.howoocast.hywtl_has.common.util;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.lang.Nullable;

public final class ListConvertor {

    public static <T extends CustomParameter<R>, R> List<R> make(@Nullable List<T> list) {
        return Optional.ofNullable(list)
            .map(l -> l.stream()
                .map(CustomParameter::build)
                .collect(Collectors.toList())
            )
            .orElse(Collections.emptyList());
    }

    public static <T, R> List<R> make(@Nullable List<T> list, Function<T, R> mapper) {
        return Optional.ofNullable(list)
            .map(l -> l.stream()
                .map(mapper)
                .collect(Collectors.toList())
            )
            .orElse(Collections.emptyList());
    }
}
