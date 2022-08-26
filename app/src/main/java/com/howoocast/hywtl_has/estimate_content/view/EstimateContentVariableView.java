package com.howoocast.hywtl_has.estimate_content.view;

import com.howoocast.hywtl_has.estimate_content.domain.EstimateContentVariable;
import lombok.Getter;

@Getter
public class EstimateContentVariableView {

    private String name;
    private String note;

    public static EstimateContentVariableView assemble(EstimateContentVariable source) {
        EstimateContentVariableView target = new EstimateContentVariableView();
        target.name = source.getName();
        target.note = source.getNote();
        return target;
    }
}
