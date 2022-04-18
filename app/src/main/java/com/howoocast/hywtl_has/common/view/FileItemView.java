package com.howoocast.hywtl_has.common.view;

import com.howoocast.hywtl_has.common.domain.FileItem;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileItemView {

    private Long id;
    private String filename;
    private Long size;
    private String ext;

    public static FileItemView assemble(FileItem source) {
        FileItemView target = new FileItemView();
        target.id = source.getId();
        target.filename = source.getFilename();
        target.size = source.getSize();
        target.ext = source.getExt();

        return target;
    }
}
