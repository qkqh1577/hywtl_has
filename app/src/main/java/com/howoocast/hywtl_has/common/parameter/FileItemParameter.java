package com.howoocast.hywtl_has.common.parameter;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FileItemParameter {

    private Long id;

    private Boolean requestDelete;

    private MultipartFile multipartFile;
}
