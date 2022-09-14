package com.howoocast.hywtl_has.project_log.service;

import com.howoocast.hywtl_has.project_log.repository.ProjectLogRepository;
import com.howoocast.hywtl_has.project_log.view.ProjectLogView;
import com.querydsl.core.types.Predicate;
import java.util.Optional;
import javax.annotation.Nullable;
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

    private final ProjectLogRepository projectLogRepository;

    @Transactional(readOnly = true)
    public Page<ProjectLogView> page(
        @Nullable Predicate predicate,
        Pageable pageable
    ) {
        return Optional.ofNullable(predicate)
            .map(p -> projectLogRepository.findAll(p, pageable))
            .orElse(projectLogRepository.findAll(pageable))
            .map(ProjectLogView::assemble);
    }
}
