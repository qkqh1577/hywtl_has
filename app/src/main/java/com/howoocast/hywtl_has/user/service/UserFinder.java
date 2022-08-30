package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public final class UserFinder {

    private final UserRepository repository;

    public User byUsername(String username) {
        return repository.findByUsername(username).orElseThrow(() -> {
            throw new NotFoundException(User.KEY, "username", username);
        });
    }

    public User byId(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(User.KEY, id);
        });
    }

}
