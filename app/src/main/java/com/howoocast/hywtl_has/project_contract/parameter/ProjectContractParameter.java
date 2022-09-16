package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractParameter {

    private Long estimateId;
    private Boolean isSent;
    private String recipient;
    private String note;
    private FileItemParameter pdfFile;
    private ProjectContractBasicParameter basic;
    private ProjectContractCollectionParameter collection;
    private List<ProjectContractConditionParameter> conditionList;

}
