import ProjectContainerStatusBar from 'project/view/Container/Status';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectStatusBar,
  ProjectStatusBar
} from 'project/domain';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, { useEffect } from 'react';
import ProjectContainer from 'project/view/Container';
import { projectAction } from 'project/action';
import {
  FormikPartial,
  toPartial,
  toValues
} from 'type/Form';
import useId from 'services/useId';
import { RootState } from 'services/reducer';

export function StatusBar() {

  const id = useId();
  const { detail } = useSelector((root: RootState) => root.project);
  const dispatch = useDispatch();


  const formik = useFormik<FormikPartial<ProjectStatusBar>>({
    enableReinitialize: true,
    initialValues:      toPartial(detail, initialProjectStatusBar),
    onSubmit:           (values,
                         helper
                        ) => {
      dispatch(projectAction.updateStatus({
        values: toValues(values),
        ...helper
      }));
    },
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'project/sales/id/set',
        id,
      });
    }
  }, [id]);

  return (
    <FormikProvider value={formik}>
      <ProjectContainerStatusBar />
    </FormikProvider>

  );
}

interface Props {
  children: React.ReactNode;
}

export default function (props: Props) {

  return (
    <ProjectContainer
      statusBar={<StatusBar />}
      children={props.children}
    />
  );
}