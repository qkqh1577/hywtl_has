import React, {
  useCallback,
  useEffect
} from 'react';
import useId from 'services/useId';
import useDialog from 'components/Dialog';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import { useFormik } from 'formik';
import { ProjectScheduleParameter } from 'project_schedule/parameter';
import ProjectScheduleAddModal from 'project_schedule/view/AddModal';
import { FormikSubmit } from 'type/Form';
import {
  initialProjectScheduleVO,
  ProjectScheduleVOForAdd
} from 'project_schedule/domain';

export default function ProjectScheduleAddModalRoute() {
  const projectId = useId();
  const { error } = useDialog();
  const dispatch = useDispatch();
  const { addModal } = useSelector((root: RootState) => root.projectSchedule);

  const add = useCallback((formikProps: FormikSubmit<ProjectScheduleParameter>) =>
    dispatch(projectScheduleAction.add(formikProps)), [dispatch]);

  const onClose = useCallback(() => dispatch(projectScheduleAction.addModal(false)), [dispatch]);

  const formik = useFormik<ProjectScheduleVOForAdd>({
    enableReinitialize: true,
    initialValues:      initialProjectScheduleVO,
    onSubmit:           (values,
                         helper
                        ) => {
      if (!projectId) {
        error('프로젝트가 선택되지 않았습니다.');
        helper.setSubmitting(false);
        return;
      }
      console.log('values : ', values);
      add({
        values,
        ...helper
      });
    }
  });

  useEffect(() => {
    if (!addModal) {
      onClose();
    }
  }, [addModal]);


  return (
    <ProjectScheduleAddModal
      open={!!addModal}
      onClose={onClose}
      formik={formik}
    />
  );
}
;
