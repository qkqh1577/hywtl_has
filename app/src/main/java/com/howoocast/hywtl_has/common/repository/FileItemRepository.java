package com.howoocast.hywtl_has.common.repository;

import com.howoocast.hywtl_has.common.domain.FileItem;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileItemRepository extends JpaRepository<FileItem, Long> {

    Optional<FileItem> findByIdAndDeletedTimeIsNull(Long id);

    Optional<FileItem> findByFileKeyAndDeletedTimeIsNull(String fileKey);
}
