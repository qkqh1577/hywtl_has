import React, { useContext } from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import {
  EstimateContentVO,
  testTypeList,
  testTypeName
} from 'admin/estimate/content/domain';
import DetailList from 'admin/estimate/content/view/Detail/DetailList';
import CheckboxField from 'components/CheckboxField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';

export default function Form() {
  const formikContext: FormikContextType<FormikEditable<EstimateContentVO>> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <h2>실험 정보</h2>
        </Grid>
        <Grid container item sm={4}>
          <Grid item sm={12}>
            <TextField
              required
              name="name"
              label="이름"
            />
          </Grid>
          {edit ? (
            <Grid item sm={12}>
              <CheckboxField
                required
                name="testType"
                label="실험 타입"
                options={testTypeList.map((item) => ({
                  key:  item as string,
                  text: testTypeName(item)
                }))}
              />
            </Grid>) : (
            <Grid item sm={12}>
              <TextField
                required
                name="testType"
                label="실험 타입"
              />
            </Grid>
          )}
        </Grid>
        <Grid container item spacing={2}>
          <Grid item sm={12}>
            <h2>내용</h2>
          </Grid>
          <Grid item sm={12}>
            <DetailList />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
