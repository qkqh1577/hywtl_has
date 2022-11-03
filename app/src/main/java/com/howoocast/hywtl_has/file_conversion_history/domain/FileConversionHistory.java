package com.howoocast.hywtl_has.file_conversion_history.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file_conversion_history.common.FileState;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

@Getter
@Entity
@Table(name = FileConversionHistory.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileConversionHistory extends CustomEntity {
    public static final String KEY = "file_conversion_history";

    @Enumerated(EnumType.STRING)
    private FileState state;

    @OneToOne
    @JoinColumn(name = "original_file_id")
    private FileItem originalFile;

    @OneToOne
    @JoinColumn(name = "converted_file_id")
    private FileItem convertedFile;

    @OneToOne
    @JoinColumn(name = "project_estimate_id")
    private ProjectEstimate projectEstimate;

    public static FileConversionHistory of(FileItem originalFile, ProjectEstimate projectEstimate) {
        FileConversionHistory result = new FileConversionHistory();
        result.originalFile = originalFile;
        result.state = FileState.WAITING;
        result.projectEstimate = projectEstimate;
        return result;
    }

    public void setConvertedFile(FileItem convertedFile) {
        this.convertedFile = convertedFile;
    }

    public void updateState(FileState state) {
        this.state = state;
    }
}
