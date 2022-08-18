import React from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import TextField from 'components/TextField';

export default function () {
  return (
    <Grid container spacing={2}>
      <Grid container spacing={2} item xs={4}>
      </Grid>
      <Grid container spacing={2} item xs={8}>
        <Grid item xs={12}>
          <TextField
            required
            name="name"
            label="업체명"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="ceoName"
            label="대표명"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            name="registrationNumber"
            label="사업자번호"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="officePhone"
            label="대표 전화번호"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="fax"
            label="팩스번호"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="주소"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="zipCode"
            label="우편번호"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="note"
            label="비고"
          />
        </Grid>
      </Grid>
    </Grid>
  )
};
