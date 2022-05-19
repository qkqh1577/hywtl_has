package com.howoocast.hywtl_has.standard_data.test_service.parameter;

import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestServiceTemplateChangeSeqParameter {

    @NotEmpty(message = "test-service-template.id-list.not-empty")
    private List<Long> idList;
}
