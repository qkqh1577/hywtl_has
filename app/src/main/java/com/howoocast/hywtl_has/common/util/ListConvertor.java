package com.howoocast.hywtl_has.common.util;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.parameter.CustomIdParameter;
import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.BiConsumer;
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

    public static <P extends CustomIdParameter, E extends CustomEntity> List<E> make(
        List<P> paramList,
        List<E> instanceList,
        String entityName,
        BiConsumer<E, P> action
    ) {
        return make(
            paramList,
            instanceList,
            entityName,
            action,
            null
        );
    }

    public static <P extends CustomIdParameter, E extends CustomEntity> List<E> make(
        List<P> paramList,
        List<E> instanceList,
        String entityName,
        BiConsumer<E, P> action,
        @Nullable Function<P, E> of
    ) {
        return paramList.stream()
            .map(param -> {
                if (Objects.nonNull(of) && Objects.isNull(param.getId())) {
                    return of.apply(param);
                }
                E instance = instanceList.stream()
                    .filter(item -> Objects.equals(item.getId(), param.getId()))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException(entityName, param.getId())
                    );
                action.accept(instance, param);
                return instance;
            })
            .collect(Collectors.toList());
    }
}
