package com.howoocast.hywtl_has.project_collection.parameter;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCollectionChangeStageSeqParameter {

    @NotEmpty(message = ProjectCollection.KEY + ".stage_list.not_empty")
    private List<Long> idList;
}
