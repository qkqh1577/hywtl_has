import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';

export default function LanguageForm({ languageList }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={12}>
          <Grid container item sm={12}>어학 정보</Grid>
        </Grid>
        <Grid container item sm={12} spacing={2}>
          <Grid item sm={2}>
            <TextField
              name="name"
              label="자격증명"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="type"
              label="대상 언어"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="grade"
              label="급수, 종류"
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
            <DateField
              name="certifiedDate"
              label="취득일(시작일)"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <DateField
              name="expiryPeriod"
              label="유효기간(종료일)"
              labelPosition="top"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
