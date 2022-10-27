import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import {
  initialProjectScheduleParameter,
  ProjectScheduleParameter,
} from 'project_schedule/parameter';
import {
  FormikProvider,
  useFormik,
} from 'formik';
import { ProjectScheduleId, } from 'project_schedule/domain';
import ProjectScheduleDetailModal from 'project_schedule/view/DetailModal';
import useDialog from 'dialog/hook';
import dayjs from 'dayjs';
import { DialogStatus } from 'dialog/domain';

export default function ProjectScheduleDetailModalRoute() {
  const dispatch = useDispatch();
  const { confirm, alert, error, rollback } = useDialog();
  const { detail, requestUpdate, requestDelete, filter } = useSelector((root: RootState) => root.projectSchedule);

  const onClose = useCallback(() =>
    dispatch(projectScheduleAction.setOne(undefined)), [dispatch]);

  const update = useCallback((formikProps: ProjectScheduleParameter) => dispatch(projectScheduleAction.update(formikProps)), [dispatch]);
  const deleteOne = useCallback((id: ProjectScheduleId) =>
    dispatch(projectScheduleAction.deleteOne(id)), [dispatch]);

  const formik = useFormik<ProjectScheduleParameter>({
    enableReinitialize: true,
    initialValues:      { ...initialProjectScheduleParameter, edit: false } as ProjectScheduleParameter,
    onSubmit:           (values
                        ) => {
      if (!values.id) {
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
      update({
        id:               values.id,
        startTime,
        endTime,
        allDay,
        title:            values.title,
        managerId:        values.managerId,
        alertBefore:      values.alertBefore,
        attendanceIdList: values.attendanceIdList,
      });
      formik.setSubmitting(false);
    }
  });

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        startTime: dayjs(detail.startTime)
                   .format('YYYY-MM-DD HH:mm'),
        endTime:   dayjs(detail.endTime)
                   .format('YYYY-MM-DD HH:mm'),
        manager:   detail.manager,
        managerId: detail.manager.id,
        edit:      false,
      } as ProjectScheduleParameter);
    }
  }, [detail]);

  useEffect(() => {
    if (requestUpdate === 'done') {
      alert('수정하였습니다.');
      dispatch(projectScheduleAction.requestUpdate('idle'));
      dispatch(projectScheduleAction.setFilter({ ...filter }));
      dispatch(projectScheduleAction.setId(undefined));
      formik.setSubmitting(false);
    }
    else if (requestUpdate === message) {
      error('수정에 실패하였습니다.');
      dispatch(projectScheduleAction.requestUpdate('idle'));
      formik.setSubmitting(false);
    }
  }, [requestUpdate]);

  useEffect(() => {
    if (requestDelete === 'done') {
      alert('삭제되었습니다.');
      dispatch(projectScheduleAction.requestDelete('idle'));
      dispatch(projectScheduleAction.setFilter({ ...filter }));
      dispatch(projectScheduleAction.setId(undefined));
      formik.setSubmitting(false);
    }
    else if (requestDelete === message) {
      error('삭제에 실패하였습니다.');
      dispatch(projectScheduleAction.requestDelete('idle'));
      formik.setSubmitting(false);
    }
  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <ProjectScheduleDetailModal
        open={typeof detail !== 'undefined'}
        onClose={onClose}
        onDelete={() => {
          if (detail && detail.id) {
            confirm({
              status:       DialogStatus.WARN,
              children:     '해당 일정을 삭제하시겠습니까?',
              confirmText:  '삭제',
              afterConfirm: () => {
                deleteOne(detail.id);
              }
            });
          }
          else {
            alert('일정이 선택되지 않았습니다.');
          }
        }}
        onCancel={() => {
          rollback(() => {
            formik.setValues({
              ...detail,
              startTime: dayjs(detail!.startTime)
                         .format('YYYY-MM-DD HH:mm'),
              endTime:   dayjs(detail!.endTime)
                         .format('YYYY-MM-DD HH:mm'),
              manager:   detail!.manager,
              managerId: detail!.manager.id,
              edit:      false,
            } as ProjectScheduleParameter);
          });
        }}
      />
    </FormikProvider>
  );
};
