package com.howoocast.hywtl_has.estimate_template.view;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplateDetail;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import lombok.Getter;

@Getter
public class EstimateTemplateShortView {


    private Long id;

    private TestType testType;

    private String title;

    private Integer detailCount;

    private Long totalAmount;


    public static EstimateTemplateShortView assemble(EstimateTemplate source) {
        EstimateTemplateShortView target = new EstimateTemplateShortView();
        target.id = source.getId();
        target.testType = source.getTestType();
        target.title = source.getTitle();
        target.detailCount = source.getDetailList().stream()
            .map(EstimateTemplateDetail::getTitleList)
            .map(List::size)
            .reduce(0, Integer::sum);
        target.totalAmount = source.getDetailList().stream()
            .map(EstimateTemplateDetail::getUnitAmount)
            .reduce(0L, Long::sum);
        return target;
    }
}
