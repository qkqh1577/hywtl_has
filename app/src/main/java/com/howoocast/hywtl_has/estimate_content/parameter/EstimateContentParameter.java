package com.howoocast.hywtl_has.estimate_content.parameter;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateContentParameter {

    @NotBlank(message = EstimateContent.KEY + ".name.not_blank")
    private String name;

    @NotEmpty(message = EstimateContent.KEY + ".test_type_list.not_empty")
    private List<TestType> testTypeList;

    @NotEmpty(message = EstimateContent.KEY + ".detail_list.not_empty")
    private List<String> detailList;
}
