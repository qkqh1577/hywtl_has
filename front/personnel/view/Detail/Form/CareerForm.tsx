import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';

export default function CareerForm({ careerList }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={12}>
          <Grid container item sm={12}>경력 정보</Grid>
        </Grid>
        <Grid container item sm={12} spacing={2}>
          <Grid item sm={2}>
            <TextField
              name="academyName"
              label="근무처명"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              name="majorJob"
              label="직급 및 담당업무"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <DateField
              name="startDate"
              label="입사일"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <DateField
              name="endDate"
              label="퇴사일"
              labelPosition="top"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
