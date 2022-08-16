import {
  Box,
  Grid
} from '@mui/material';
import React from 'react';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  testTypeList,
  testTypeName
} from 'estimate_template/domain';
import DetailList from './DetailList';

export default function () {

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%'
    }}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <h2>항목 정보</h2>
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            name="title"
            label="용역 항목"
          />
        </Grid>
        <Grid item sm={6}>
          <SelectField
            required
            name="testType"
            label="실험 타입"
            options={testTypeList.map((item) => ({
              key:  item as string,
              text: testTypeName(item)
            }))}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <h2>세부 항목</h2>
        </Grid>
        <Grid item sm={12}>
          <DetailList />
        </Grid>
      </Grid>
    </Box>
  );
}