package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplateDetail;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateTemplateDetailParameter {

    @NotEmpty(message = ProjectEstimateTemplateDetail.KEY + ".title_list.not_empty")
    private List<Title> titleList;
    @NotBlank(message = ProjectEstimateTemplateDetail.KEY + ".unit.not_blank")
    private String unit;
    @NotNull(message = ProjectEstimateTemplateDetail.KEY + ".test_count.not_null")
    private Long testCount;
    @NotNull(message = ProjectEstimateTemplateDetail.KEY + ".unit_amount.not_null")
    private Long unitAmount;
    private Long totalAmount;
    @NotNull(message = ProjectEstimateTemplateDetail.KEY + ".in_use.not_null")
    private Boolean inUse;
    private String note;

    @Getter
    @Setter
    public static class Title {
        private String title;

        /**
         * @migration
         * @param title
         * @return
         */
        public static Title of(String title) {
            Title result = new Title();
            result.title = title;
            return result;
        }
    }
}
