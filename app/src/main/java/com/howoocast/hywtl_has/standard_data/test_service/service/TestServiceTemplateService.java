package com.howoocast.hywtl_has.standard_data.test_service.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.standard_data.test_service.domain.TestServiceDetailTemplate;
import com.howoocast.hywtl_has.standard_data.test_service.domain.TestServiceTemplate;
import com.howoocast.hywtl_has.standard_data.test_service.parameter.TestServiceDetailTemplateParameter;
import com.howoocast.hywtl_has.standard_data.test_service.parameter.TestServiceTemplateChangeSeqParameter;
import com.howoocast.hywtl_has.standard_data.test_service.parameter.TestServiceTemplateParameter;
import com.howoocast.hywtl_has.standard_data.test_service.repository.TestServiceTemplateRepository;
import com.howoocast.hywtl_has.standard_data.test_service.view.TestServiceTemplateShortView;
import com.howoocast.hywtl_has.standard_data.test_service.view.TestServiceTemplateView;
import com.querydsl.core.types.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestServiceTemplateService {

    private final TestServiceTemplateRepository repository;

    @Transactional(readOnly = true)
    public List<TestServiceTemplateShortView> getList(Predicate predicate) {
        return
            StreamSupport.stream(
                    repository.findAll(predicate, Sort.by(Direction.ASC, "seq")).spliterator(),
                    false
                )
                .map(TestServiceTemplateShortView::assemble)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TestServiceTemplateView> getFullList(Predicate predicate) {
        return StreamSupport.stream(
                repository.findAll(predicate, Sort.by(Direction.ASC, "seq")).spliterator(),
                false
            )
            .map(TestServiceTemplateView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TestServiceTemplateView getOne(Long id) {
        return TestServiceTemplateView.assemble(this.load(id));
    }

    @Transactional
    public TestServiceTemplateView add(TestServiceTemplateParameter params) {

        List<TestServiceDetailTemplate> detailList = new ArrayList<>();
        for (int i = 0; i < params.getDetailList().size(); i++) {
            TestServiceDetailTemplateParameter detailParams = params.getDetailList().get(i);
            detailList.add(TestServiceDetailTemplate.of(
                detailParams.getTitleList(),
                detailParams.getUnit(),
                detailParams.getUnitPrice(),
                detailParams.getMemo(),
                i + 1
            ));
        }
        TestServiceTemplate instance = TestServiceTemplate.of(
            params.getTitle(),
            params.getTestType(),
            repository.findNextSeq() + 1,
            detailList
        );
        return TestServiceTemplateView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, TestServiceTemplateParameter params) {
        TestServiceTemplate instance = this.load(id);
        List<TestServiceDetailTemplate> detailList = new ArrayList<>();
        for (int i = 0; i < params.getDetailList().size(); i++) {
            TestServiceDetailTemplateParameter detailParams = params.getDetailList().get(i);
            if (Objects.isNull(detailParams.getId())) {
                detailList.add(TestServiceDetailTemplate.of(
                    detailParams.getTitleList(),
                    detailParams.getUnit(),
                    detailParams.getUnitPrice(),
                    detailParams.getMemo(),
                    i + 1
                ));
                continue;
            }

            TestServiceDetailTemplate detailInstance = instance.getDetailList().stream()
                .filter(item -> item.getId().equals(detailParams.getId()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("test-service-detail-template", detailParams.getId()));
            detailInstance.change(
                detailParams.getTitleList(),
                detailParams.getUnit(),
                detailParams.getUnitPrice(),
                detailParams.getMemo(),
                i + 1
            );
            detailList.add(detailInstance);
        }
        // TODO: 삭제 항목 delete 처리
        instance.change(
            params.getTitle(),
            params.getTestType(),
            detailList
        );
    }

    @Transactional
    public void changeSeq(TestServiceTemplateChangeSeqParameter params) {
        List<Long> idList = params.getIdList();
        for (int i = 0; i < idList.size(); i++) {
            this.load(idList.get(i)).changeSeq(i + 1);
        }
    }

    private TestServiceTemplate load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("test-service-template", id));
    }


}
