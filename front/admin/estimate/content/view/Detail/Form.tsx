import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  testTypeList,
  testTypeName
} from 'admin/estimate/content/domain';
import DetailList from 'admin/estimate/content/view/Detail/DetailList';

export default function Form() {
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
        <Grid item sm={6}>
          <TextField
            required
            name="name"
            label="이름"
          />
        </Grid>
        <Grid item sm={6}>
          <SelectField
            required
            name="testType"
            label="실험 타입"
            options={testTypeList.map((item) => ({
              key: item as string,
              text: testTypeName(item)
            }))}
          />
        </Grid>
        <Grid container spacing={2}>
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
