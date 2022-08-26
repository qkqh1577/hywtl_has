package com.howoocast.hywtl_has.estimate_content.parameter;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateContentChangeSequenceParameter {

    @NotEmpty(message = EstimateContent.KEY + ".id_list.not_empty")
    private List<Long> idList;
}
