package com.howoocast.hywtl_has.project_db.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project_db.parameter.ProjectDbPresetParameter;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Entity
@Table(name = ProjectDbPreset.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectDbPreset extends CustomEntity {

    public static final String KEY = "project_db_filter_preset";

    @Id
    private Long id;

    private String name;

    @Column(columnDefinition = "longtext")
    private String preset;

    public static ProjectDbPreset of(
            String name,
            String preset
    ) {
        ProjectDbPreset filter = new ProjectDbPreset();
        filter.name = name;
        filter.preset = preset;
        return filter;
    }

    public void change(ProjectDbPresetParameter parameter){
        this.name = parameter.getName();
        this.preset = parameter.getPreset();
    }

}
