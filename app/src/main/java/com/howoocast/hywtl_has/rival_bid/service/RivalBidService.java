package com.howoocast.hywtl_has.rival_bid.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.rival_bid.domain.RivalBid;
import com.howoocast.hywtl_has.rival_bid.parameter.RivalBidParameter;
import com.howoocast.hywtl_has.rival_bid.repository.RivalBidRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RivalBidService {

    private final RivalBidRepository repository;

    private final ProjectRepository projectRepository;

    private final BusinessRepository businessRepository;

    private final ApplicationEventPublisher eventPublisher;


    @Transactional(readOnly = true)
    public List<RivalBid> getList(Long projectId) {
        return repository.findByProject_Id(projectId);
    }

    @Transactional
    public void push(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        RivalBid instance = RivalBid.of(project);
        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "경쟁 업체 입찰 정보 행 추가"
        ));
    }

    @Transactional
    public void update(Long id, RivalBidParameter parameter) {
        RivalBid instance = this.load(id);
        Business business = new CustomFinder<>(businessRepository, Business.class).byIdIfExists(
            parameter.getBusinessId());
        List<EventEntity> eventList = instance.update(
            business,
            parameter.getTestAmount(),
            parameter.getReviewAmount(),
            parameter.getTotalAmount(),
            parameter.getExpectedDuration()
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void delete(Long id) {
        RivalBid instance = this.load(id);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "경쟁 업체 입찰 정보 행 삭제",
            String.format("%s", instance.getBusiness().getName()),
            null
        ));
        instance.delete();
    }

    private RivalBid load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(RivalBid.KEY, id);
        });
    }
}
