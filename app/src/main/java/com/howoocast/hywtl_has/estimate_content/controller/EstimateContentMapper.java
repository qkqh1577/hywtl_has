package com.howoocast.hywtl_has.estimate_content.controller;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.howoocast.hywtl_has.estimate_content.domain.EstimateContentVariable;
import com.howoocast.hywtl_has.estimate_content.view.EstimateContentShortView;
import com.howoocast.hywtl_has.estimate_content.view.EstimateContentVariableView;
import com.howoocast.hywtl_has.estimate_content.view.EstimateContentView;
import java.util.List;
import java.util.stream.Collectors;

public class EstimateContentMapper {

    public static List<EstimateContentShortView> toShort(List<EstimateContent> source) {
        return source.stream().map(EstimateContentShortView::assemble).collect(Collectors.toList());
    }

    public static EstimateContentView toView(EstimateContent source) {
        return EstimateContentView.assemble(source);
    }

    public static List<EstimateContentVariableView> toVariableView(List<EstimateContentVariable> source) {
        return source.stream().map(EstimateContentVariableView::assemble).collect(Collectors.toList());
    }

}
