import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DepartmentSelector, DataField, useDialog } from 'components';
import {
  PersonnelJobView as View,
  initJobView as initView,
  usePersonnel,
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const PersonnelDetailJobList = ({
  id,
  values,
  errors,
  setFieldValue,
}: Props) => {
  const dialog = useDialog();

  const {
    state: {
      jobList: detail,
    },
    getJobList: getOne
  } = usePersonnel();

  const [view, setView] = useState<View[]>(values);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue('jobList', view);
  }, [view]);

  useEffect(() => {
    setView(detail?.map((job) => ({
      departmentId: job.department.id,
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      jobPosition: job.jobPosition,
      jobClass: job.jobClass ?? '',
      jobDuty: job.jobDuty ?? '',
    })) ?? view);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h2>소속 정보</h2>
        <Button
          color="primary"
          variant="contained"
          style={{ height: '36px' }}
          onClick={() => {
            setView([...view, initView]);
          }}
        >
          추가
        </Button>
      </Grid>
      {view.map((item, i) => (
        <Grid key={i} item sm={12}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item sm={4}>
                <DepartmentSelector
                  name={`jobList[${i}].departmentId`}
                  label="소속 부서"
                  value={item.departmentId}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="직함"
                  name={`jobList[${i}].jobTitle`}
                  value={item.jobTitle}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="직종"
                  name={`jobList[${i}].jobType`}
                  value={item.jobType}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="직위"
                  name={`jobList[${i}].jobPosition`}
                  value={item.jobPosition}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="직급"
                  name={`jobList[${i}].jobClass`}
                  value={item.jobClass}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="직책"
                  name={`jobList[${i}].jobDuty`}
                  value={item.jobDuty}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <IconButton
              edge="end"
              color="secondary"
              aria-label="삭제"
              onClick={() => {
                if (view.length === 1) {
                  dialog.error('하나 이상의 소속 정보가 필요합니다.');
                  return;
                }
                setView(view.filter((item, j) => i !== j)
                );
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonnelDetailJobList;
