package com.howoocast.hywtl_has.file.service;

import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.file.repository.FileItemRepository;
import com.howoocast.hywtl_has.file_conversion_history.common.FileState;
import com.howoocast.hywtl_has.file_conversion_history.domain.FileConversionHistory;
import com.howoocast.hywtl_has.file_conversion_history.repository.FileConversionHistoryRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.lang.Nullable;
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

    private final FileConversionHistoryRepository fileConversionHistoryRepository;

    @Transactional(readOnly = true)
    public FileItem get(Long id) {
        return fileItemRepository.findById(id)
            .orElseThrow(() -> new FileSystemException(FileSystemExceptionType.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public FileItem getByFileKey(String fileKey) {
        return fileItemRepository.findByFileKey(fileKey)
            .orElseThrow(() -> new FileSystemException(FileSystemExceptionType.NOT_FOUND));
    }

    @Nullable
    public FileItem build(@Nullable MultipartFile file) {
        if (Objects.isNull(file) || file.isEmpty()) {
            return null;
        }
        return fileItemRepository.save(FileItem.of(
            file,
            rootPath,
            extensionList,
            maxSizeLimit
        ));
    }

    @Nullable
    public FileItem build(@Nullable FileItemParameter parameter) {
        if (Objects.isNull(parameter)) {
            return null;
        }
        if (Objects.isNull(parameter.getId()) && Objects.isNull(parameter.getRequestDelete())
            && Objects.isNull(
            parameter.getMultipartFile())) {
            // 요청이 전부 빈 경우
            throw new FileSystemException(FileSystemExceptionType.ILLEGAL_REQUEST);
        }

        if (Objects.nonNull(parameter.getId())) {
            // 요청에 파일 id가 있는 경우
            Optional<FileItem> optional = fileItemRepository.findById(
                parameter.getId());
            if (Objects.isNull(parameter.getRequestDelete()) || !parameter.getRequestDelete()) {
                // 기존 파일을 그대로 사용 시
                return optional.orElseThrow(
                    () -> new FileSystemException(FileSystemExceptionType.NOT_FOUND));
            }
            // 기존 파일 삭제 요청 시
            fileItemRepository.findById(parameter.getId()).ifPresent(FileItem::delete);
        }

        if (Objects.isNull(parameter.getMultipartFile())) {
            return null;
        }

        // 신규 파일 처리
        return fileItemRepository.save(FileItem.of(
            parameter.getMultipartFile(),
            rootPath,
            extensionList,
            maxSizeLimit
        ));
    }

    public FileItem getByProjectEstimateId(Long projectEstimateId) {
        FileConversionHistory history = fileConversionHistoryRepository.findTopByProjectEstimateIdOrderByCreatedAtDesc(
            projectEstimateId);
        if (Objects.isNull(history)) {
            throw new FileSystemException(FileSystemExceptionType.NOT_FOUND);
        }

        return getFileItem(history, "pdf");
    }

    public FileItem getByProjectContractId(Long projectContractId, String type) {
        FileConversionHistory history = fileConversionHistoryRepository.findTopByProjectContractIdOrderByCreatedAtDesc(
            projectContractId);
        if (Objects.isNull(history)) {
            throw new FileSystemException(FileSystemExceptionType.NOT_FOUND);
        }
        return getFileItem(history, type);
    }

    private FileItem getFileItem(FileConversionHistory history, String type) {
        if (history.getState() == FileState.FAIL) {
            throw new FileSystemException(FileSystemExceptionType.FAILED_TO_CONVERT);
        } else if (history.getState() == FileState.WAITING) {
            throw new FileSystemException(FileSystemExceptionType.IS_CONVERTING);
        }
        if (StringUtils.equals(type, "word")) {
            return get(history.getOriginalFile().getId());
        }
        return get(history.getConvertedFile().getId());
    }

    @Transactional
    public void convertToPDF(FileItemParameter file, ProjectSystemEstimate projectEstimate) throws IOException {
        FileItem wordFileItem = build(file);
        File wordFile = new File(wordFileItem.getPath());
        FileConversionHistory history = fileConversionHistoryRepository.save(
            FileConversionHistory.of(wordFileItem, projectEstimate));
        fileItemRepository.save(FileItem.of(
            wordFile,
            rootPath,
            extensionList,
            maxSizeLimit,
            wordFileItem.getFilename().replace(".docx", ".pdf"),
            history
        ));
    }

    @Transactional
    public void convertToContractPDF(FileItemParameter file, ProjectContract projectContract) throws IOException {
        FileItem wordFileItem = build(file);
        File wordFile = new File(wordFileItem.getPath());
        FileConversionHistory history = fileConversionHistoryRepository.save(
            FileConversionHistory.of(wordFileItem, projectContract));
        fileItemRepository.save(FileItem.of(
            wordFile,
            rootPath,
            extensionList,
            maxSizeLimit,
            wordFileItem.getFilename().replace(".docx", ".pdf"),
            history
        ));
    }
}
