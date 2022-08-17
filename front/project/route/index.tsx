import { AppRoute } from 'services/routes';
import React from 'react';
import ProjectContainer from 'project/view/Container';
import { useFormik } from 'formik';
import {
  initialProjectStatus,
  ProjectStatus
} from 'project/view/Container/Status';
import useId from 'services/useId';

function Element() {
  const id = useId();

  if (!id) {
    return null;
  }

  const statusBarFormik = useFormik<ProjectStatus>({
    initialValues: initialProjectStatus,
    onSubmit:      (values,
                    helper
                   ) => {

    }
  });

  return (
    <ProjectContainer
      statusBarProps={{ formik: statusBarFormik }}
    />
  );
}

const projectRoutes: AppRoute[] = [{
  path:    '/project/:id/*',
  element: <Element />
}];

export default projectRoutes;