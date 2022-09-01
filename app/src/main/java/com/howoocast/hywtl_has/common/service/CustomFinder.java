package com.howoocast.hywtl_has.common.service;


import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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

    @SuppressWarnings("unchecked")
    public <T> D byField(T value, String name) {
        String KEY = getKey();
        String methodName = name.startsWith("findBy")
            ? name
            : "findBy" + name.substring(0, 1).toUpperCase() + name.substring(1);
        try {
            Method find = repository.getClass().getMethod(methodName, value.getClass());
            return (D) find.invoke(repository, value);
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
