import React, { useContext } from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import {
  hiredTypeList,
  PersonnelVO
} from 'personnel/domain';
import RadioField from 'components/RadioField';

export default function CompanyForm() {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={2}>
          <Grid item sm={12}>입사 정보</Grid>
        </Grid>
        <Grid item sm={10}>
          <Grid container item sm={12} spacing={2}>
            <Grid item sm={6}>
              <Grid item sm={12}>
                <DateField
                  name="company.hiredDate"
                  label="입사일"
                />
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Grid item sm={12}>
                {edit && (
                  <RadioField
                    label="입사 구분"
                    name="company.hiredType"
                    options={hiredTypeList}
                  />
                )}
                {!edit && (
                  <TextField
                    name="company.hiredType"
                    label="입사 구분"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="company.recommender"
              label="추천자"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
