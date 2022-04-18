package com.howoocast.hywtl_has.common.service;

import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.common.repository.FileItemRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Setter
@Component
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "application.file")
public class FileItemService {

    private String rootPath;

    private List<String> extensionList;

    private Long maxSizeLimit;

    private final FileItemRepository repository;

    public FileItem add(MultipartFile multipartFile) {
        return FileItem.of(
            repository,
            multipartFile,
            rootPath,
            extensionList,
            maxSizeLimit
        );
    }
}
