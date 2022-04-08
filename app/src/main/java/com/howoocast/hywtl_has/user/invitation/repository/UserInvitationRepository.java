package com.howoocast.hywtl_has.user.invitation.repository;

import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInvitationRepository extends JpaRepository<UserInvitation, Long> {

    Optional<UserInvitation> findByEmailAndDeletedTimeIsNull(String email);
}
