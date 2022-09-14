package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.project_estimate.domain.RivalEstimate;
import com.howoocast.hywtl_has.project_estimate.view.RivalEstimateView;
import java.util.List;
import java.util.stream.Collectors;

public class RivalEstimateMapper {

    public static List<RivalEstimateView> toView(List<RivalEstimate> source) {
        return source.stream().map(RivalEstimateView::assemble).collect(Collectors.toList());
    }
}
