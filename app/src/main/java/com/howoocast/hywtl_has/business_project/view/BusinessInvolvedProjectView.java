package com.howoocast.hywtl_has.business_project.view;

import java.time.LocalDate;
import lombok.Getter;

@Getter
public class BusinessInvolvedProjectView {

    private Long id;
    private String name;
    private LocalDate bidBeginDate;
    private LocalDate bidCloseDate;
    private String win;
}
