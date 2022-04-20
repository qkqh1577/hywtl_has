package com.howoocast.hywtl_has.common.view;

import com.howoocast.hywtl_has.common.domain.FileItem;
import java.util.Objects;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
public class FileItemView {

    private Long id;
    private String filename;
    private String ext;

    private String fileKey;
    private Long size;

    public static FileItemView assemble(@Nullable FileItem source) {
        if (Objects.isNull(source)) {
            return null;
        }
        FileItemView target = new FileItemView();
        target.id = source.getId();
        target.filename = source.getFilename();
        target.ext = source.getExt();
        target.fileKey = source.getFileKey();
        target.size = source.getSize();

        return target;
    }
}
