import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import { FormikSubmit } from 'type/Form';
import { ProjectScheduleParameter } from 'project_schedule/parameter';
import { useFormik, } from 'formik';
import {
  ProjectScheduleId,
  ProjectScheduleVO,
} from 'project_schedule/domain';
import dayjs from 'dayjs';
import ProjectScheduleDetailModal from 'project_schedule/view/DetailModal';

export interface DetailModalFormik
  extends Omit<ProjectScheduleVO, 'id' | 'startTime' | 'endTime'> {
  id: ProjectScheduleId;
  startTime: Date;
  endTime: Date;
  start?: string;
  end?: string;
  edit: boolean;
}

function toFormik(detail: ProjectScheduleVO): DetailModalFormik {
  return {
    ...detail,
    id:        detail.id!,
    startTime: detail.startTime!,
    endTime:   detail.endTime!,
    edit:      false,
    start:     !detail.allDay ? dayjs(detail.startTime!)
    .format('HH:mm') : undefined,
    end:       !detail.allDay ? dayjs(detail.endTime!)
    .format('HH:mm') : undefined,
  };
}

function isFormikType(values: any): values is DetailModalFormik {
  return Object.keys(values).length !== 0;
}

export default function ProjectScheduleDetailModalRoute() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => {
    return root.projectSchedule;
  });

  const onClose = useCallback(() =>
    dispatch(projectScheduleAction.setOne(undefined)), [dispatch]);

  const update = useCallback((formikProps: FormikSubmit<ProjectScheduleParameter>) =>
    dispatch(projectScheduleAction.update(formikProps)), [dispatch]);

  const formik = useFormik<DetailModalFormik | object>({
    enableReinitialize: true,
    initialValues:      detail ? toFormik(detail) : {},
    onSubmit:           (values,
                         helper
                        ) => {
      if (Object.keys(values).length === 0) {
        helper.setSubmitting(false);
        return;
      }
      if (isFormikType(values)) {
        update({
          values: {
            id:               values.id,
            title:            values.title,
            alertBefore:      values.alertBefore,
            allDay:           values.allDay,
            managerId:        values.manager.id,
            attendanceIdList: values.attendanceList?.map((item) => item.id!),
            startTime:        dayjs(values.startTime)
                              .format('YYYY-MM-DD hh:mm'),
            endTime:          dayjs(values.endTime)
                              .format('YYYY-MM-DD hh:mm'),
          },
          ...helper
        });
      }
    }
  });

  const remove = useCallback((id: ProjectScheduleId) =>
    dispatch(projectScheduleAction.delete(id)), [dispatch]);

  const onDelete = () => {
    if (detail && detail.id) {
      remove(detail.id);
    }
  };

  return (
    <ProjectScheduleDetailModal
      open={typeof detail !== 'undefined'}
      onClose={onClose}
      formik={formik}
      onDelete={onDelete}
    />
  );
};
