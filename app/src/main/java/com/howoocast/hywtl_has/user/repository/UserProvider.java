package com.howoocast.hywtl_has.user.repository;

import com.howoocast.hywtl_has.user.domain.User;
import java.util.Optional;

public interface UserProvider {

    Optional<User> findBy(String target);
}
