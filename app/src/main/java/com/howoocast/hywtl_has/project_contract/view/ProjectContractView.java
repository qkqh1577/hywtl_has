package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectContractView {

    private Long id;
    private String code;
    private Boolean confirmed;
    private FileItemView pdfFile;
    private Boolean isSent;
    private String recipient;
    private String note;
    private ProjectEstimateView estimate;
    private ProjectContractBasicView basic;
    private ProjectContractCollectionView collection;
    private List<ProjectContractConditionView> conditionList;

    public static ProjectContractView assemble(ProjectContract source) {
        ProjectContractView target = new ProjectContractView();
        target.id = source.getId();
        target.code = source.getCode();
        target.confirmed = source.getConfirmed();
        target.pdfFile = FileItemView.assemble(source.getPdfFile());
        target.isSent = source.getIsSent();
        target.recipient = source.getRecipient();
        target.note = source.getNote();
        target.estimate = ProjectEstimateView.assemble(source.getEstimate());
        target.basic = ProjectContractBasicView.assemble(source.getBasic());
        target.collection = ProjectContractCollectionView.assemble(source.getCollection());
        target.conditionList = source.getConditionList().stream()
            .map(ProjectContractConditionView::assemble)
            .collect(Collectors.toList());
        return target;
    }
}
