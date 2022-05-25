import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DepartmentSelector, DataField, useDialog } from 'components';
import {
  PersonnelJobView,
  initJobView,
  initView,
  usePersonnel,
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const FIELD_NAME = 'jobList';
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

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, detail?.map((item) => ({
      departmentId: item.department.id ?? initJobView.departmentId,
      jobTitle: item.jobTitle ?? initJobView.jobTitle,
      jobType: item.jobType ?? initJobView.jobType,
      jobPosition: item.jobPosition ?? initJobView.jobPosition,
      jobClass: item.jobClass ?? initJobView.jobClass,
      jobDuty: item.jobDuty ?? initJobView.jobDuty,
    })) ?? initView.jobList);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h2>소속 정보</h2>
        <Button onClick={() => {
          if (Array.isArray(values)) {
            setFieldValue(FIELD_NAME, [...values, initJobView]);
          } else {
            setFieldValue(FIELD_NAME, [initJobView]);
          }
        }}>
          추가
        </Button>
      </Grid>
      {Array.isArray(values) && (values as PersonnelJobView[])
      .map((item, i) => (
        <Grid item key={i} sm={12}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item sm={4}>
                <DepartmentSelector required
                  name={`${FIELD_NAME}[${i}].departmentId`}
                  label="소속 부서"
                  value={item.departmentId}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField required
                  label="직함"
                  name={`${FIELD_NAME}[${i}].jobTitle`}
                  value={item.jobTitle}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField required
                  label="직종"
                  name={`${FIELD_NAME}[${i}].jobType`}
                  value={item.jobType}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField required
                  label="직위"
                  name={`${FIELD_NAME}[${i}].jobPosition`}
                  value={item.jobPosition}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="직급"
                  name={`${FIELD_NAME}[${i}].jobClass`}
                  value={item.jobClass}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="직책"
                  name={`${FIELD_NAME}[${i}].jobDuty`}
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
                const list = (values as PersonnelJobView[]);
                if (list.length === 1) {
                  dialog.error('하나 이상의 소속 정보가 필요합니다.');
                  return;
                }
                setFieldValue(FIELD_NAME, list.filter((item, j) => i !== j));
              }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonnelDetailJobList;
