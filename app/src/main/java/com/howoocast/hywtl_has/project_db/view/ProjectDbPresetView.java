package com.howoocast.hywtl_has.project_db.view;

import com.howoocast.hywtl_has.project_db.domain.ProjectDbPreset;
import lombok.Getter;

@Getter
public class ProjectDbPresetView {
    private Long id;
    private String name;
    private String preset;

    public static ProjectDbPresetView assemble(ProjectDbPreset dbFilterPreset) {
        ProjectDbPresetView view = new ProjectDbPresetView();
        view.id = dbFilterPreset.getId();
        view.name = dbFilterPreset.getName();
        view.preset = dbFilterPreset.getPreset();
        return view;
    }

}
