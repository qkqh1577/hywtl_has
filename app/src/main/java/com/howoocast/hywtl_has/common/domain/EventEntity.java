package com.howoocast.hywtl_has.common.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import javax.annotation.Nullable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class EventEntity {

    private final String itemName;
    private final String before;
    private final String after;

    public static EventEntity of(
        String itemName,
        @Nullable String before,
        @Nullable String after
    ) {
        return new EventEntity(
            itemName,
            before,
            after
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable User before,
        @Nullable User after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(User::getName).orElse(null),
            Optional.ofNullable(after).map(User::getName).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable FileItem before,
        @Nullable FileItem after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(FileItem::getFilename).orElse(null),
            Optional.ofNullable(after).map(FileItem::getFilename).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable Business before,
        @Nullable Business after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(Business::getName).orElse(null),
            Optional.ofNullable(after).map(Business::getName).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable ProjectComplexSite before,
        @Nullable ProjectComplexSite after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(ProjectComplexSite::getName).orElse(null),
            Optional.ofNullable(after).map(ProjectComplexSite::getName).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable ProjectComplexBuilding before,
        @Nullable ProjectComplexBuilding after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(ProjectComplexBuilding::getName).orElse(null),
            Optional.ofNullable(after).map(ProjectComplexBuilding::getName).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable ProjectDocument before,
        @Nullable ProjectDocument after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(ProjectDocument::getCode).orElse(null),
            Optional.ofNullable(after).map(ProjectDocument::getCode).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable ProjectEstimate before,
        @Nullable ProjectEstimate after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(ProjectEstimate::getCode).orElse(null),
            Optional.ofNullable(after).map(ProjectEstimate::getCode).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable Number before,
        @Nullable Number after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(Number::toString).orElse(null),
            Optional.ofNullable(after).map(Number::toString).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable LocalDate before,
        @Nullable LocalDate after
    ) {
        return EventEntity.of(
            itemName,
            before,
            after,
            "yyyy-MM-dd"
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable LocalDate before,
        @Nullable LocalDate after,
        String pattern
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(date -> date.format(formatter)).orElse(null),
            Optional.ofNullable(after).map(date -> date.format(formatter)).orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable LocalDateTime before,
        @Nullable LocalDateTime after
    ) {
        return EventEntity.of(itemName, before, after, "yyyy-MM-dd HH:mm");
    }

    public static EventEntity of(
        String itemName,
        @Nullable LocalDateTime before,
        @Nullable LocalDateTime after,
        String pattern
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(date -> date.format(formatter)).orElse(null),
            Optional.ofNullable(after).map(date -> date.format(formatter)).orElse(null)
        );
    }


    public static EventEntity of(
        String itemName,
        @Nullable Boolean before,
        @Nullable Boolean after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before).map(flag -> Boolean.TRUE.equals(flag) ? "Y" : "N").orElse(null),
            Optional.ofNullable(after).map(flag -> Boolean.TRUE.equals(flag) ? "Y" : "N").orElse(null)
        );
    }

    public static EventEntity of(
        String itemName,
        @Nullable List<String> before,
        @Nullable List<String> after
    ) {
        return new EventEntity(
            itemName,
            Optional.ofNullable(before)
                .filter(list -> !list.isEmpty())
                .flatMap(list -> list.stream().reduce((a, b) -> a + ", " + b))
                .orElse(null),
            Optional.ofNullable(after)
                .filter(list -> !list.isEmpty())
                .flatMap(list -> list.stream().reduce((a, b) -> a + ", " + b))
                .orElse(null)
        );
    }
}
