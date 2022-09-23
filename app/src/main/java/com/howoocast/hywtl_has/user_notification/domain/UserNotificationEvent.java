package com.howoocast.hywtl_has.user_notification.domain;

import com.howoocast.hywtl_has.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserNotificationEvent {


    private User user;
    private String type;
    private String note;
    private String forwardUrl;

    public UserNotification build() {

        return UserNotification.of(
            user,
            type,
            note,
            forwardUrl
        );
    }


}
