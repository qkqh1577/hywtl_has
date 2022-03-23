package com.howoocast.hywtl_has.user.repository;

import com.howoocast.hywtl_has.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
