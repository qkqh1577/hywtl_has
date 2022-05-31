import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { FormikErrors } from 'formik';
import { DataField } from 'components';
import {
  initCompanyView as initView,
  usePersonnel
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const FIELD_NAME = 'company';
const PersonnelDetailCompany = ({
  id,
  values,
  errors,
  setFieldValue,
}: Props) => {

  const {
    state: {
      company: detail
    },
    getCompany: getOne
  } = usePersonnel();

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, {
      hiredDate: detail?.hiredDate ?? initView.hiredDate,
      hiredType: detail?.hiredType ?? initView.hiredType,
      recommender: detail?.recommender ?? initView.recommender,
    });
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <h2>입사 정보</h2>
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField required disableFuture
          type="date"
          name={`${FIELD_NAME}.hiredDate`}
          label="입사일"
          value={values.hiredDate}
          setFieldValue={setFieldValue}
          errors={errors}
          openTo="year"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField required
          type="select"
          name={`${FIELD_NAME}.hiredType`}
          label="입사 구분"
          value={values.hiredType}
          setFieldValue={setFieldValue}
          errors={errors}
          options={['신입', '경력']}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          name={`${FIELD_NAME}.recommender`}
          label="추천자"
          value={values.recommender}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default PersonnelDetailCompany;
