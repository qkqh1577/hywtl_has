import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';

export default function LicenseForm({ licenseList }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={12}>
          <Grid container item sm={12}>면허 정보</Grid>
        </Grid>
        <Grid container item sm={12} spacing={2}>
          <Grid item sm={2}>
            <TextField
              name="name"
              label="면허정보"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="type"
              label="종별"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="organizationName"
              label="발급기관명"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="qualifiedNumber"
              label="인가번호"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="note"
              label="비고"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <DateField
              name="qualifiedDate"
              label="만료일"
              labelPosition="top"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
