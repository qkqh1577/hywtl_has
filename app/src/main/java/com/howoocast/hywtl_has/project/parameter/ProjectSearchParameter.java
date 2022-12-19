package com.howoocast.hywtl_has.project.parameter;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ProjectSearchParameter {

    private String keywordOfProject = "";
    private List<String> keywordOfProjectDetail = new ArrayList<>();
    private List<ProjectStatusSearchParameter> projectStatusSearchList = new ArrayList<>();

    @Data
    public static class ProjectStatusSearchParameter {

        private String projectOption;
        private String ProjectSubOption;
    }

}
