package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetComment;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetTestService;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetTestServiceDetail;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateSheetAddParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateSheetRepository;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateSheetListView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateSheetView;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import com.howoocast.hywtl_has.project_review.repository.ProjectReviewRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
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

    private final ProjectRepository projectRepository;

    private final ProjectReviewRepository projectReviewRepository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ProjectEstimateSheetListView> getList(Long projectId) {
        return repository.findByProject_Id(projectId).stream()
            .map(ProjectEstimateSheetListView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectEstimateSheetView getOne(Long id) {
        ProjectEstimateSheet instance = this.load(id);
        return ProjectEstimateSheetView.assemble(instance);
    }

    @Transactional
    public ProjectEstimateSheetView add(Long projectId, String username, ProjectEstimateSheetAddParameter params) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("project", projectId));

        User writer = userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username)));

        User salesTeamLeader = userRepository.findById(params.getSalesTeamLeaderId())
            .orElseThrow(() -> new NotFoundException("user", params.getSalesTeamLeaderId()));

        User salesManagementLeader = userRepository.findById(params.getSalesManagementLeaderId())
            .orElse(null);

        ProjectReview review = projectReviewRepository.findById(params.getReviewId())
            .orElseThrow(() -> new NotFoundException("project-review", params.getReviewId()));

        ProjectEstimateSheet instance = ProjectEstimateSheet.of(
            project,
            params.getConfirmed(),
            params.getStatus(),
            params.getTitle(),
            params.getMemo(),
            writer,
            params.getEstimateDate(),
            params.getExpectedStartMonth(),
            salesTeamLeader,
            salesManagementLeader,
            review,
            params.getTestServiceList().stream()
                .map(testServiceParams -> ProjectEstimateSheetTestService.of(
                    testServiceParams.getTitle(),
                    testServiceParams.getDetailList().stream()
                        .map(detailParams -> ProjectEstimateSheetTestServiceDetail.of(
                            detailParams.getTitleList(),
                            detailParams.getUnit(),
                            detailParams.getCount(),
                            detailParams.getUnitPrice(),
                            detailParams.getTotalPrice(),
                            detailParams.getIsIncluded(),
                            detailParams.getMemo(),
                            detailParams.getSeq()
                        ))
                        .collect(Collectors.toList()),
                    testServiceParams.getSeq()
                ))
                .collect(Collectors.toList()),
            params.getSpecialDiscount(),
            params.getCommentList().stream()
                .map(commentParams -> ProjectEstimateSheetComment.of(
                    commentParams.getSeq(),
                    commentParams.getDescription(),
                    commentParams.getInUse()
                ))
                .collect(Collectors.toList())
        );
        return ProjectEstimateSheetView.assemble(repository.save(instance));
    }

    private ProjectEstimateSheet load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project-estimate-sheet", id));
    }
}
