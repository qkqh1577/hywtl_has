package com.howoocast.hywtl_has.file_conversion_history.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file_conversion_history.common.FileState;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
    private FileState state = FileState.WAITING;

    @OneToOne(cascade = CascadeType.ALL)
    private FileItem fileItem;

    public static FileConversionHistory of() {
        return new FileConversionHistory();
    }

    public void updateState(FileState state) {
        this.state = state;
    }
}
