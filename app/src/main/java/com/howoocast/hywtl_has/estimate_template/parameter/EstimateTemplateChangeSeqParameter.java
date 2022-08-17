package com.howoocast.hywtl_has.estimate_template.parameter;


import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateTemplateChangeSeqParameter {

    @NotEmpty(message = EstimateTemplate.KEY + ".id_list.not_empty")
    private List<Long> idList;

}
