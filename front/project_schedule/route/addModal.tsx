import React, {
  useCallback,
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectScheduleParameter,
  ProjectScheduleParameter,
} from 'project_schedule/parameter';
import ProjectScheduleAddModal from 'project_schedule/view/AddModal';
import dayjs from 'dayjs';
import { UserId } from 'user/domain';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectScheduleAddModalRoute() {
  const { detail: loginUser } = useSelector((root: RootState) => root.login);
  const dispatch = useDispatch();
  const { addModal, requestAdd, filter } = useSelector((root: RootState) => root.projectSchedule);
  const add = useCallback((formikProps: ProjectScheduleParameter) =>
    dispatch(projectScheduleAction.add(formikProps)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectScheduleAction.addModal(false)), [dispatch]);

  const formik = useFormik<ProjectScheduleParameter>({
    initialValues: { ...initialProjectScheduleParameter, managerId: loginUser?.id ?? UserId(1) },
    onSubmit:      (values) => {
      const allDay = values.allDay;
      const startTime = allDay ? dayjs(values.startTime)
      .format('YYYY-MM-DD') + ' 00:00' : dayjs(values.startTime)
      .format('YYYY-MM-DD HH:mm');
      const endTime = allDay ? dayjs(values.endTime)
      .format('YYYY-MM-DD') + ' 23:59' : dayjs(values.endTime)
      .format('YYYY-MM-DD HH:mm');
      add({
        startTime,
        endTime,
        allDay,
        title:            values.title,
        managerId:        values.managerId,
        alertBefore:      values.alertBefore,
        attendanceIdList: values.attendanceIdList,
      });
    }
  });

  useEffect(() => {
    if (addModal) {
      formik.setValues({ ...initialProjectScheduleParameter, managerId: loginUser?.id ?? UserId(1) });
    }
  }, [addModal]);

  useEffect(() => {
    closeStatus(requestAdd, () => {
      dispatch(projectScheduleAction.addModal(false));
      dispatch(projectScheduleAction.setFilter({ ...filter }));
      formik.resetForm();
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectScheduleAction.requestAdd('idle'));
    });
  }, [requestAdd]);

  return (
    <FormikProvider value={formik}>
      <ProjectScheduleAddModal
        open={!!addModal}
        onSubmit={() => {
          formik.handleSubmit();
        }}
        onClose={onClose}
      />
    </FormikProvider>
  );
}
;
