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
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectScheduleParameter,
  ProjectScheduleParameter,
} from 'project_schedule/parameter';
import ProjectScheduleAddModal from 'project_schedule/view/AddModal';
import useLogin from 'app/service/loginHook';
import dayjs from 'dayjs';
import { UserId } from 'user/domain';
import { ApiStatus } from 'components/DataFieldProps';

export default function ProjectScheduleAddModalRoute() {
  const { user } = useLogin();
  const projectId = useId();
  const { alert, error } = useDialog();
  const dispatch = useDispatch();
  const { addModal, requestAdd, filter } = useSelector((root: RootState) => root.projectSchedule);
  const add = useCallback((formikProps: ProjectScheduleParameter) =>
    dispatch(projectScheduleAction.add(formikProps)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectScheduleAction.addModal(false)), [dispatch]);

  const formik = useFormik<ProjectScheduleParameter>({
    enableReinitialize: true,
    initialValues:      { ...initialProjectScheduleParameter, managerId: user?.id ?? UserId(1) },
    onSubmit:           (values) => {
      if (!projectId) {
        error('프로젝트가 선택되지 않았습니다.');
        formik.setSubmitting(false);
        return;
      }
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
      formik.setValues({ ...initialProjectScheduleParameter, managerId: user?.id ?? UserId(1) });
    }
  }, [addModal]);
  useEffect(() => {
    if (requestAdd === ApiStatus.DONE) {
      alert('등록하였습니다.');
      dispatch(projectScheduleAction.addModal(false));
      dispatch(projectScheduleAction.setFilter({ ...filter }));
      dispatch(projectScheduleAction.requestAdd(ApiStatus.IDLE));
    }
    else if (requestAdd === ApiStatus.FAIL) {
      error('등록에 실패하였습니다.');
      dispatch(projectScheduleAction.requestAdd(ApiStatus.IDLE));
    }
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
