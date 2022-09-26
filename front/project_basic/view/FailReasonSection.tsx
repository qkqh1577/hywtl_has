import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';

export default function ProjectBasicFailReasonSection() {
  return (
    <SectionLayout title="수주실패 정보">
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <TextField
            name="win"
            label="수주업체"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            name="testAmount"
            label="풍동금액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            name="reviewAmount"
            label="구검"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            name="totalAmount"
            label="총액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            name="expectedDuration"
            label="일정"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            multiline
            name="reason"
            label="원인"
            labelWidth={7 * 6}
          />
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
