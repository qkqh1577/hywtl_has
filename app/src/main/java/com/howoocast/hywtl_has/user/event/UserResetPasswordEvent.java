package com.howoocast.hywtl_has.user.event;

import com.howoocast.hywtl_has.user.domain.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserResetPasswordEvent {

    private final User data;
}
