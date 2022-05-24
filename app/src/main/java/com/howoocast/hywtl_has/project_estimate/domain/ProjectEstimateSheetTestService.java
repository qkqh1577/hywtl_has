package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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
@Table(name = "project_estimate_sheet_test_service")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_estimate_sheet_test_service set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateSheetTestService extends CustomEntity {

    @NotBlank
    @Column(nullable = false)
    private String title; // 용역 항목 정보


    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL)
    @OrderBy("seq asc")
    private List<ProjectEstimateSheetTestServiceDetail> detailList;

    @NotNull
    @Column(nullable = false)
    private Integer seq;


    public static ProjectEstimateSheetTestService of(
        String title,
        List<ProjectEstimateSheetTestServiceDetail> detailList,
        Integer seq
    ) {
        ProjectEstimateSheetTestService instance = new ProjectEstimateSheetTestService();
        instance.title = title;
        instance.detailList = detailList;
        instance.seq = seq;
        return instance;
    }

    public void change(
        List<ProjectEstimateSheetTestServiceDetail> detailList
    ) {
        this.detailList = detailList;
    }
}
