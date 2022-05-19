package com.howoocast.hywtl_has.standard_data.test_service.parameter;

import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestServiceDetailTemplateParameter {

    private Long id;

    @NotEmpty(message = "test-service-detail-template.title-list.not-empty")
    private List<String> titleList;

    @NotBlank(message = "test-service-detail-template.unit.not-blank")
    private String unit;

    @NotNull(message = "test-service-detail-template.unit-price.not-null")
    @Min(value = 0, message = "test-service-detail-template.unit-price.positive")
    private Long unitPrice;

    private String memo;
}
