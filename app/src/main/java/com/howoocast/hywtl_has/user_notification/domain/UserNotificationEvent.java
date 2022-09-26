package com.howoocast.hywtl_has.user_notification.domain;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserNotificationEvent {


    private User user;

    private Project project;
    private String type;
    private String note;
    private String forwardUrl;

    public static UserNotificationEvent of(
        User user,
        Project project,
        String type,
        String note
    ) {
        UserNotificationEvent instance = new UserNotificationEvent();
        instance.user = user;
        instance.project = project;
        instance.type = type;
        instance.note = note;
        return instance;
    }

    public static UserNotificationEvent of(
        User user,
        Project project,
        String type,
        String note,
        String forwardUrl
    ) {
        UserNotificationEvent instance = new UserNotificationEvent();
        instance.user = user;
        instance.project = project;
        instance.type = type;
        instance.note = note;
        instance.forwardUrl = forwardUrl;
        return instance;
    }

    public UserNotification build() {

        return UserNotification.of(
            user,
            project,
            type,
            note,
            forwardUrl
        );
    }
}
