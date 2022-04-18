package com.howoocast.hywtl_has.common.domain;

import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.common.exception.RequestFileNotAvailableException;
import com.howoocast.hywtl_has.common.exception.RequestFileNotAvailableException.RequestFileNotAvailableExceptionType;
import com.howoocast.hywtl_has.common.repository.FileItemRepository;
import com.howoocast.hywtl_has.common.util.SHA265Generator;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String filename;

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String path;

    @NotNull
    @Column(nullable = false, updatable = false)
    private Long size;

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String ext;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime = LocalDateTime.now();

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    public static FileItem of(
        FileItemRepository repository,
        MultipartFile multipartFile,
        String dirPath,
        List<String> extWhiteList,
        Long maxFileSize
    ) {
        try {
            if (multipartFile.isEmpty()) {
                throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.IS_EMPTY);
            }
            if (multipartFile.getSize() >= maxFileSize) {
                throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.EXCEEDED_SIZE);
            }
        } catch (Exception e) {
            throw new FileSystemException(FileSystemExceptionType.IO_EXCEPTION);
        }

        File rootDir = new File(dirPath);
        if (!rootDir.exists() || rootDir.isFile()) {
            if (!rootDir.canWrite()) {
                throw new FileSystemException(FileSystemExceptionType.PERMISSION_DENIED);
            }
            if (!rootDir.mkdirs()) {
                throw new FileSystemException(FileSystemExceptionType.IO_EXCEPTION);
            }
        }

        String filename = multipartFile.getOriginalFilename();

        FileItem instance = new FileItem();
        instance.filename = filename;
        instance.setExt(extWhiteList);
        instance.setPath(dirPath);
        instance.size = multipartFile.getSize();

        try {
            instance.saveFile(multipartFile);
        } catch (Exception e) {
            instance.deleteFile();
        }

        return repository.save(instance);
    }

    private void deleteFile() {
        File file = new File(this.path);
        if (!file.exists()) {
            throw new FileSystemException(FileSystemExceptionType.NOT_FOUND);
        }
        if (!file.isFile()) {
            throw new FileSystemException(FileSystemExceptionType.NOT_FOUND);
        }
        if (!file.delete()) {
            throw new FileSystemException(FileSystemExceptionType.IO_EXCEPTION);
        }
    }

    private void setExt(final List<String> extWhiteList) {
        if (Objects.isNull(this.filename) || this.filename.isEmpty()) {
            throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.IS_EMPTY);
        }
        if (!this.filename.contains(".")) {
            throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        final String[] split = filename.split("\\.");
        if (split.length <= 1) {
            throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        String ext = split[split.length - 1].toLowerCase();
        if (!extWhiteList.stream().map(String::toLowerCase).collect(Collectors.toList()).contains(ext)) {
            throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        this.ext = ext;
    }

    private void setPath(String dirPath) {
        if (Objects.isNull(this.filename) || this.filename.isEmpty()) {
            throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.IS_EMPTY);
        }
        if (Objects.isNull(this.ext) || this.ext.isEmpty()) {
            throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        try {
            Random rd = new Random();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss_SS");
            String pepper = String.format("%s-%d", LocalDateTime.now().format(formatter), rd.nextInt(1000));
            String fileKey = SHA265Generator.make(String.format("%s-%s", filename, pepper));
            this.path = String.format("%s/%s.%s", dirPath, fileKey, this.ext);
        } catch (Exception e) {
            throw new FileSystemException(FileSystemExceptionType.IO_EXCEPTION);
        }
    }

    private void saveFile(final MultipartFile multipartFile) throws Exception {
        if (multipartFile.isEmpty()) {
            throw new RequestFileNotAvailableException(RequestFileNotAvailableExceptionType.IS_EMPTY);
        }
        File file = new File(this.path);
        if (file.exists()) {
            throw new FileSystemException(FileSystemExceptionType.ALREADY_EXISTS);
        }
        BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file));
        outputStream.write(multipartFile.getBytes());
        outputStream.flush();
        outputStream.close();
    }

}
