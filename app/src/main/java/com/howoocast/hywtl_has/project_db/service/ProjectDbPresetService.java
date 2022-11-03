package com.howoocast.hywtl_has.project_db.service;


import com.howoocast.hywtl_has.project_db.domain.ProjectDbPreset;
import com.howoocast.hywtl_has.project_db.parameter.ProjectDbPresetParameter;
import com.howoocast.hywtl_has.project_db.repository.ProjectDbPresetRepository;
import com.howoocast.hywtl_has.project_db.view.ProjectDbPresetView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectDbPresetService {

    private final ProjectDbPresetRepository repository;

    @Transactional(readOnly = true)
    public List<ProjectDbPresetView> list() {
        return repository.findAll().stream()
                .map(ProjectDbPresetView::assemble)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDbPresetView find(Long id) {
        return ProjectDbPresetView.assemble(repository.findById(id).orElseThrow());
    }

    @Transactional
    public void add(ProjectDbPresetParameter parameter) {
        repository.save(ProjectDbPreset.of(
                parameter.getName(),
                parameter.getPreset()
        ));
    }

    @Transactional
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void change(Long id, ProjectDbPresetParameter parameter) {
        Optional<ProjectDbPreset> preset = repository.findById(id);
        preset.orElseThrow().change(parameter);
    }

}
