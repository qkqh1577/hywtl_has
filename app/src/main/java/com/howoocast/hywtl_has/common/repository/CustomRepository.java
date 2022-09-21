package com.howoocast.hywtl_has.common.repository;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

public interface CustomRepository<E extends CustomEntity> extends Repository<E, Long> {

    List<E> findAll();


    Page<E> findAll(Pageable pageable);

    Optional<E> findById(Long id);

    E save(E instance);

}
