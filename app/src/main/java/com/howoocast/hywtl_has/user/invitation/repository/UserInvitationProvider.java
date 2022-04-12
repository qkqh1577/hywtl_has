package com.howoocast.hywtl_has.user.invitation.repository;

import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import java.util.Optional;

public interface UserInvitationProvider {

    Optional<UserInvitation> findByEmail(String email);
}
