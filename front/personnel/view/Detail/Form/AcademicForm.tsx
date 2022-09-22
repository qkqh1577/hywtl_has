import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';

export default function AcademicForm({ academicList }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={12}>
          <Grid container item sm={12}>학력 정보</Grid>
        </Grid>
        <Grid container item sm={12} spacing={2}>
          <Grid item sm={2}>
            <TextField
              name="academyName"
              label="교육기관명"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="major"
              label="전공(과)"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="degree"
              label="학위"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={1}>
            <TextField
              name="state"
              label="재적상태"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={1}>
            <TextField
              name="grade"
              label="학점"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <DateField
              name="startDate"
              label="입학일"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <DateField
              name="endDate"
              label="졸업일"
              labelPosition="top"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
