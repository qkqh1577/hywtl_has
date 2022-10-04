import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import { ProjectScheduleParameter, } from 'project_schedule/parameter';
import {
  FormikProvider,
  useFormik,
} from 'formik';
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

function toParameter(values: DetailModalFormik): ProjectScheduleParameter {
  return {
    id:               values.id,
    title:            values.title,
    alertBefore:      values.alertBefore,
    allDay:           values.allDay,
    managerId:        values.manager.id,
    attendanceIdList: values.attendanceList?.map((item) => item.id!),
    startTime:        values.allDay ?
                        dayjs(values.startTime)
                        .format('YYYY-MM-DD hh:mm')
                        :
                        dayjs(values.startTime)
                        .format('YYYY-MM-DD') + ` ${values.start ? values.start : '00:00'}`,
    endTime:          values.allDay ?
                        dayjs(values.endTime)
                        .format('YYYY-MM-DD hh:mm')
                        :
                        dayjs(values.endTime)
                        .format('YYYY-MM-DD') + ` ${values.end ? values.end : '00:00'}`,
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

  const update = useCallback((formikProps: ProjectScheduleParameter) =>
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
        update(toParameter(values));
      }
    }
  });

  const deleteOne = useCallback((id: ProjectScheduleId) =>
    dispatch(projectScheduleAction.deleteOne(id)), [dispatch]);

  const onDelete = () => {
    if (detail && detail.id) {
      deleteOne(detail.id);
    }
  };

  return (
    <FormikProvider value={formik}>
      <ProjectScheduleDetailModal
        open={typeof detail !== 'undefined'}
        onClose={onClose}
        onDelete={onDelete}
      />
    </FormikProvider>
  );
};
