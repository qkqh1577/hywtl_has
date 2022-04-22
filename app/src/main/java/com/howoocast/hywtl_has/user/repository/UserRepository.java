package com.howoocast.hywtl_has.user.repository;

import com.howoocast.hywtl_has.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User> {

    Optional<User> findByIdAndDeletedTimeIsNull(Long id);
    Optional<User> findByUsernameAndDeletedTimeIsNull(String username);

    Optional<User> findByEmailAndDeletedTimeIsNull(String email);

}