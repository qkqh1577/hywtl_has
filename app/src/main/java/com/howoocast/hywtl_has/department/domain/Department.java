package com.howoocast.hywtl_has.department.domain;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private DepartmentCategories categories;

    @NotBlank
    private String name;

    private Integer seq;

    private String memo;

    private LocalDateTime createdTime;

    private LocalDateTime removedTime;

    public Department() {
        this.createdTime = LocalDateTime.now();
    }
}
