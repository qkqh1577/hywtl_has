import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import { FormikSubmit } from 'type/Form';
import { ProjectScheduleParameter } from 'project_schedule/parameter';
import { useFormik } from 'formik';
import { initialProjectScheduleVO, ProjectScheduleVO } from 'project_schedule/domain';
import dayjs from 'dayjs';

export default function ProjectScheduleDetailModalRoute() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => {
    return root.projectSchedule;
  });

  const onClose = useCallback(() =>
    dispatch(projectScheduleAction.setOne(undefined)), [dispatch]);

  const update = useCallback((formikProps: FormikSubmit<ProjectScheduleParameter>) =>
    dispatch(projectScheduleAction.update(formikProps)), [dispatch]);

  const formik = useFormik<ProjectScheduleVO>({
    enableReinitialize: true,
    initialValues: initialProjectScheduleVO,
    onSubmit: (values, helper) => {

      update({
        values: {
          title : values.title,
          alertBefore : values.alertBefore,
          allDay : values.allDay,
          managerId : values.manager.id,
          attendanceIdList :values.attendanceList?.map((item) => item.id),
          startTime: dayjs(values.startTime).format('YYYY-MM-DD hh:mm'),
          endTime: dayjs(values.endTime).format('YYYY-MM-DD hh:mm'),
        },
        ...helper
      });
    }
  });

  return (
    <div>hi</div>
  );
};