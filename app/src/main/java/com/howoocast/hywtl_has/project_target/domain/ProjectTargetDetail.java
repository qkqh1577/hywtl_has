package com.howoocast.hywtl_has.project_target.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = "project_target_detail")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_target_detail set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetDetail extends CustomEntity {

    @NotBlank
    @Column(nullable = false)
    private String buildingName; // 건물(동)

    @ElementCollection
    private List<String> testList; // 실험 종류

    private String memo; // 비고

    public static ProjectTargetDetail of(
        String buildingName,
        List<String> testList,
        String memo
    ) {
        ProjectTargetDetail instance = new ProjectTargetDetail();
        instance.buildingName = buildingName;
        instance.testList = testList;
        instance.memo = memo;
        return instance;
    }

    public void change(
        String buildingName,
        List<String> testList,
        String memo
    ) {
        this.buildingName = buildingName;
        this.testList = testList;
        this.memo = memo;
    }
}
