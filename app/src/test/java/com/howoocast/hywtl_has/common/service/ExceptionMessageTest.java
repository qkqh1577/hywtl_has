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

        codeSet.add("address.depth1.not_blank");
        codeSet.add("address.depth2.not_blank");
        codeSet.add("address.extra.for_test");
        codeSet.add("address.land_number.for_test");
        codeSet.add("address.latitude.not_null");
        codeSet.add("address.longitude.not_null");
        codeSet.add("address.place.for_test");
        codeSet.add("department.category.not_null");
        codeSet.add("department.note.for_test");
        codeSet.add("department.name.not_blank");
        codeSet.add("department.parent_id.for_test");
        codeSet.add("department.tree.id.not_null");
        codeSet.add("department.tree.list.not_null");
        codeSet.add("department.tree.parent_id.for_test");
        codeSet.add("department.tree.seq.not_null");
        codeSet.add("file_item.id.for_test");
        codeSet.add("file_item.multipart_file.for_test");
        codeSet.add("file_item.request_delete.for_test");
        codeSet.add("personnel.academic_list.for_test");
        codeSet.add("personnel.academic.academy_name.not_blank");
        codeSet.add("personnel.academic.degree.for_test");
        codeSet.add("personnel.academic.end_date.not_null");
        codeSet.add("personnel.academic.grade.for_test");
        codeSet.add("personnel.academic.major.not_blank");
        codeSet.add("personnel.academic.start_date.not_null");
        codeSet.add("personnel.academic.state.not_blank");
        codeSet.add("personnel.basic.address.for_test");
        codeSet.add("personnel.basic.birth_date.not_null");
        codeSet.add("personnel.basic.emergency_phone.for_test");
        codeSet.add("personnel.basic.eng_name.not_blank");
        codeSet.add("personnel.basic.image.for_test");
        codeSet.add("personnel.basic.not_null");
        codeSet.add("personnel.basic.personal_email.for_test");
        codeSet.add("personnel.basic.phone.for_test");
        codeSet.add("personnel.basic.relationship.for_test");
        codeSet.add("personnel.basic.sex.not_blank");
        codeSet.add("personnel.career_list.for_test");
        codeSet.add("personnel.career.company_name.not_blank");
        codeSet.add("personnel.career.end_date.not_null");
        codeSet.add("personnel.career.major_job.not_blank");
        codeSet.add("personnel.career.start_date.not_null");
        codeSet.add("personnel.company.hired_date.not_null");
        codeSet.add("personnel.company.hired_type.not_blank");
        codeSet.add("personnel.company.not_null");
        codeSet.add("personnel.company.recommender.for_test");
        codeSet.add("personnel.id.not_null");
        codeSet.add("personnel.job.department_id.not_null");
        codeSet.add("personnel.job.job_class.for_test");
        codeSet.add("personnel.job.job_duty.for_test");
        codeSet.add("personnel.job.job_position.not_blank");
        codeSet.add("personnel.job.job_title.not_blank");
        codeSet.add("personnel.job.job_type.not_blank");
        codeSet.add("personnel.job.list.not_empty");
        codeSet.add("personnel.language_list.for_test");
        codeSet.add("personnel.language.certified_date.not_null");
        codeSet.add("personnel.language.expiry_period.for_test");
        codeSet.add("personnel.language.grade.for_test");
        codeSet.add("personnel.language.name.not_blank");
        codeSet.add("personnel.language.organization_name.not_blank");
        codeSet.add("personnel.language.training_period.for_test");
        codeSet.add("personnel.language.type.not_blank");
        codeSet.add("personnel.license_list.for_test");
        codeSet.add("personnel.license.note.for_test");
        codeSet.add("personnel.license.name.not_blank");
        codeSet.add("personnel.license.organization_name.not_blank");
        codeSet.add("personnel.license.qualified_date.not_null");
        codeSet.add("personnel.license.qualified_number.not_blank");
        codeSet.add("personnel.license.type.for_test");
        codeSet.add("project_comment.description.not_blank");
        codeSet.add("project_comment.project_id.not_null");
        codeSet.add("project_order.amount.positive");
        codeSet.add("project_order.beginDate.for_test");
        codeSet.add("project_order.clientManager.for_test");
        codeSet.add("project_order.closeDate.for_test");
        codeSet.add("project_order.isOnGoing.for_test");
        codeSet.add("project_order.receivedDate.for_test");
        codeSet.add("project_basic.address.for_test");
        codeSet.add("project_basic.alias.for_test");
        codeSet.add("project_basic.baseCount.for_test");
        codeSet.add("project_basic.buildingCount.for_test");
        codeSet.add("project_basic.clientEmail.for_test");
        codeSet.add("project_basic.clientManager.for_test");
        codeSet.add("project_basic.clientName.for_test");
        codeSet.add("project_basic.clientPhone.for_test");
        codeSet.add("project_basic.code.not_blank");
        codeSet.add("project_basic.floorCount.for_test");
        codeSet.add("project_basic.householdCount.for_test");
        codeSet.add("project_basic.isClientLH.for_test");
        codeSet.add("project_basic.lotArea.for_test");
        codeSet.add("project_basic.name.not_blank");
        codeSet.add("project_basic.project_manager_id.not_null");
        codeSet.add("project_basic.purpose1.for_test");
        codeSet.add("project_basic.purpose2.for_test");
        codeSet.add("project_basic.sales_manager_id.not_null");
        codeSet.add("project_basic.status.not_null");
        codeSet.add("project_basic.totalArea.for_test");
        codeSet.add("project.estimate.figure_level.for_test");
        codeSet.add("project.estimate.received_date.for_test");
        codeSet.add("project.estimate.report_level.for_test");
        codeSet.add("project.estimate.sheet.comment_list.not_empty");
        codeSet.add("project.estimate.sheet.comment.description.not_blank");
        codeSet.add("project.estimate.sheet.comment.in_use.not_null");
        codeSet.add("project.estimate.sheet.comment.seq.not_null");
        codeSet.add("project.estimate.sheet.confirm.not_null");
        codeSet.add("project.estimate.sheet.detail_list.not_empty");
        codeSet.add("project.estimate.sheet.detail.count.not_null");
        codeSet.add("project.estimate.sheet.detail.count.positive");
        codeSet.add("project.estimate.sheet.detail.is_included.not_null");
        codeSet.add("project.estimate.sheet.detail.note.for_test");
        codeSet.add("project.estimate.sheet.detail.seq.not_null");
        codeSet.add("project.estimate.sheet.detail.seq.positive");
        codeSet.add("project.estimate.sheet.detail.sub_title_list.not_empty");
        codeSet.add("project.estimate.sheet.detail.title.not_blank");
        codeSet.add("project.estimate.sheet.detail.total_price.not_null");
        codeSet.add("project.estimate.sheet.detail.total_price.positive");
        codeSet.add("project.estimate.sheet.detail.unit_price.not_null");
        codeSet.add("project.estimate.sheet.detail.unit_price.positive");
        codeSet.add("project.estimate.sheet.detail.unit.not_blank");
        codeSet.add("project.estimate.sheet.estimate_date.not_null");
        codeSet.add("project.estimate.sheet.expected_start_month.for_test");
        codeSet.add("project.estimate.sheet.note.for_test");
        codeSet.add("project.estimate.sheet.project_review_id.not_null");
        codeSet.add("project.estimate.sheet.sales_management_leader_id.for_test");
        codeSet.add("project.estimate.sheet.sales_team_leader_id.not_null");
        codeSet.add("project.estimate.sheet.special_discount.for_test");
        codeSet.add("project.estimate.sheet.status.not_null");
        codeSet.add("project.estimate.sheet.title.not_blank");
        codeSet.add("project.estimate.test_level.for_test");
        codeSet.add("project_target_document.file_item.not_null");
        codeSet.add("project_target_document.note.for_test");
        codeSet.add("project_target.land_figure_count.positive");
        codeSet.add("project_review.code.not_blank");
        codeSet.add("project_review.detail_list.not_empty");
        codeSet.add("project_review.detail.area.not_null");
        codeSet.add("project_review.detail.area.positive");
        codeSet.add("project_review.detail.base_count.for_test");
        codeSet.add("project_review.detail.building_name.not_blank");
        codeSet.add("project_review.detail.floor_count.not_null");
        codeSet.add("project_review.detail.height.not_null");
        codeSet.add("project_review.detail.height.positive");
        codeSet.add("project_review.detail.note1.for_test");
        codeSet.add("project_review.detail.note2.for_test");
        codeSet.add("project_review.detail.special_wind_load_condition_list.for_test");
        codeSet.add("project_review.detail.test_list.not_empty");
        codeSet.add("project_review.id.for_test");
        codeSet.add("project_review.status.not_null");
        codeSet.add("project_review.test_list.for_test");
        codeSet.add("user_verification.department_id.not_null");
        codeSet.add("user_verification.email.not_blank");
        codeSet.add("user_verification.name.not_blank");
        codeSet.add("user_verification.user_role.not_null");
        codeSet.add("user.auth_key.not_blank");
        codeSet.add("user.department_id.not_null");
        codeSet.add("user.email.not_blank");
        codeSet.add("user.name.not_blank");
        codeSet.add("user.new_password.not_blank");
        codeSet.add("user.now_password.not_blank");
        codeSet.add("user.password.not_blank");
        codeSet.add("user.user_role.not_null");
        codeSet.add("user.username.not_blank");

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
