package com.howoocast.hywtl_has.user_verification.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import java.util.Optional;

public interface UserInvitationRepository extends CustomRepository<UserInvitation> {

    Optional<UserInvitation> findByEmail(String email);
}
