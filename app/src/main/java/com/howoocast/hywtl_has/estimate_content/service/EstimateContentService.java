package com.howoocast.hywtl_has.estimate_content.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.howoocast.hywtl_has.estimate_content.domain.EstimateContentVariable;
import com.howoocast.hywtl_has.estimate_content.parameter.EstimateContentChangeSequenceParameter;
import com.howoocast.hywtl_has.estimate_content.parameter.EstimateContentParameter;
import com.howoocast.hywtl_has.estimate_content.repository.EstimateContentRepository;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EstimateContentService {

    private final EstimateContentRepository repository;

    @Transactional(readOnly = true)
    public List<EstimateContent> list(
        @Nullable Predicate predicate
    ) {
        if (Objects.isNull(predicate)) {
            return repository.findByOrderBySeq();
        }

        return repository.findAll(predicate, Sort.by(Direction.ASC, "seq"));
    }

    @Transactional(readOnly = true)
    public List<EstimateContentVariable> variableList() {
        return EstimateContentVariable.list();
    }

    @Transactional(readOnly = true)
    public EstimateContent get(Long id) {
        return this.load(id);
    }

    @Transactional
    public void upsert(
        @Nullable Long id,
        EstimateContentParameter parameter
    ) {
        if (Objects.isNull(id)) {
            EstimateContent instance = EstimateContent.of(
                parameter.getName(),
                parameter.getTestType(),
                parameter.getDetailList(),
                getNextSequence()
            );
            repository.save(instance);
            return;
        }

        EstimateContent instance = this.load(id);
        instance.change(
            parameter.getName(),
            parameter.getTestType(),
            parameter.getDetailList()
        );
    }

    @Transactional
    public void changeSequence(
        EstimateContentChangeSequenceParameter parameter
    ) {
        for (int i = 0; i < parameter.getIdList().size(); i++) {
            Long id = parameter.getIdList().get(i);
            EstimateContent instance = this.load(id);
            instance.changeSeq(i + 1L);
        }
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    private Long getNextSequence() {
        return repository.count() + 1;
    }

    private EstimateContent load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(EstimateContent.KEY, id);
        });
    }
}
