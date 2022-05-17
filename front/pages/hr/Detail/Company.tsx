import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker } from 'components';
import {
  PersonnelCompanyView as View,
  usePersonnel
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

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

  const [view, setView] = useState<View>(values);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setView({
      hiredDate: detail?.hiredDate ?? view.hiredDate,
      hiredType: detail?.hiredType ?? view.hiredType,
      recommender: detail?.recommender ?? view.recommender,
    })
  }, [detail]);

  useEffect(() => {
    setFieldValue('company', view);
  }, [view]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <h2>입사 정보</h2>
      </Grid>
      <Grid item sm={6} xs={12}>
        <DatePicker
          name="company.hiredDate"
          label="입사일"
          value={view.hiredDate}
          setFieldValue={setFieldValue}
          errors={errors}
          openTo="year"
          required
          disableFuture
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          type="select"
          name="company.hiredType"
          label="입사 구분"
          value={view.hiredType}
          setFieldValue={setFieldValue}
          errors={errors}
          options={['신입', '경력']}
          required
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          name="company.recommender"
          label="추천자"
          value={view.recommender}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default PersonnelDetailCompany
;