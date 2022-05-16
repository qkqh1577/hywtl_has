import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker } from 'components';
import { usePersonnel } from 'services/personnel';
import {
  PersonnelCareerView as View,
  initCareerView as initView,
} from 'services/personnel/view';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const PersonnelDetailCareerList = ({
  id,
  values,
  errors,
  setFieldValue,
}: Props) => {
  const {
    state: {
      careerList: detail,
    },
    getCareerList: getOne
  } = usePersonnel();

  const [view, setView] = useState<View[]>(values);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue('careerList', view);
  }, [view]);

  useEffect(() => {
    setView(detail ?? view);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h2>경력 정보</h2>
        <Button
          color="primary"
          variant="contained"
          style={{ height: '36px' }}
          onClick={() => {
            setView([...view, initView]
            );
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
                  label="근무처명"
                  name={`careerList[${i}].companyName`}
                  value={item.companyName}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`careerList[${i}].startDate`}
                  label="시작일"
                  value={item.startDate}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  openTo="year"
                  required
                  disableFuture
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`careerList[${i}].endDate`}
                  label="종료일"
                  value={item.endDate}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  openTo="year"
                  required
                  disableFuture
                />
              </Grid>
              <Grid item>
                <DataField
                  label="주 업무"
                  name={`careerList[${i}].majorJob`}
                  value={item.majorJob}
                  setFieldValue={setFieldValue}
                  errors={errors}
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

export default PersonnelDetailCareerList;
