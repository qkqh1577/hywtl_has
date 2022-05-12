package com.howoocast.hywtl_has.common.service;

import com.howoocast.hywtl_has.common.util.Dictionary;
import com.howoocast.hywtl_has.common.util.KoreanLetterUtil;
import java.util.HashSet;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class ExceptionMessageTest {

    private final Dictionary dictionary = new Dictionary();

    @Test
    void test() {

        Set<String> codeList = new HashSet<>();
        codeList.add("project.estimate.sheet.detail.title.not-blank");
        codeList.add("project.estimate.sheet.detail.sub-title-list.not-empty");
        codeList.add("project.estimate.sheet.detail.seq.not-null");
        codeList.add("project.estimate.sheet.detail.seq.positive");
        codeList.add("project.estimate.sheet.detail.unit.not-blank");
        codeList.add("project.estimate.sheet.detail.count.not-null");
        codeList.add("project.estimate.sheet.detail.count.positive");
        codeList.add("project.estimate.sheet.detail.unit-price.not-null");
        codeList.add("project.estimate.sheet.detail.unit-price.positive");
        codeList.add("project.estimate.sheet.detail.total-price.not-null");
        codeList.add("project.estimate.sheet.detail.total-price.positive");
        codeList.add("project.estimate.sheet.detail.is-included.not-null");
        codeList.add("project.estimate.sheet.confirm.not-null");
        codeList.add("project.estimate.sheet.status.not-null");
        codeList.add("project.estimate.sheet.title.not-blank");
        codeList.add("project.estimate.sheet.estimate-date.not-null");
        codeList.add("project.estimate.sheet.sales-team-leader-id.not-null");
        codeList.add("project.estimate.sheet.project.target.review-id.not-null");
        codeList.add("project.estimate.sheet.detail-list.not-empty");
        codeList.add("project.estimate.sheet.comment-list.not-empty");
        codeList.add("project.estimate.sheet.comment.seq.not-null");
        codeList.add("project.estimate.sheet.comment.description.not-blank");
        codeList.add("project.estimate.sheet.comment.in-use.not-null");

        codeList.add("address.depth1.not-blank");
        codeList.add("address.depth2.not-blank");
        codeList.add("address.latitude.not-null");
        codeList.add("address.longitude.not-null");
        codeList.add("department.category.not-null");
        codeList.add("department.name.not-blank");
        codeList.add("department.tree.id.not-null");
        codeList.add("department.tree.list.not-null");
        codeList.add("department.tree.seq.not-null");
        codeList.add("personnel.academic.academy-name.not-blank");
        codeList.add("personnel.academic.end-date.not-null");
        codeList.add("personnel.academic.major.not-blank");
        codeList.add("personnel.academic.start-date.not-null");
        codeList.add("personnel.academic.state.not-blank");
        codeList.add("personnel.basic.birth-date.not-null");
        codeList.add("personnel.basic.eng-name.not-blank");
        codeList.add("personnel.basic.not-null");
        codeList.add("personnel.basic.sex.not-blank");
        codeList.add("personnel.career.company-name.not-blank");
        codeList.add("personnel.career.end-date.not-null");
        codeList.add("personnel.career.major-job.not-blank");
        codeList.add("personnel.career.start-date.not-null");
        codeList.add("personnel.company.hired-date.not-null");
        codeList.add("personnel.company.hired-type.not-blank");
        codeList.add("personnel.company.not-null");
        codeList.add("personnel.id.not-null");
        codeList.add("personnel.job.department-id.not-null");
        codeList.add("personnel.job.job-position.not-blank");
        codeList.add("personnel.job.job-title.not-blank");
        codeList.add("personnel.job.job-type.not-blank");
        codeList.add("personnel.job.list.not-empty");
        codeList.add("personnel.language.certified-date.not-null");
        codeList.add("personnel.language.name.not-blank");
        codeList.add("personnel.language.organization-name.not-blank");
        codeList.add("personnel.language.type.not-blank");
        codeList.add("personnel.license.name.not-blank");
        codeList.add("personnel.license.organization-name.not-blank");
        codeList.add("personnel.license.qualified-date.not-null");
        codeList.add("personnel.license.qualified-number.not-blank");
        codeList.add("project-comment.description.not-blank");
        codeList.add("project-comment.project-id.not-null");
        codeList.add("project.basic.code.not-blank");
        codeList.add("project.basic.name.not-blank");
        codeList.add("project.basic.project-manager-id.not-null");
        codeList.add("project.basic.sales-manager-id.not-null");
        codeList.add("project.basic.status.not-null");
        codeList.add("project.target.document.file-item.not-null");
        codeList.add("project.target.review.confirmed.not-null");
        codeList.add("project.target.review.detail-list.not-empty");
        codeList.add("project.target.review.detail.area.not-null");
        codeList.add("project.target.review.detail.area.positive");
        codeList.add("project.target.review.detail.building-name.not-blank");
        codeList.add("project.target.review.detail.floor-count.not-null");
        codeList.add("project.target.review.detail.height.not-null");
        codeList.add("project.target.review.detail.height.positive");
        codeList.add("project.target.review.detail.test-list.not-empty");
        codeList.add("project.target.review.status.not-null");
        codeList.add("project.target.review.title.not-blank");
        codeList.add("user-verification.department-id.not-null");
        codeList.add("user-verification.email.not-blank");
        codeList.add("user-verification.name.not-blank");
        codeList.add("user-verification.user-role.not-null");
        codeList.add("user.auth-key.not-blank");
        codeList.add("user.department-id.not-null");
        codeList.add("user.email.not-blank");
        codeList.add("user.name.not-blank");
        codeList.add("user.new-password.not-blank");
        codeList.add("user.now-password.not-blank");
        codeList.add("user.password.not-blank");
        codeList.add("user.user-role.not-null");
        codeList.add("user.username.not-blank");

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

        keySet = nextSet;
        message = message.replace("-", " ");
        for (String key : keySet) {
            if (message.contains(key)) {
                message = message.replace(key, dictionary.get(key));
            }
        }
        return String.format("%s%s %s 항목입니다.",
            message,
            KoreanLetterUtil.auxiliaryPostPosition(message),
            dictionary.get(errorType)
        );
    }


}
