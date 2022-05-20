package com.howoocast.hywtl_has.standard_data.test_service.parameter;

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestServiceTemplateParameter {

    @NotBlank(message = "test-service-template.title.not-blank")
    private String title;

    @NotBlank(message = "test-service-template.test-type.not-blank")
    private String testType;

    @NotEmpty(message = "test-service-template.detail-list.not-empty")
    private List<TestServiceDetailTemplateParameter> detailList;
}
