import React, {
  useCallback,
  useEffect,
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
  ProjectScheduleParameter,
  ProjectScheduleTempParameter
} from 'project_schedule/parameter';
import ProjectScheduleAddModal from 'project_schedule/view/AddModal';
import { FormikSubmit } from 'type/Form';
import dayjs from 'dayjs';
import useLogin from 'app/service/loginHook';

function toParameter(values: ProjectScheduleTempParameter): ProjectScheduleParameter {
  return {
    ...values,
    startTime: values.allDay ?
                 dayjs(values.startTime)
                 .format('YYYY-MM-DD hh:mm')
                 :
                 dayjs(values.startTime)
                 .format('YYYY-MM-DD') + ` ${values.start ? values.start : '00:00'}`,
    endTime:   values.allDay ?
                 dayjs(values.endTime)
                 .format('YYYY-MM-DD hh:mm')
                 :
                 dayjs(values.endTime)
                 .format('YYYY-MM-DD') + ` ${values.end ? values.end : '00:00'}`,
  };
}

export default function ProjectScheduleAddModalRoute() {
  const { user } = useLogin();
  const projectId = useId();
  const { error } = useDialog();
  const dispatch = useDispatch();
  const { addModal } = useSelector((root: RootState) => root.projectSchedule);
  const add = useCallback((formikProps: FormikSubmit<ProjectScheduleParameter>) =>
    dispatch(projectScheduleAction.add(formikProps)), [dispatch]);

  const onClose = useCallback(() => dispatch(projectScheduleAction.addModal(false)), [dispatch]);

  const formik = useFormik<ProjectScheduleParameter>({
    enableReinitialize: true,
    initialValues:      { ...initialProjectScheduleParameter, managerId: user?.id },
    onSubmit:           (values,
                         helper
                        ) => {
      if (!projectId) {
        error('프로젝트가 선택되지 않았습니다.');
        helper.setSubmitting(false);
        return;
      }
      add({
        values: {
          ...toParameter(values)
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
