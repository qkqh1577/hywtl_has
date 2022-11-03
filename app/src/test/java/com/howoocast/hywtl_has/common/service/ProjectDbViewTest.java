package com.howoocast.hywtl_has.common.service;

import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;
import com.howoocast.hywtl_has.project_db.repository.ProjectDbRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

//@DataJpaTest
@SpringBootTest
@ActiveProfiles(value = "local")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProjectDbViewTest {

    @Autowired
    private ProjectDbRepository projectDbRepository;

    @DisplayName("Test -- Sales DB analysis")
    @Test
    void test() {
        ProjectDbParameter param = new ProjectDbParameter();

        List<ProjectDbView> projects = projectDbRepository.findAll(param);
        for (ProjectDbView project : projects) {
            System.out.println(">>> Project code = " + project.getProject().getCode());

            if (project.getProjectEstimate() == null) {
                System.out.println("\tNO ESTIMATION ATTACHED.");
            } else {
                System.out.println("\tEstimation code = " + project.getProjectEstimate().getCode());
            }

            if (project.getProjectComplexSite() == null) {
                System.out.println("\tNO COMPLEX SITE ATTACHED.");
            } else {
                System.out.println("\tsite name = " + project.getProjectComplexSite().getName());
            }

        }
    }

}
