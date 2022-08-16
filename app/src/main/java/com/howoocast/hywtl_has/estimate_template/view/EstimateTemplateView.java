package com.howoocast.hywtl_has.estimate_template.view;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class EstimateTemplateView {

    private Long id;

    private String title;

    private TestType testType;

    private List<EstimateTemplateDetailView> detailList;


    public static EstimateTemplateView assemble(EstimateTemplate source) {
        EstimateTemplateView target = new EstimateTemplateView();
        target.id = source.getId();
        target.title = source.getTitle();
        target.testType = source.getTestType();
        target.detailList = source.getDetailList().stream()
            .map(EstimateTemplateDetailView::assemble)
            .collect(Collectors.toList());
        return target;
    }
}
