package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectEstimateService {

    private final ProjectEstimateRepository estimateRepository;



    @Transactional(readOnly = true)
    public List<ProjectEstimate> getList(
        Long projectId
    ) {
        return estimateRepository.findByProject_Id(projectId);
    }


    @Transactional
    public void addSystem(
        Long projectId,
        String username
    ) {

    }

    @Transactional
    public void confirm(
        Long projectId,
        Long estimateId
    ) {
        List<ProjectEstimate> estimateList = estimateRepository.findByProject_Id(projectId);
        ProjectEstimate instance = estimateRepository.findById(estimateId).orElseThrow(() -> {
            throw new NotFoundException(ProjectEstimate.KEY, estimateId);
        });

        if (estimateList.isEmpty()) {
            throw new IllegalRequestException(ProjectEstimate.KEY + ".is_empty", "선택할 수 있는 견적서가 없습니다.");
        }
        if (instance.getConfirmed()) {
            throw new IllegalRequestException(ProjectEstimate.KEY + ".already_confirmed", "이미 확정된 견적서입니다.");
        }
        // 이전 삭제
        estimateList.stream()
            .filter(ProjectEstimate::getConfirmed)
            .findFirst()
            .ifPresent(item -> item.changeConfirmed(Boolean.FALSE));
        // 현재 등록
        instance.changeConfirmed(Boolean.TRUE);
    }

}
