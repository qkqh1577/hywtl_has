package com.howoocast.hywtl_has.estimate_content.parameter;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateContentChangeParameter {


    @NotBlank(message = EstimateContent.KEY + ".name.not_blank")
    private String name;

    @NotEmpty(message = EstimateContent.KEY + ".detail_list.not_empty")
    private List<String> detailList;
}
