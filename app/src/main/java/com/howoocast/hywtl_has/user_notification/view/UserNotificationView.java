package com.howoocast.hywtl_has.user_notification.view;

import com.howoocast.hywtl_has.user.view.UserShortView;
import com.howoocast.hywtl_has.user_notification.domain.UserNotification;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Getter;

@Getter
public class UserNotificationView {

    private Long id;
    private String type;
    private String note;
    private String forwardUrl;
    private LocalDateTime readAt;
    private UserShortView sender;

    private String projectCode;
    private String projectName;

    private LocalDateTime createdAt;

    public static UserNotificationView assemble(UserNotification source) {
        UserNotificationView target = new UserNotificationView();
        target.id = source.getId();
        target.type = source.getType();
        target.note = source.getNote();
        target.forwardUrl = source.getForwardUrl();
        target.readAt = source.getReadAt();
        target.sender = UserShortView.assemble(source.getSender());
        if(Objects.nonNull(source.getProject())) {
            target.projectName = source.getProject().getBasic().getName();
            target.projectCode = source.getProject().getBasic().getCode();
        }
        target.createdAt = source.getCreatedAt();
        return target;
    }
}
