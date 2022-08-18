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
import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectContainer from 'project/view/Container';
import { projectAction } from 'project/action';
import {
  FormikPartial,
  toPartial,
  toValues
} from 'type/Form';
import useId from 'services/useId';
import { RootState } from 'services/reducer';
import ProjectContainerTitle from 'project/view/Container/Title';
import {
  initialProjectAddParameter,
  ProjectAddParameter
} from 'project/parameter';

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

export function Title() {
  const { detail } = useSelector((root: RootState) => root.project);

  return (
    <ProjectContainerTitle
      code={detail?.code}
      name={detail?.name}
    />
  );
}

interface Props {
  children: React.ReactNode;
}

export default function (props: Props) {

  const { addModal } = useSelector((root: RootState) => root.project);
  const dispatch = useDispatch();
  const onClose = useCallback(() => dispatch(projectAction.setAddModal(false)), [dispatch]);
  const addModalFormik = useFormik<FormikPartial<ProjectAddParameter>>({
    initialValues: initialProjectAddParameter,
    onSubmit:      (values,
                    helper
                   ) => {
      console.log(values);
    }
  });

  return (
    <ProjectContainer
      title={<Title />}
      statusBar={<StatusBar />}
      children={props.children}
      addModalProps={{
        open:   !!addModal,
        onClose,
        formik: addModalFormik,
      }}
    />
  );
}