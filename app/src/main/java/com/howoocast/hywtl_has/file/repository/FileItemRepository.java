package com.howoocast.hywtl_has.file.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.file.domain.FileItem;
import java.util.Optional;

public interface FileItemRepository extends CustomRepository<FileItem> {

    Optional<FileItem> findByFileKey(String fileKey);

}
