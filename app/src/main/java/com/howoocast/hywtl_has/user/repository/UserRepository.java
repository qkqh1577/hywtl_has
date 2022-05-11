package com.howoocast.hywtl_has.user.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.Optional;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserRepository extends CustomRepository<User>, QuerydslPredicateExecutor<User> {

    boolean existsById(Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

}