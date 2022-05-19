package com.howoocast.hywtl_has.standard_data.test_service.view;

import com.howoocast.hywtl_has.standard_data.test_service.domain.TestServiceDetailTemplate;
import java.util.List;
import lombok.Getter;

@Getter
public class TestServiceDetailTemplateView {

    private Long id;

    private List<String> titleList;

    private String unit;

    private Long unitPrice;

    private String memo;

    public static TestServiceDetailTemplateView assemble(TestServiceDetailTemplate source) {
        TestServiceDetailTemplateView target = new TestServiceDetailTemplateView();
        target.id = source.getId();
        target.titleList = source.getTitleList();
        target.unit = source.getUnit();
        target.unitPrice = source.getUnitPrice();
        target.memo = source.getMemo();
        return target;
    }
}
