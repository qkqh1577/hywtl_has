package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.user.domain.UserRepository;
import com.howoocast.hywtl_has.user.view.UserView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<UserView> page(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserView::assemble);
    }

    @Transactional(readOnly = true)
    public UserView get(Long id) {
        return userRepository.findById(id).map(UserView::assemble).orElseThrow(NotFoundException::new);
    }

}
