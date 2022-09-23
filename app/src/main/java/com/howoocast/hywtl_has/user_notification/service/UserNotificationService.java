package com.howoocast.hywtl_has.user_notification.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user_notification.domain.UserNotification;
import com.howoocast.hywtl_has.user_notification.domain.UserNotificationEvent;
import com.howoocast.hywtl_has.user_notification.repository.UserNotificationRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserNotificationService {

    private final UserNotificationRepository repository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Long countNew(String username) {
        User user = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        return repository.countByUser_IdAndReadAtIsNullOrderByCreatedAtDesc(user.getId());
    }

    @Transactional(readOnly = true)
    public List<UserNotification> findAll(String username) {
        User user = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        return repository.findByUser_IdOrderByCreatedAtDesc(user.getId())
            .stream()
            .peek(item -> item.setSender(new CustomFinder<>(userRepository, User.class).byId(item.getCreatedBy())))
            .collect(Collectors.toList());
    }

    @Transactional
    public void read(Long id) {
        this.load(id).read();
    }

    @Transactional
    public void delete(Long id) {
        this.load(id).delete();
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT, classes = UserNotificationEvent.class)
    public void add(UserNotificationEvent event) {
        repository.save(event.build());
    }

    private UserNotification load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(UserNotification.KEY, id);
        });
    }
}
