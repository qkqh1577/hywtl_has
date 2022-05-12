package com.howoocast.hywtl_has.file.view;

import com.howoocast.hywtl_has.file.domain.FileItem;
import java.util.Objects;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
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
