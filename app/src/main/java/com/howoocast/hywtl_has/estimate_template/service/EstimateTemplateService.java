package com.howoocast.hywtl_has.estimate_template.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplateDetail;
import com.howoocast.hywtl_has.estimate_template.parameter.EstimateTemplateChangeSeqParameter;
import com.howoocast.hywtl_has.estimate_template.parameter.EstimateTemplateDetailParameter;
import com.howoocast.hywtl_has.estimate_template.parameter.EstimateTemplateParameter;
import com.howoocast.hywtl_has.estimate_template.repository.EstimateTemplateRepository;
import com.querydsl.core.types.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EstimateTemplateService {

    private final EstimateTemplateRepository repository;

    @Transactional(readOnly = true)
    public List<EstimateTemplate> getList(@Nullable Predicate predicate) {
        Sort sort = Sort.by(Direction.ASC, "seq");
        if (Objects.isNull(predicate)) {
            return repository.findAll(sort);
        }
        return repository.findAll(predicate, sort);
    }

    @Transactional(readOnly = true)
    public EstimateTemplate getOne(Long id) {
        return this.load(id);
    }

    @Transactional
    public void add(EstimateTemplateParameter parameter) {

        List<EstimateTemplateDetail> detailList = new ArrayList<>();
        for (int i = 0; i < parameter.getDetailList().size(); i++) {
            EstimateTemplateDetailParameter detailParams = parameter.getDetailList().get(i);
            detailList.add(EstimateTemplateDetail.of(
                detailParams.getTitleList(),
                detailParams.getUnit(),
                detailParams.getUnitAmount(),
                detailParams.getNote(),
                i + 1
            ));
        }

        int maxSeq = repository.findAll().stream().map(EstimateTemplate::getSeq).reduce(0, Math::max);
        EstimateTemplate instance = EstimateTemplate.of(
            parameter.getTitle(),
            parameter.getTestType(),
            maxSeq + 1,
            detailList
        );
        repository.save(instance);
    }

    @Transactional
    public void change(Long id, EstimateTemplateParameter parameter) {
        EstimateTemplate instance = this.load(id);
        List<EstimateTemplateDetail> detailList = new ArrayList<>();
        for (int i = 0; i < parameter.getDetailList().size(); i++) {
            EstimateTemplateDetailParameter detailParams = parameter.getDetailList().get(i);
            if (Objects.isNull(detailParams.getId())) {
                detailList.add(EstimateTemplateDetail.of(
                    detailParams.getTitleList(),
                    detailParams.getUnit(),
                    detailParams.getUnitAmount(),
                    detailParams.getNote(),
                    i + 1
                ));
                continue;
            }

            EstimateTemplateDetail detailInstance = instance.getDetailList().stream()
                .filter(item -> Objects.equals(item.getId(), detailParams.getId()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(EstimateTemplateDetail.KEY, detailParams.getId()));
            detailInstance.change(
                detailParams.getTitleList(),
                detailParams.getUnit(),
                detailParams.getUnitAmount(),
                detailParams.getNote(),
                i + 1
            );
            detailList.add(detailInstance);
        }
        // TODO: 삭제 항목 delete 처리
        instance.change(
            parameter.getTitle(),
            parameter.getTestType(),
            detailList
        );
    }

    @Transactional
    public void changeSeq(EstimateTemplateChangeSeqParameter parameter) {
        List<Long> idList = parameter.getIdList();
        for (int i = 0; i < idList.size(); i++) {
            this.load(idList.get(i)).changeSeq(i + 1);
        }
    }

    @Transactional
    public void delete(Long id) {
        this.load(id).delete();
    }

    private EstimateTemplate load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException(EstimateTemplate.KEY, id));
    }
}
