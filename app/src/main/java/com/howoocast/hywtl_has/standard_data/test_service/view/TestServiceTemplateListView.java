package com.howoocast.hywtl_has.standard_data.test_service.view;

import com.howoocast.hywtl_has.standard_data.test_service.domain.TestServiceDetailTemplate;
import com.howoocast.hywtl_has.standard_data.test_service.domain.TestServiceTemplate;
import java.util.List;
import lombok.Getter;

@Getter
public class TestServiceTemplateListView {

    private Long id;

    private String testType;

    private String title;

    private Integer detailCount;

    private Long totalPrice;

    public static TestServiceTemplateListView assemble(TestServiceTemplate source) {
        TestServiceTemplateListView target = new TestServiceTemplateListView();
        target.id = source.getId();
        target.testType = source.getTestType();
        target.title = source.getTitle();
        target.detailCount = source.getDetailList().stream()
            .map(TestServiceDetailTemplate::getTitleList)
            .map(List::size)
            .reduce(0, Integer::sum);
        target.totalPrice = source.getDetailList().stream()
            .map(TestServiceDetailTemplate::getUnitPrice)
            .reduce(0L, Long::sum);
        return target;
    }
}
