import { AppRoute } from 'services/routes';
import React, { useEffect } from 'react';
import ProjectContainerRoute from 'project/route/container';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  FormikPartial,
  toPartial
} from 'type/Form';
import {
  initialProjectVO,
  ProjectVO
} from 'project/domain';
import ProjectBasicSection from 'project_basic/view/BasicSection';
import ProjectBasicBusinessRoute from 'project_basic/route/business';
import { projectBasicActionType } from 'project_basic/action';

function Element() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { id } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik<FormikPartial<ProjectVO>>({
    enableReinitialize: true,
    initialValues:      toPartial(detail, initialProjectVO),
    onSubmit:           (values,
                        ) => {
      console.log(values);
    }
  });

  useEffect(() => {
    if (detail && detail.id !== id) {
      dispatch(projectBasicActionType.setId(detail.id));
    }
  }, [detail]);

  return (
    <ProjectContainerRoute>
      <FormikProvider value={formik}>
        <ProjectBasicSection />
      </FormikProvider>
      <ProjectBasicBusinessRoute />
    </ProjectContainerRoute>
  );
}

const projectBasicRoute: AppRoute = {
  path:    '/project/sales-management/:id/basic',
  element: <Element />
};

export default projectBasicRoute;