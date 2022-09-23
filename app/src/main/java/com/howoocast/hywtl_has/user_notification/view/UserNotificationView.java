package com.howoocast.hywtl_has.user_notification.view;

import com.howoocast.hywtl_has.user.view.UserShortView;
import com.howoocast.hywtl_has.user_notification.domain.UserNotification;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class UserNotificationView {

    private Long id;
    private String type;
    private String note;
    private String forwardUrl;
    private LocalDateTime readAt;
    private UserShortView sender;

    public static UserNotificationView assemble(UserNotification source) {
        UserNotificationView target = new UserNotificationView();
        target.id = source.getId();
        target.type = source.getType();
        target.note = source.getNote();
        target.forwardUrl = source.getForwardUrl();
        target.readAt = source.getReadAt();
        target.sender = UserShortView.assemble(source.getSender());
        return target;
    }
}
