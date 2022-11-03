package com.howoocast.hywtl_has.project_db.parameter;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ProjectDbPresetParameter {

    @NotBlank
    private String name;
    @NotNull
    private String preset;

    @Override
    public String toString() {
        return "ProjectDbFilterPresetParameter{" +
                "name='" + name + '\'' +
                ", preset='" + preset + '\'' +
                '}';
    }
}
