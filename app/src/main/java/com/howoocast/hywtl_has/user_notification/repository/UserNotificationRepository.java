package com.howoocast.hywtl_has.user_notification.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.user_notification.domain.UserNotification;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserNotificationRepository extends CustomRepository<UserNotification> {


    Long countByUser_IdAndReadAtIsNullOrderByCreatedAtDesc(Long userId);

    List<UserNotification> findByUser_IdOrderByCreatedAtDesc(Long userId);

    @Modifying
    @Query("update UserNotification n set n.readAt = current_timestamp where n.user.id = ?1 and n.readAt is null")
    void readByUser_Id(Long userId);

    @Modifying
    @Query("update UserNotification n set n.deletedAt = current_timestamp, n.deletedBy = n.user.id where n.user.id = ?1 and n.deletedAt is null")
    void deleteByUser_Id(Long userId);

    List<UserNotification> findByProject_Id(Long id);
}
