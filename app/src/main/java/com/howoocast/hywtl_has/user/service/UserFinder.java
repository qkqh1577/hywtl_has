package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserFinder extends CustomFinder<User> {

    private final UserRepository repository;

    protected UserFinder(
        UserRepository repository
    ) {
        super(User.KEY, repository);
        this.repository = repository;
    }

    public User load(String username) {
        return repository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException(User.KEY, "username", username));
    }
}
