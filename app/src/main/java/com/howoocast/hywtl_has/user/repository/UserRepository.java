package com.howoocast.hywtl_has.user.repository;

import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User> {

    boolean existsByIdAndDeletedAtIsNull(Long id);

    List<User> findByDeletedAtIsNull();

    Optional<User> findByIdAndDeletedAtIsNull(Long id);

    Optional<User> findByUsernameAndDeletedAtIsNull(String username);

    Optional<User> findByEmailAndDeletedAtIsNull(String email);

}