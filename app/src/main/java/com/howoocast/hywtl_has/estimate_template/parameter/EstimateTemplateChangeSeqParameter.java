package com.howoocast.hywtl_has.estimate_template.parameter;


import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateTemplateChangeSeqParameter {

    @NotEmpty(message = "estimate-template.id-list.not-empty")
    private List<Long> idList;

}
