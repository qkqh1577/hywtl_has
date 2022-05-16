import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker } from 'components';
import { usePersonnel } from 'services/personnel';
import {
  PersonnelLanguageView as View,
  initLanguageView as initView,
} from 'services/personnel/view';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const PersonnelDetailLanguageList = ({
  id,
  values,
  errors,
  setFieldValue,
}: Props) => {
  const {
    state: {
      languageList: detail,
    },
    getLanguageList: getOne
  } = usePersonnel();

  const [view, setView] = useState<View[]>(values);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue('languageList', view);
  }, [view]);

  useEffect(() => {
    setView(detail?.map((item) => ({
      name: item.name,
      type: item.type,
      grade: item.grade ?? '',
      organizationName: item.organizationName,
      certifiedDate: item.certifiedDate,
      expiryPeriod: item.expiryPeriod ?? '',
      trainingPeriod: item.trainingPeriod ?? '',
    })) ?? view);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h2>어학 정보</h2>
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
                  label="자격증명"
                  name={`languageList[${i}].name`}
                  value={item.name}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="대상 언어"
                  name={`languageList[${i}].type`}
                  value={item.type}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="급수, 종류"
                  name={`languageList[${i}].grade`}
                  value={item.grade}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="발급기관명"
                  name={`languageList[${i}].organizationName`}
                  value={item.organizationName}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`languageList[${i}].certifiedDate`}
                  label="취득일"
                  value={item.certifiedDate}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  openTo="year"
                  required
                  disableFuture
                />
              </Grid>
              <Grid item>
                <DataField
                  label="유효 기간"
                  name={`languageList[${i}].expiryPeriod`}
                  value={item.expiryPeriod}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="연수 기간"
                  name={`languageList[${i}].trainingPeriod`}
                  value={item.trainingPeriod}
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
                setView(view.filter((item, j) => i !== j));
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

export default PersonnelDetailLanguageList;
