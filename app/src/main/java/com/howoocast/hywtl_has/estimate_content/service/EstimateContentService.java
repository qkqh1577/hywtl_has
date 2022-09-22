package com.howoocast.hywtl_has.estimate_content.service;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.howoocast.hywtl_has.estimate_content.domain.EstimateContentVariable;
import com.howoocast.hywtl_has.estimate_content.parameter.EstimateContentAddParameter;
import com.howoocast.hywtl_has.estimate_content.parameter.EstimateContentChangeParameter;
import com.howoocast.hywtl_has.estimate_content.repository.EstimateContentRepository;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.querydsl.core.types.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
            return repository.findAll();
        }
        return repository.findAll(predicate);
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
    public void add(
        EstimateContentAddParameter parameter
    ) {
        List<EstimateContent> list = repository.findAll();
        List<TestType> parameterTestTypeList = new ArrayList<>(parameter.getTestTypeList());
        if (!parameterTestTypeList.contains(TestType.COMMON)) {
            parameterTestTypeList.add(TestType.COMMON);
        }
        if (!parameterTestTypeList.contains(TestType.REVIEW)) {
            parameterTestTypeList.add(TestType.REVIEW);
        }
        for (EstimateContent instance : list) {
            List<TestType> testTypeList = new ArrayList<>();
            testTypeList.add(TestType.COMMON);
            testTypeList.add(TestType.REVIEW);

            for (int i = 0; i < instance.getTestTypeList().size(); i++) {
                TestType type = instance.getTestTypeList().get(i);
                if (type != TestType.COMMON && type != TestType.REVIEW) {
                    testTypeList.add(type);
                }
            }
            if (testTypeList.stream()
                .map(parameterTestTypeList::contains)
                .reduce(true, (a, b) -> a && b)) {
                throw new IllegalRequestException(EstimateContent.KEY + ".test_type.unique_violation",
                    "동일한 실험 정보 구성이 있습니다.");
            }
        }

        repository.save(EstimateContent.of(
            parameter.getName(),
            parameterTestTypeList,
            parameter.getDetailList()
        ));
    }

    @Transactional
    public void change(
        Long id,
        EstimateContentChangeParameter parameter
    ) {
        EstimateContent instance = this.load(id);
        instance.change(
            parameter.getName(),
            parameter.getDetailList()
        );
    }

    @Transactional
    public void delete(Long id) {
        this.load(id).delete();
    }

    private EstimateContent load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(EstimateContent.KEY, id);
        });
    }
}
