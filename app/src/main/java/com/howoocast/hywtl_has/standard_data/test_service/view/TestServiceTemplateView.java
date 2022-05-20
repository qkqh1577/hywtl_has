package com.howoocast.hywtl_has.standard_data.test_service.view;

import com.howoocast.hywtl_has.standard_data.test_service.domain.TestServiceTemplate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class TestServiceTemplateView {

    private Long id;

    private String title;

    private String testType;

    private List<TestServiceDetailTemplateView> detailList;

    public static TestServiceTemplateView assemble(TestServiceTemplate source) {
        TestServiceTemplateView target = new TestServiceTemplateView();
        target.id = source.getId();
        target.title = source.getTitle();
        target.testType = source.getTestType();
        target.detailList = source.getDetailList().stream()
            .map(TestServiceDetailTemplateView::assemble)
            .collect(Collectors.toList());
        return target;
    }
}
