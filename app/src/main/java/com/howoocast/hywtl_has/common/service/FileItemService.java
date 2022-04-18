package com.howoocast.hywtl_has.common.service;

import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.common.repository.FileItemRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
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

    private final FileItemRepository fileItemRepository;

    @Transactional(readOnly = true)
    public FileItem get(Long id) {
        return fileItemRepository.findByIdAndDeletedTimeIsNull(id)
            .orElseThrow(() -> new FileSystemException(FileSystemExceptionType.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public FileItem getByFileKey(String fileKey) {
        return fileItemRepository.findByFileKeyAndDeletedTimeIsNull(fileKey)
            .orElseThrow(() -> new FileSystemException(FileSystemExceptionType.NOT_FOUND));
    }

    @Transactional
    public FileItem add(MultipartFile multipartFile) {
        return fileItemRepository.save(FileItem.of(
            multipartFile,
            rootPath,
            extensionList,
            maxSizeLimit
        ));
    }
}
