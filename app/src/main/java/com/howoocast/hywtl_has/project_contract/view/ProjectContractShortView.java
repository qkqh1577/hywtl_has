package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectContractShortView {

    private Long id;
    private String code;
    private Boolean isSent;
    private Boolean confirmed;
    private String estimateCode;
    private FileItemView pdfFile;
    private UserShortView createdBy;
    private String note;
    private LocalDateTime modifiedAt;

    public static ProjectContractShortView assemble(ProjectContract source) {
        ProjectContractShortView target = new ProjectContractShortView();
        target.id = source.getId();
        target.code = source.getCode();
        target.isSent = source.getIsSent();
        target.confirmed = source.getConfirmed();
        target.estimateCode = source.getEstimate().getCode();
        if (Objects.nonNull(source.getPdfFile())) {
            target.pdfFile = FileItemView.assemble(source.getPdfFile());
        }
        target.createdBy = UserShortView.assemble(source.getWriter());
        target.note = source.getNote();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
