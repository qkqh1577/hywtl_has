package com.howoocast.hywtl_has.common.service;

import com.howoocast.hywtl_has.common.util.Dictionary;
import com.howoocast.hywtl_has.common.util.KoreanLetterUtil;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class ExceptionMessageTest {

    private final Dictionary dictionary = new Dictionary();

    @Test
    void test() {

        Set<String> codeSet = new HashSet<>();

        codeSet.add("address.depth1.not-blank");
        codeSet.add("address.depth2.not-blank");
        codeSet.add("address.extra.for-test");
        codeSet.add("address.land-number.for-test");
        codeSet.add("address.latitude.not-null");
        codeSet.add("address.longitude.not-null");
        codeSet.add("address.place.for-test");
        codeSet.add("department.category.not-null");
        codeSet.add("department.memo.for-test");
        codeSet.add("department.name.not-blank");
        codeSet.add("department.parent-id.for-test");
        codeSet.add("department.tree.id.not-null");
        codeSet.add("department.tree.list.not-null");
        codeSet.add("department.tree.parent-id.for-test");
        codeSet.add("department.tree.seq.not-null");
        codeSet.add("file-item.id.for-test");
        codeSet.add("file-item.multipart-file.for-test");
        codeSet.add("file-item.request-delete.for-test");
        codeSet.add("personnel.academic-list.for-test");
        codeSet.add("personnel.academic.academy-name.not-blank");
        codeSet.add("personnel.academic.degree.for-test");
        codeSet.add("personnel.academic.end-date.not-null");
        codeSet.add("personnel.academic.grade.for-test");
        codeSet.add("personnel.academic.major.not-blank");
        codeSet.add("personnel.academic.start-date.not-null");
        codeSet.add("personnel.academic.state.not-blank");
        codeSet.add("personnel.basic.address.for-test");
        codeSet.add("personnel.basic.birth-date.not-null");
        codeSet.add("personnel.basic.emergency-phone.for-test");
        codeSet.add("personnel.basic.eng-name.not-blank");
        codeSet.add("personnel.basic.image.for-test");
        codeSet.add("personnel.basic.not-null");
        codeSet.add("personnel.basic.personal-email.for-test");
        codeSet.add("personnel.basic.phone.for-test");
        codeSet.add("personnel.basic.relationship.for-test");
        codeSet.add("personnel.basic.sex.not-blank");
        codeSet.add("personnel.career-list.for-test");
        codeSet.add("personnel.career.company-name.not-blank");
        codeSet.add("personnel.career.end-date.not-null");
        codeSet.add("personnel.career.major-job.not-blank");
        codeSet.add("personnel.career.start-date.not-null");
        codeSet.add("personnel.company.hired-date.not-null");
        codeSet.add("personnel.company.hired-type.not-blank");
        codeSet.add("personnel.company.not-null");
        codeSet.add("personnel.company.recommender.for-test");
        codeSet.add("personnel.id.not-null");
        codeSet.add("personnel.job.department-id.not-null");
        codeSet.add("personnel.job.job-class.for-test");
        codeSet.add("personnel.job.job-duty.for-test");
        codeSet.add("personnel.job.job-position.not-blank");
        codeSet.add("personnel.job.job-title.not-blank");
        codeSet.add("personnel.job.job-type.not-blank");
        codeSet.add("personnel.job.list.not-empty");
        codeSet.add("personnel.language-list.for-test");
        codeSet.add("personnel.language.certified-date.not-null");
        codeSet.add("personnel.language.expiry-period.for-test");
        codeSet.add("personnel.language.grade.for-test");
        codeSet.add("personnel.language.name.not-blank");
        codeSet.add("personnel.language.organization-name.not-blank");
        codeSet.add("personnel.language.training-period.for-test");
        codeSet.add("personnel.language.type.not-blank");
        codeSet.add("personnel.license-list.for-test");
        codeSet.add("personnel.license.memo.for-test");
        codeSet.add("personnel.license.name.not-blank");
        codeSet.add("personnel.license.organization-name.not-blank");
        codeSet.add("personnel.license.qualified-date.not-null");
        codeSet.add("personnel.license.qualified-number.not-blank");
        codeSet.add("personnel.license.type.for-test");
        codeSet.add("project-comment.description.not-blank");
        codeSet.add("project-comment.project-id.not-null");
        codeSet.add("project-order.amount.positive");
        codeSet.add("project-order.beginDate.for-test");
        codeSet.add("project-order.clientManager.for-test");
        codeSet.add("project-order.closeDate.for-test");
        codeSet.add("project-order.isOnGoing.for-test");
        codeSet.add("project-order.receivedDate.for-test");
        codeSet.add("project-basic.address.for-test");
        codeSet.add("project-basic.alias.for-test");
        codeSet.add("project-basic.baseCount.for-test");
        codeSet.add("project-basic.buildingCount.for-test");
        codeSet.add("project-basic.clientEmail.for-test");
        codeSet.add("project-basic.clientManager.for-test");
        codeSet.add("project-basic.clientName.for-test");
        codeSet.add("project-basic.clientPhone.for-test");
        codeSet.add("project-basic.code.not-blank");
        codeSet.add("project-basic.floorCount.for-test");
        codeSet.add("project-basic.householdCount.for-test");
        codeSet.add("project-basic.isClientLH.for-test");
        codeSet.add("project-basic.lotArea.for-test");
        codeSet.add("project-basic.name.not-blank");
        codeSet.add("project-basic.project-manager-id.not-null");
        codeSet.add("project-basic.purpose1.for-test");
        codeSet.add("project-basic.purpose2.for-test");
        codeSet.add("project-basic.sales-manager-id.not-null");
        codeSet.add("project-basic.status.not-null");
        codeSet.add("project-basic.totalArea.for-test");
        codeSet.add("project.estimate.figure-level.for-test");
        codeSet.add("project.estimate.received-date.for-test");
        codeSet.add("project.estimate.report-level.for-test");
        codeSet.add("project.estimate.sheet.comment-list.not-empty");
        codeSet.add("project.estimate.sheet.comment.description.not-blank");
        codeSet.add("project.estimate.sheet.comment.in-use.not-null");
        codeSet.add("project.estimate.sheet.comment.seq.not-null");
        codeSet.add("project.estimate.sheet.confirm.not-null");
        codeSet.add("project.estimate.sheet.detail-list.not-empty");
        codeSet.add("project.estimate.sheet.detail.count.not-null");
        codeSet.add("project.estimate.sheet.detail.count.positive");
        codeSet.add("project.estimate.sheet.detail.is-included.not-null");
        codeSet.add("project.estimate.sheet.detail.memo.for-test");
        codeSet.add("project.estimate.sheet.detail.seq.not-null");
        codeSet.add("project.estimate.sheet.detail.seq.positive");
        codeSet.add("project.estimate.sheet.detail.sub-title-list.not-empty");
        codeSet.add("project.estimate.sheet.detail.title.not-blank");
        codeSet.add("project.estimate.sheet.detail.total-price.not-null");
        codeSet.add("project.estimate.sheet.detail.total-price.positive");
        codeSet.add("project.estimate.sheet.detail.unit-price.not-null");
        codeSet.add("project.estimate.sheet.detail.unit-price.positive");
        codeSet.add("project.estimate.sheet.detail.unit.not-blank");
        codeSet.add("project.estimate.sheet.estimate-date.not-null");
        codeSet.add("project.estimate.sheet.expected-start-month.for-test");
        codeSet.add("project.estimate.sheet.memo.for-test");
        codeSet.add("project.estimate.sheet.project-target-review-id.not-null");
        codeSet.add("project.estimate.sheet.sales-management-leader-id.for-test");
        codeSet.add("project.estimate.sheet.sales-team-leader-id.not-null");
        codeSet.add("project.estimate.sheet.special-discount.for-test");
        codeSet.add("project.estimate.sheet.status.not-null");
        codeSet.add("project.estimate.sheet.title.not-blank");
        codeSet.add("project.estimate.test-level.for-test");
        codeSet.add("project-target-document.file-item.not-null");
        codeSet.add("project-target-document.memo.for-test");
        codeSet.add("project-target.land-figure-count.positive");
        codeSet.add("project-target-review.code.not-blank");
        codeSet.add("project-target-review.detail-list.not-empty");
        codeSet.add("project-target-review.detail.area.not-null");
        codeSet.add("project-target-review.detail.area.positive");
        codeSet.add("project-target-review.detail.base-count.for-test");
        codeSet.add("project-target-review.detail.building-name.not-blank");
        codeSet.add("project-target-review.detail.floor-count.not-null");
        codeSet.add("project-target-review.detail.height.not-null");
        codeSet.add("project-target-review.detail.height.positive");
        codeSet.add("project-target-review.detail.memo1.for-test");
        codeSet.add("project-target-review.detail.memo2.for-test");
        codeSet.add("project-target-review.detail.special-wind-load-condition-list.for-test");
        codeSet.add("project-target-review.detail.test-list.not-empty");
        codeSet.add("project-target-review.id.for-test");
        codeSet.add("project-target-review.status.not-null");
        codeSet.add("project-target-review.test-list.for-test");
        codeSet.add("user-verification.department-id.not-null");
        codeSet.add("user-verification.email.not-blank");
        codeSet.add("user-verification.name.not-blank");
        codeSet.add("user-verification.user-role.not-null");
        codeSet.add("user.auth-key.not-blank");
        codeSet.add("user.department-id.not-null");
        codeSet.add("user.email.not-blank");
        codeSet.add("user.name.not-blank");
        codeSet.add("user.new-password.not-blank");
        codeSet.add("user.now-password.not-blank");
        codeSet.add("user.password.not-blank");
        codeSet.add("user.user-role.not-null");
        codeSet.add("user.username.not-blank");

        List<String> codeList = new ArrayList<>(codeSet);
        codeList.sort(String::compareTo);

        for (String code : codeList) {
            log.debug("code: {}, message: {}", code, getMessage(code));
        }
    }

    String getMessage(final String code) {

        String[] split = code.split("\\.");
        String errorType = split[split.length - 1];
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < split.length - 1; i++) {
            builder.append(split[i]);
            if (i < split.length - 2) {
                builder.append(".");
            }
        }

        String message = builder.toString();

        Set<String> keySet = dictionary.keySet();
        Set<String> nextSet = new HashSet<>();

        for (String key : keySet) {
            if (key.contains(".")) {
                if (message.contains(key)) {
                    message = message.replace(key, dictionary.get(key));
                }
            } else {
                nextSet.add(key);
            }
        }

        keySet = nextSet;
        nextSet = new HashSet<>();
        message = message.replace(".", " ");
        for (String key : keySet) {
            if (key.contains("-")) {
                if (message.contains(key)) {
                    message = message.replace(key, dictionary.get(key));
                }
            } else {
                nextSet.add(key);
            }
        }

        message = message.replace("-", " ");
        String[] leftSplit = message.split(" ");
        StringBuilder messageBuilder = new StringBuilder();
        for (String key : leftSplit) {
            String text = dictionary.get(key);
            if (Objects.isNull(text)) {
                messageBuilder.append(key);
            } else {
                messageBuilder.append(text);
            }
            messageBuilder.append(" ");
        }
        message = messageBuilder.toString().trim();

        return String.format("%s%s %s 항목입니다.",
            message,
            KoreanLetterUtil.auxiliaryPostPosition(message),
            dictionary.get(errorType)
        );
    }


}
