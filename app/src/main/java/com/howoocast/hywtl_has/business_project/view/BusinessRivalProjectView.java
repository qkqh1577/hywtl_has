package com.howoocast.hywtl_has.business_project.view;

import java.time.LocalDate;
import lombok.Getter;

@Getter
public class BusinessRivalProjectView {

    private Long id;
    private String name;
    private String involvedType; // TODO: to enum
    private String manager;
    private LocalDate beginDate;
    private LocalDate closeDate;

}
