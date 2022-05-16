import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker } from 'components';
import { usePersonnel } from 'services/personnel';
import {
  PersonnelAcademicView as View,
  initAcademicView as initView,
} from 'services/personnel/view';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

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

  const [view, setView] = useState<View[]>(values);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue('academicList', view);
  }, [view]);

  useEffect(() => {
    setView(detail?.map((item) => ({
      academyName: item.academyName,
      major: item.major,
      degree: item.degree ?? '',
      state: item.state,
      grade: item.grade ?? '',
      startDate: item.startDate,
      endDate: item.endDate,
    })) ?? view);
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
            setView([...view, initView]);
          }}
        >
          추가
        </Button>
      </Grid>
      {view && view.map((item, i) => (
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
                  name={`academicList[${i}].academyName`}
                  value={item.academyName}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="전공"
                  name={`academicList[${i}].major`}
                  value={item.major}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="학위"
                  name={`academicList[${i}].degree`}
                  value={item.degree}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="재적 상태"
                  name={`academicList[${i}].state`}
                  value={item.state}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="학점"
                  name={`academicList[${i}].grade`}
                  value={item.grade}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`academicList[${i}].startDate`}
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
                  name={`academicList[${i}].endDate`}
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

export default PersonnelDetailAcademicList;
