package com.howoocast.hywtl_has.project_log.service;

import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project_log.domain.ProjectLog;
import com.howoocast.hywtl_has.project_log.repository.ProjectLogRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectLogService {

    private final ProjectLogRepository repository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProjectLog> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository
            .findAll(predicate, pageable)
            .map(instance -> {
                instance.setUser(
                    new CustomFinder<>(userRepository, User.class).byId(instance.getUserId()));
                return instance;
            });
    }
}
