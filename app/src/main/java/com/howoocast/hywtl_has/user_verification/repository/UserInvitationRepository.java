package com.howoocast.hywtl_has.user_verification.repository;

import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInvitationRepository extends JpaRepository<UserInvitation, Long> {

    Optional<UserInvitation> findByEmailAndDeletedAtIsNull(String email);
}
