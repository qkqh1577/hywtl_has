package com.howoocast.hywtl_has.project_contract.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.CascadeType;
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
@Table(name = ProjectContract.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectContract extends CustomEntity {

    public static final String KEY = "project_contract";

    @ManyToOne
    private Project project;

    @ManyToOne
    private ProjectEstimate estimate;

    /**
     * 계약 번호
     */
    private String code;

    /**
     * 송부 여부
     */
    private Boolean isSent;

    /**
     * 송신처
     */
    private String recipient;

    /**
     * 비고
     */
    private String note;

    /**
     * 확정 여부
     */
    private Boolean confirmed;

    @OneToOne
    @JoinColumn(name = "pdf_file_id")
    private FileItem pdfFile;

    @OneToOne(cascade = CascadeType.ALL)
    private ProjectContractBasic basic;

    @OneToOne(cascade = CascadeType.ALL)
    private ProjectContractCollection collection;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectContractCondition> conditionList;

    @ManyToOne
    private User writer;

    public static ProjectContract of(
        Project project,
        ProjectEstimate estimate,
        String code,
        Boolean isSent,
        String recipient,
        String note,
        ProjectContractBasic basic,
        ProjectContractCollection collection,
        List<ProjectContractCondition> conditionList,
        User writer
    ) {
        ProjectContract instance = new ProjectContract();
        instance.project = project;
        instance.estimate = estimate;
        instance.code = code;
        instance.isSent = isSent;
        instance.recipient = recipient;
        instance.note = note;
        instance.basic = basic;
        instance.collection = collection;
        instance.conditionList = conditionList;
        instance.writer = writer;
        return instance;
    }

    public void change(
        ProjectEstimate estimate,
        Boolean isSent,
        String recipient,
        String note,
        ProjectContractBasic basic,
        ProjectContractCollection collection,
        List<ProjectContractCondition> conditionList,
        @Nullable FileItem pdfFile
    ) {
        this.estimate = estimate;
        this.isSent = isSent;
        this.recipient = recipient;
        this.note = note;
        this.basic = basic;
        this.collection = collection;
        this.conditionList = conditionList;
        this.pdfFile = pdfFile;
    }

    public void changeConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }
}
