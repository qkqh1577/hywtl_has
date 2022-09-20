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

function toParameter(values: ProjectScheduleTempParameter): ProjectScheduleParameter | undefined {
  if (!values.allDay && (!values.start || !values.end)) {
    return;
  }
  return {
    ...values,
    startTime: values.allDay ?
                 dayjs(values.startTime)
                 .format('YYYY-MM-DD hh:mm')
                 :
                 dayjs(values.startTime)
                 .format('YYYY-MM-DD') + ` ${values.start}`,
    endTime:   values.allDay ?
                 dayjs(values.endTime)
                 .format('YYYY-MM-DD hh:mm')
                 :
                 dayjs(values.endTime)
                 .format('YYYY-MM-DD') + ` ${values.end}`,
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
      const parameter = toParameter(values);
      console.log(parameter);
      if (!parameter) {
        error('시작 시간 또는 종료 시간이 선택되지 않았습니다.');
        helper.setSubmitting(false);
        return;
      }
      add({
        values: {
          ...parameter
        },
        ...helper
      });
    }
  });

  useEffect(() => {
    if (!addModal) {
      onClose();
      formik.setValues({ ...initialProjectScheduleParameter, managerId: user?.id });
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
