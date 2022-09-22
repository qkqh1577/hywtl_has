import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';

export default function JobForm({ jobList }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={2}>
          <Grid container item sm={12}>소속 정보</Grid>
          <Grid container item sm={12}>대표 소속 정보</Grid>
        </Grid>
        <Grid item sm={10}>
          <Grid container item sm={12} spacing={2}>
            <Grid item sm={2}>
              <TextField
                name="department"
                label="소속부서"
                labelPosition="top"
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                name="jobTitle"
                label="직함"
                labelPosition="top"
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                name="jobType"
                label="직종"
                labelPosition="top"
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                name="jobPosition"
                label="직위"
                labelPosition="top"
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                name="jobClass"
                label="직급"
                labelPosition="top"
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                name="jobDuty"
                label="직책"
                labelPosition="top"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
