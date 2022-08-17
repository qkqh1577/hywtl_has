package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.util.ListConvertor;
import com.howoocast.hywtl_has.project.service.ProjectFinder;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetComment;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetTestService;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetTestServiceDetail;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateSheetCommentParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateSheetParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateSheetRepository;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateSheetShortView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateSheetView;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import com.howoocast.hywtl_has.project_review.repository.ProjectReviewRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.service.UserFinder;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectEstimateSheetService {

    private final ProjectEstimateSheetRepository repository;

    private final ProjectReviewRepository projectReviewRepository;

    private final ProjectFinder projectFinder;

    private final UserFinder userFinder;

    @Transactional(readOnly = true)
    public List<ProjectEstimateSheetShortView> getList(Long projectId) {
        return repository.findByProject_Id(projectId).stream()
            .map(ProjectEstimateSheetShortView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectEstimateSheetView getOne(Long id) {
        ProjectEstimateSheet instance = this.load(id);
        return ProjectEstimateSheetView.assemble(instance);
    }

    @Transactional
    public ProjectEstimateSheetView add(Long projectId, String username, ProjectEstimateSheetParameter parameter) {

        User writer = userFinder.load(username);
        User salesTeamLeader = userFinder.load(parameter.getSalesTeamLeaderId());
        User salesManagementLeader = userFinder.find(parameter.getSalesManagementLeaderId());

        ProjectReview review = projectReviewRepository.findById(parameter.getReviewId())
            .orElseThrow(() -> new NotFoundException("project-review", parameter.getReviewId()));

        ProjectEstimateSheet instance = ProjectEstimateSheet.of(
            projectFinder.load(projectId),
            parameter.getConfirmed(),
            parameter.getStatus(),
            parameter.getTitle(),
            parameter.getMemo(),
            writer,
            parameter.getEstimateDate(),
            parameter.getExpectedStartMonth(),
            salesTeamLeader,
            salesManagementLeader,
            parameter.getEngineeringPeriod(),
            parameter.getFinalReportPeriod(),
            review,
            ListConvertor.make(
                parameter.getTestServiceList(),
                testServiceParams -> ProjectEstimateSheetTestService.of(
                    testServiceParams.getTitle(),
                    ListConvertor.make(
                        testServiceParams.getDetailList(),
                        detailParams -> ProjectEstimateSheetTestServiceDetail.of(
                            detailParams.getTitleList(),
                            detailParams.getUnit(),
                            detailParams.getCount(),
                            detailParams.getUnitPrice(),
                            detailParams.getTotalPrice(),
                            detailParams.getIsIncluded(),
                            detailParams.getMemo(),
                            detailParams.getSeq()
                        )
                    ),
                    testServiceParams.getSeq()
                )
            ),
            parameter.getSpecialDiscount(),
            toCommentList(parameter.getCommentList())
        );
        return ProjectEstimateSheetView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, ProjectEstimateSheetParameter parameter) {
        ProjectEstimateSheet instance = this.load(id);
        User salesTeamLeader = userFinder.load(parameter.getSalesTeamLeaderId());
        User salesManagementLeader = userFinder.find(parameter.getSalesManagementLeaderId());

        instance.change(
            parameter.getConfirmed(),
            parameter.getStatus(),
            parameter.getTitle(),
            parameter.getMemo(),
            parameter.getEstimateDate(),
            parameter.getExpectedStartMonth(),
            salesTeamLeader,
            salesManagementLeader,
            parameter.getEngineeringPeriod(),
            parameter.getFinalReportPeriod(),
            ListConvertor.make(
                parameter.getTestServiceList(),
                instance.getTestServiceList(),
                "project-estimate.sheet.test-service",
                (i, p) -> i.change(
                    ListConvertor.make(
                        p.getDetailList(),
                        i.getDetailList(),
                        "project-estimate.sheet.test-service-detail",
                        (di, dp) -> di.change(
                            dp.getUnit(),
                            dp.getCount(),
                            dp.getUnitPrice(),
                            dp.getTotalPrice(),
                            dp.getIsIncluded(),
                            dp.getMemo()
                        )
                    )
                )
            ),
            parameter.getSpecialDiscount(),
            toCommentList(parameter.getCommentList())
        );
    }

    private List<ProjectEstimateSheetComment> toCommentList(List<ProjectEstimateSheetCommentParameter> parameter) {
        return ListConvertor.make(
            parameter,
            p -> ProjectEstimateSheetComment.of(
                p.getSeq(),
                p.getDescription(),
                p.getInUse()
            )
        );
    }

    private ProjectEstimateSheet load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project-estimate-sheet", id));
    }
}
