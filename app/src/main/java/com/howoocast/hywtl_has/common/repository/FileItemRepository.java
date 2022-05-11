package com.howoocast.hywtl_has.common.repository;

import com.howoocast.hywtl_has.common.domain.FileItem;
import java.util.Optional;

public interface FileItemRepository extends CustomRepository<FileItem> {

    Optional<FileItem> findByFileKey(String fileKey);

}
