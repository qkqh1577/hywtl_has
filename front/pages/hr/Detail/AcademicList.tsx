import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker } from 'components';
import {
  PersonnelAcademicView,
  initAcademicView,
  initView,
  usePersonnel
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
const FIELD_NAME = 'academicList';
const PersonnelDetailAcademicList = ({
  id,
  values,
  errors,
  setFieldValue,
}: Props) => {
  const {
    state: {
      academicList: detail,
    },
    getAcademicList: getOne
  } = usePersonnel();

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, detail?.map((item) => ({
      academyName: item.academyName ?? initAcademicView.academyName,
      major: item.major ?? initAcademicView.major,
      degree: item.degree ?? initAcademicView.degree,
      state: item.state ?? initAcademicView.state,
      grade: item.grade ?? initAcademicView.grade,
      startDate: item.startDate ?? initAcademicView.startDate,
      endDate: item.endDate ?? initAcademicView.endDate,
    })) ?? initView.academicList);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h2>학력 정보</h2>
        <Button
          color="primary"
          variant="contained"
          style={{ height: '36px' }}
          onClick={() => {
            if (Array.isArray(values)) {
              setFieldValue(FIELD_NAME, [...values, initAcademicView]);
            } else {
              setFieldValue(FIELD_NAME, [initAcademicView]);
            }
          }}
        >
          추가
        </Button>
      </Grid>
      {Array.isArray(values) && (values as PersonnelAcademicView[])
      .map((item, i) => (
        <Grid key={i} item sm={12}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <DataField
                  label="교육기관명"
                  name={`${FIELD_NAME}[${i}].academyName`}
                  value={item.academyName}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="전공"
                  name={`${FIELD_NAME}[${i}].major`}
                  value={item.major}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="학위"
                  name={`${FIELD_NAME}[${i}].degree`}
                  value={item.degree}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="재적 상태"
                  name={`${FIELD_NAME}[${i}].state`}
                  value={item.state}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="학점"
                  name={`${FIELD_NAME}[${i}].grade`}
                  value={item.grade}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`${FIELD_NAME}[${i}].startDate`}
                  label="시작일"
                  value={item.startDate}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  openTo="year"
                  required
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`${FIELD_NAME}[${i}].endDate`}
                  label="종료일"
                  value={item.endDate}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  openTo="year"
                  required
                />
              </Grid>
            </Grid>
            <IconButton
              edge="end"
              color="secondary"
              aria-label="삭제"
              onClick={() => {
                const list = (values as PersonnelAcademicView[]);
                setFieldValue(FIELD_NAME, list.filter((item, j) => i !== j));
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

export default PersonnelDetailAcademicList;
