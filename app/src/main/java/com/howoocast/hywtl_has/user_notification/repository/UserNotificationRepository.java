package com.howoocast.hywtl_has.user_notification.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.user_notification.domain.UserNotification;
import java.util.List;

public interface UserNotificationRepository extends CustomRepository<UserNotification> {


    Long countByUser_IdAndReadAtIsNullOrderByCreatedAtDesc(Long userId);

    List<UserNotification> findByUser_IdOrderByCreatedAtDesc(Long userId);
}
