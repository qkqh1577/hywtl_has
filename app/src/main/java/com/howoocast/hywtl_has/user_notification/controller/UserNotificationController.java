package com.howoocast.hywtl_has.user_notification.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.user_notification.service.UserNotificationService;
import com.howoocast.hywtl_has.user_notification.view.UserNotificationView;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class UserNotificationController {

    private final UserNotificationService service;

    @GetMapping("/user-notification/count")
    public Long count(
        Authentication authentication
    ) {
        return service.countNew(UsernameExtractor.get(authentication));
    }

    @GetMapping("/user-notification")
    public List<UserNotificationView> get(
        Authentication authentication
    ) {
        return service.findAll(UsernameExtractor.get(authentication))
            .stream().map(UserNotificationView::assemble)
            .collect(Collectors.toList());
    }

    @PostMapping("/user-notification/{id}")
    public void read(
        @PathVariable Long id
    ) {
        service.read(id);
    }

    @DeleteMapping("/user-notification/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }
}
