import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DataField } from 'components';
import {
  PersonnelLanguageView,
  initLanguageView,
  initView,
  usePersonnel
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const FIELD_NAME = 'languageList';
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

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, detail?.map((item) => ({
      name: item.name ?? initLanguageView.name,
      type: item.type ?? initLanguageView.type,
      grade: item.grade ?? initLanguageView.grade,
      organizationName: item.organizationName ?? initLanguageView.organizationName,
      certifiedDate: item.certifiedDate ?? initLanguageView.certifiedDate,
      expiryPeriod: item.expiryPeriod ?? initLanguageView.expiryPeriod,
      trainingPeriod: item.trainingPeriod ?? initLanguageView.trainingPeriod,
    })) ?? initView.languageList);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h2>어학 정보</h2>
        <Button onClick={() => {
          if (Array.isArray(values)) {
            setFieldValue(FIELD_NAME, [...values, initLanguageView]);
          } else {
            setFieldValue(FIELD_NAME, [initLanguageView]);
          }
        }}>
          추가
        </Button>
      </Grid>
      {Array.isArray(values) && (values as PersonnelLanguageView[])
      .map((item, i) => (
        <Grid item key={i} sm={12}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <DataField required
                  name={`${FIELD_NAME}[${i}].name`}
                  label="자격증명"
                  value={item.name}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField required
                  name={`${FIELD_NAME}[${i}].type`}
                  label="대상 언어"
                  value={item.type}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  name={`${FIELD_NAME}[${i}].grade`}
                  label="급수, 종류"
                  value={item.grade}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField required
                  name={`${FIELD_NAME}[${i}].organizationName`}
                  label="발급기관명"
                  value={item.organizationName}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField required disableFuture
                  type="date"
                  name={`${FIELD_NAME}[${i}].certifiedDate`}
                  label="취득일"
                  value={item.certifiedDate}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  openTo="year"
                />
              </Grid>
              <Grid item>
                <DataField
                  name={`${FIELD_NAME}[${i}].expiryPeriod`}
                  label="유효 기간"
                  value={item.expiryPeriod}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  name={`languageList[${i}].trainingPeriod`}
                  label="연수 기간"
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
                const list = (values as PersonnelLanguageView[]);
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

export default PersonnelDetailLanguageList;
