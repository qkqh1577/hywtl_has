package com.howoocast.hywtl_has.user.repository;

import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User> {

    List<User> findByDeletedTimeIsNull();

    Optional<User> findByIdAndDeletedTimeIsNull(Long id);

    Optional<User> findByUsernameAndDeletedTimeIsNull(String username);

    Optional<User> findByEmailAndDeletedTimeIsNull(String email);

}