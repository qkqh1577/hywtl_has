package com.howoocast.hywtl_has.user_notification.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = UserNotification.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserNotification extends CustomEntity {

    public static final String KEY = "user_notification";

    /**
     * 수신자
     */
    @ManyToOne
    private User user;

    /**
     * 알림 타입
     */
    @NotBlank
    @Column(nullable = false, updatable = false)
    private String type;
    // 메모 알림
    // 담당자 배정
    // 담당자 배정 해제

    /**
     * 알림 설명
     */
    private String note;

    @Column(updatable = false)
    private String forwardUrl;

    /**
     * 읽은 시각
     */
    private LocalDateTime readAt;

    @Transient
    @Setter
    private User sender;

    public static UserNotification of(
        User user,
        String type,
        String note,
        String forwardUrl
    ) {
        UserNotification instance = new UserNotification();
        instance.user = user;
        instance.type = type;
        instance.note = note;
        instance.forwardUrl = forwardUrl;
        return instance;
    }

    public void read() {
        this.readAt = LocalDateTime.now();
    }


}
