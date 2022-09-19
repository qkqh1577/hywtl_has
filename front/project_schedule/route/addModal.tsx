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
import {
  initialProjectScheduleParameter,
  ProjectScheduleParameter
} from 'project_schedule/parameter';
import ProjectScheduleAddModal from 'project_schedule/view/AddModal';
import { FormikSubmit } from 'type/Form';
import dayjs from 'dayjs';

export default function ProjectScheduleAddModalRoute() {
  const projectId = useId();
  const { error } = useDialog();
  const dispatch = useDispatch();
  const { addModal } = useSelector((root: RootState) => root.projectSchedule);

  const add = useCallback((formikProps: FormikSubmit<ProjectScheduleParameter>) =>
    dispatch(projectScheduleAction.add(formikProps)), [dispatch]);

  const onClose = useCallback(() => dispatch(projectScheduleAction.addModal(false)), [dispatch]);

  const formik = useFormik<ProjectScheduleParameter>({
    enableReinitialize: true,
    initialValues:      initialProjectScheduleParameter,
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
        values: {
          ...values,
          startTime: dayjs(values.startTime)
                     .format('YYYY-MM-DD hh:mm'),
          endTime:   dayjs(values.endTime)
                     .format('YYYY-MM-DD hh:mm'),
        },
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
