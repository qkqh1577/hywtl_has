package com.howoocast.hywtl_has.user_verification.repository;

import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import java.util.Optional;

public interface UserInvitationProvider {

    Optional<UserInvitation> findByEmail(String email);
}
