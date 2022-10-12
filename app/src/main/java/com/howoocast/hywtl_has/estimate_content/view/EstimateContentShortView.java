package com.howoocast.hywtl_has.estimate_content.view;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import lombok.Getter;

@Getter
public class EstimateContentShortView {

    private Long id;
    private String name;
    private List<TestType> testTypeList;
    private Integer detailCount;
    private List<String> detailList;

    public static EstimateContentShortView assemble(EstimateContent source) {
        EstimateContentShortView target = new EstimateContentShortView();
        target.id = source.getId();
        target.name = source.getName();
        target.testTypeList = source.getTestTypeList();
        target.detailList = source.getDetailList();
        target.detailCount = source.getDetailList().size();
        return target;
    }
}
