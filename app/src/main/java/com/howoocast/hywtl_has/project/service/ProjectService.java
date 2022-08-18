package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.parameter.ProjectAddParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<Project> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository.findAll(predicate, pageable);
    }

    @Transactional(readOnly = true)
    public Project getOne(Long id) {
        return this.load(id);
    }

    @Transactional
    public void add(ProjectAddParameter parameter) {

        this.checkName(parameter.getName());

        User receptionManager = userRepository.findById(parameter.getReceptionManagerId())
            .orElseThrow(() -> {
                throw new NotFoundException(
                    User.KEY,
                    "reception_manager",
                    parameter.getReceptionManagerId().toString());
            });
        String code = parameter.getProgressStatus() == ProjectProgressStatus.TEMPORARY ? null : getNextCode();

        Project instance = Project.of(
            code,
            parameter.getName(),
            parameter.getAlias(),
            parameter.getEstimateType(),
            receptionManager,
            parameter.getProgressStatus()
        );

        repository.save(instance);
    }

    private void checkName(String name) {
        List<Project> list = repository.findByBasic_Name(name);
        if (list != null && !list.isEmpty()) {
            throw new DuplicatedValueException(
                Project.KEY,
                "name",
                name
            );
        }
    }

    private String getDateString(int year) {
        return String.format("%d-01-01 00:00:00", year);
    }

    private String getNextCode() {
        int year = LocalDateTime.now().getYear();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startYear = LocalDateTime.parse(getDateString(year), formatter);
        LocalDateTime endYear = LocalDateTime.parse(getDateString(year + 1), formatter);
        Integer count = repository.countByCreatedAtBetween(startYear, endYear);
        return String.format("%d%03d", year, count + 1).substring(2);
    }

    private Project load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(Project.KEY, id);
        });
    }
}
