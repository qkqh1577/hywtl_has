package com.howoocast.hywtl_has.project_collection.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectCollection.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectCollection extends CustomEntity {

    public static final String KEY = "project_collection";

    @OneToOne
    @JoinColumn
    private Project project;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "projectCollection")
    private List<ProjectCollectionStage> stageList;

    public static ProjectCollection of(
        Project project
    ) {
        ProjectCollection instance = new ProjectCollection();
        instance.project = project;
        return instance;
    }

    public List<EventEntity> updateManager(
        @Nullable User user
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "담당자 변경",
            this.user,
            user
        ));
        this.user = user;
        return eventList;
    }
}
