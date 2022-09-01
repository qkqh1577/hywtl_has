import { AppRoute } from 'services/routes';
import React from 'react';
import ProjectContainer from 'project/route/container';
import ProjectBasic from 'project/view/Basic';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import {
  FormikPartial,
  toPartial
} from 'type/Form';
import {
  initialProjectVO,
  ProjectVO
} from 'project/domain';

function Element() {

  const { detail } = useSelector((root: RootState) => root.project);

  const formik = useFormik<FormikPartial<ProjectVO>>({
    enableReinitialize: true,
    initialValues:      toPartial(detail, initialProjectVO),
    onSubmit:           (values,
                         helper
                        ) => {

    }
  });

  return (
    <ProjectContainer>
      <ProjectBasic
        basicFormik={formik}
      />
    </ProjectContainer>
  );
}

const projectBasicRoute: AppRoute = {
  path:    '/project/sales-management/:id/basic',
  element: <Element />
};

export default projectBasicRoute;