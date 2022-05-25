package com.howoocast.hywtl_has.common.service;


import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.lang.Nullable;

@Slf4j
@RequiredArgsConstructor
public abstract class CustomFinder<D extends CustomEntity> {


    private final String entityName;
    private final CustomRepository<D> repository;

    public D load(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new NotFoundException(entityName, id));
    }

    public List<D> findAll() {
        return repository.findAll();
    }

    @SuppressWarnings("unchecked")
    public List<D> findAll(Predicate predicate) {
        try {
            QuerydslPredicateExecutor<D> executor = (QuerydslPredicateExecutor<D>) repository;
            return StreamSupport
                .stream(
                    executor.findAll(predicate).spliterator(),
                    false
                )
                .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalRequestException(String.format("%s.not-allowed-method", entityName), "잘못된 요청입니다.");
        }
    }

    public Page<D> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @SuppressWarnings("unchecked")
    public Page<D> findAll(Predicate predicate, Pageable pageable) {
        try {
            QuerydslPredicateExecutor<D> executor = (QuerydslPredicateExecutor<D>) repository;
            return executor.findAll(predicate, pageable);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalRequestException(String.format("%s.not-allowed-method", entityName), "잘못된 요청입니다.");
        }
    }

    @Nullable
    public D find(Long id) {
        return repository.findById(id)
            .orElse(null);
    }
}
