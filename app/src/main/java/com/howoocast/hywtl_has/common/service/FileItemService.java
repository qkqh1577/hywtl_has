package com.howoocast.hywtl_has.common.service;

import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.common.parameter.FileItemParameter;
import com.howoocast.hywtl_has.common.repository.FileItemRepository;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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

    @Nullable
    public FileItem build(@Nullable FileItemParameter params) {
        if (Objects.isNull(params)) {
            return null;
        }
        if (Objects.isNull(params.getId()) && Objects.isNull(params.getRequestDelete()) && Objects.isNull(
            params.getMultipartFile())) {
            // 요청이 전부 빈 경우
            throw new FileSystemException(FileSystemExceptionType.ILLEGAL_REQUEST);
        }

        if (Objects.nonNull(params.getId())) {
            // 요청에 파일 id가 있는 경우
            Optional<FileItem> optional = fileItemRepository.findByIdAndDeletedTimeIsNull(params.getId());
            if (Objects.isNull(params.getRequestDelete()) || !params.getRequestDelete()) {
                // 기존 파일을 그대로 사용 시
                return optional.orElseThrow(() -> new FileSystemException(FileSystemExceptionType.NOT_FOUND));
            }
            // 기존 파일 삭제 요청 시
            fileItemRepository.findByIdAndDeletedTimeIsNull(params.getId()).ifPresent(fileItem -> {
                fileItem.deleteFile();
                fileItemRepository.save(fileItem);
            });
        }

        if (Objects.isNull(params.getMultipartFile())) {
            return null;
        }

        // 신규 파일 처리
        return fileItemRepository.save(FileItem.of(
            params.getMultipartFile(),
            rootPath,
            extensionList,
            maxSizeLimit
        ));
    }
}
