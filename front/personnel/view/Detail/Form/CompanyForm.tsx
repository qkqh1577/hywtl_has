import React from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';

export default function CompanyForm({ company }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={2}>
          <Grid item sm={12}>입사 정보</Grid>
        </Grid>
        <Grid item sm={10}>
          <Grid container item sm={12} spacing={2}>
            <Grid item sm={6}>
              <Grid item sm={12}>
                <DateField label="입사일" name="hiredDate" />
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Grid item sm={12}>
                <TextField label="입사 구분" name="hiredType" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <TextField name="recommender" label="추천자" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
