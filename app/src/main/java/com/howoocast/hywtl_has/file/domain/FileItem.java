package com.howoocast.hywtl_has.file.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.common.exception.RequestFileNotAvailableException;
import com.howoocast.hywtl_has.common.exception.RequestFileNotAvailableException.RequestFileNotAvailableExceptionType;
import com.howoocast.hywtl_has.common.util.SHA265Generator;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@Slf4j
@Getter
@Entity
@Table(name = FileItem.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileItem extends CustomEntity {

    public static final String KEY = "file_item";

    @NotBlank
    @Column(nullable = false)
    private String filename;

    @NotBlank
    @Column(nullable = false)
    private String path;

    @NotNull
    @Column(nullable = false)
    private Long size;

    @NotBlank
    @Column(nullable = false)
    private String ext;

    @NotBlank
    @Column(nullable = false)
    private String fileKey;

    public static FileItem of(
        MultipartFile multipartFile,
        String dirPath,
        List<String> extWhiteList,
        Long maxFileSize
    ) {
        try {
            if (multipartFile.isEmpty()) {
                throw new RequestFileNotAvailableException(
                    RequestFileNotAvailableExceptionType.IS_EMPTY);
            }
            if (multipartFile.getSize() >= maxFileSize) {
                throw new RequestFileNotAvailableException(
                    RequestFileNotAvailableExceptionType.EXCEEDED_SIZE);
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
            e.printStackTrace();
        }
        return instance;
    }

    private void setExt(final List<String> extWhiteList) {
        if (Objects.isNull(this.filename) || this.filename.isEmpty()) {
            throw new RequestFileNotAvailableException(
                RequestFileNotAvailableExceptionType.IS_EMPTY);
        }
        if (!this.filename.contains(".")) {
            throw new RequestFileNotAvailableException(
                RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        final String[] split = filename.split("\\.");
        if (split.length <= 1) {
            throw new RequestFileNotAvailableException(
                RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        String ext = split[split.length - 1].toLowerCase();
        if (!extWhiteList.stream().map(String::toLowerCase).collect(Collectors.toList())
            .contains(ext)) {
            throw new RequestFileNotAvailableException(
                RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        this.ext = ext;
    }

    private void setPath(String dirPath) {
        if (Objects.isNull(this.filename) || this.filename.isEmpty()) {
            throw new RequestFileNotAvailableException(
                RequestFileNotAvailableExceptionType.IS_EMPTY);
        }
        if (Objects.isNull(this.ext) || this.ext.isEmpty()) {
            throw new RequestFileNotAvailableException(
                RequestFileNotAvailableExceptionType.NOT_ALLOWED_EXT);
        }
        try {
            Random rd = new Random();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss_SS");
            String pepper = String.format("%s-%03d", LocalDateTime.now().format(formatter),
                rd.nextInt(1000));
            String fileKey = SHA265Generator.make(String.format("%s-%s", filename, pepper));
            this.fileKey = fileKey;
            this.path = String.format("%s/%s.%s", dirPath, fileKey, this.ext);
        } catch (Exception e) {
            throw new FileSystemException(FileSystemExceptionType.IO_EXCEPTION);
        }
    }

    private void saveFile(final MultipartFile multipartFile) throws Exception {
        if (multipartFile.isEmpty()) {
            throw new RequestFileNotAvailableException(
                RequestFileNotAvailableExceptionType.IS_EMPTY);
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

    public void download(HttpServletResponse response) {
        File file = new File(this.path);
        if (!file.exists() || !file.isFile()) {
            throw new FileSystemException(FileSystemExceptionType.NOT_FOUND);
        }

        OutputStream outputStream = null;
        try {
            String encodedFileName = URLEncoder.encode(this.filename, StandardCharsets.UTF_8)
                .replace("+", "%20");
            response.setHeader("Content-Disposition",
                String.format("attachment;filename=%s", encodedFileName));
            response.setHeader("Content-Transfer-Encoding", "binary");
            outputStream = response.getOutputStream();
            Files.copy(file.toPath(), outputStream);
            response.flushBuffer();
        } catch (Exception outputStreamException) {
            throw new FileSystemException(FileSystemExceptionType.IO_EXCEPTION);
        } finally {
            if (Objects.nonNull(outputStream)) {
                try {
                    outputStream.flush();
                    outputStream.close();
                } catch (Exception closingException) {
                    log.warn("[File Service] OutputStream has error when closing. file id: {}",
                        this.id);
                }
            }
        }
    }

    public StreamingResponseBody streaming() {
        File file = new File(this.path);
        if (!file.exists() || !file.isFile()) {
            throw new FileSystemException(FileSystemExceptionType.NOT_FOUND);
        }
        final Long id = this.id;
        // TODO: is video file?
        try {
            final InputStream inputStream = new FileInputStream(file);

            return outputStream -> {
                // TODO: extract buffer size to application.yml
                byte[] b = new byte[2048];
                try {
                    while (inputStream.read(b) > 0) {
                        outputStream.write(b);
                    }
                    outputStream.flush();
                } finally {
                    try {
                        outputStream.close();
                        inputStream.close();
                    } catch (Exception e) {
                        log.warn("[File Service] OutputStream has error when closing. file id: {}",
                            id);
                    }
                }
            };
        } catch (Exception e) {
            e.printStackTrace();
            throw new FileSystemException(FileSystemExceptionType.IO_EXCEPTION);
        }

    }
}
