package com.howoocast.hywtl_has.estimate_content.view;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import lombok.Getter;

@Getter
public class EstimateContentView {

    private Long id;
    private String name;
    private List<TestType> testTypeList;
    private List<String> detailList;

    public static EstimateContentView assemble(EstimateContent source) {
        EstimateContentView target = new EstimateContentView();
        target.id = source.getId();
        target.name = source.getName();
        target.testTypeList = source.getTestTypeList();
        target.detailList = source.getDetailList();
        return target;
    }
}
