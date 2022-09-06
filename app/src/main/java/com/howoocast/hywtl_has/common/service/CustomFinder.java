package com.howoocast.hywtl_has.common.service;


import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;

@Slf4j
@RequiredArgsConstructor
public class CustomFinder<D extends CustomEntity> {

    private final CustomRepository<D> repository;

    private final Class<D> classType;


    public D byId(Long id) {
        String KEY = getKey();
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(KEY, id);
        });
    }

    public @Nullable
    D byIdIfExists(@Nullable Long id) {
        if (Objects.isNull(id)) {
            return null;
        }
        return repository.findById(id).orElse(null);
    }

    @SuppressWarnings("unchecked")
    public <T> D byField(T value, String name) {
        String KEY = getKey();
        String methodName = name.startsWith("findBy")
            ? name
            : "findBy" + name.substring(0, 1).toUpperCase() + name.substring(1);
        log.debug("[method] {}", methodName);
        try {
            Method find = repository.getClass().getMethod(methodName, value.getClass());
            Optional<D> optional = (Optional<D>) find.invoke(repository, value);
            return optional.orElseThrow(() -> {
                throw new NotFoundException(KEY, name, value.toString());
            });
        } catch (Exception e) {
            e.printStackTrace();
            throw new NotFoundException(KEY, name, value.toString());
        }
    }

    private String getKey() {
        try {
            Field key = classType.getField("KEY");
            return (String) key.get(null);
        } catch (Exception e) {
            return "unknown_domain";
        }
    }


}
