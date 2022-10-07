import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';

export default function ProjectBasicDesignSection() {
  return (
    <SectionLayout title="설계개요">
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <TextField
            name="city"
            label="시/도"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            name="address"
            label="주소"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="complexCount"
            label="단지 수"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="purpose1"
            label="건물용도1"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="purpose2"
            label="건물용도2"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="lotArea"
            label="대지면적(m2)"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="totalArea"
            label="연면적(m2)"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="totalBuildingCount"
            label="총 동수"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="householdCount"
            label="세대 수"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="maximumFloor"
            label="최고 층수"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="maximumHeight"
            label="최고 높이(m)"
            labelWidth={7 * 13}
          />
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
