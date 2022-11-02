package com.howoocast.hywtl_has.file.service;

import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.file.repository.FileItemRepository;
import com.howoocast.hywtl_has.file_conversion_history.domain.FileConversionHistory;
import com.howoocast.hywtl_has.file_conversion_history.repository.FileConversionHistoryRepository;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

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

    @Transactional
    public FileItem convertToPDF(MultipartFile file) throws IOException {
        FileItem wordFileItem = build(file);
        File wordFile = new File(wordFileItem.getPath());
        FileConversionHistory history = fileConversionHistoryRepository.save(FileConversionHistory.of());
        return fileItemRepository.save(FileItem.of(
            wordFile,
            rootPath,
            extensionList,
            maxSizeLimit,
            wordFileItem.getFilename().replace(".docx", ".pdf"),
            history
        ));
    }
    private File convertToFile(MultipartFile file) throws IOException {
        File word = new File(Objects.requireNonNull(file.getOriginalFilename()));
        word.createNewFile();
        FileOutputStream fos = new FileOutputStream(word);
        fos.write(file.getBytes());
        fos.close();
        return word;
    }

    @Nullable
    private MultipartFile convertToMultipartFile(@Nullable File pdf) throws IOException {
        if(Objects.isNull(pdf)) {
            return null;
        }
        DiskFileItem pdfFileItem =new DiskFileItem(
            "file",
            Files.probeContentType(pdf.toPath()),
            false,
            pdf.getName(),
            (int) pdf.length(),
            pdf.getParentFile()
        );
        InputStream input =new FileInputStream(pdf);
        OutputStream os = pdfFileItem.getOutputStream();
        IOUtils.copy(input, os);

        return new CommonsMultipartFile(pdfFileItem);
    }
}
