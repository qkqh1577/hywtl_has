import React from 'react';
import {
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import RegistrationNumberCheckButton, { RegistrationNumberCheckButtonProps } from 'business/view/Detail/Form/RegistrationNumberCheckButton';

interface Props
  extends RegistrationNumberCheckButtonProps {}

export default function (props: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Typography>업체 정보</Typography>
      </Grid>
      <Grid item sm={12}>
        <TextField
          required
          name="name"
          label="업체명"
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          name="ceoName"
          label="대표명"
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          required
          name="registrationNumber"
          label="사업자번호"
          endAdornment={<RegistrationNumberCheckButton {...props} />}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          name="officePhone"
          label="대표 전화번호"
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          name="fax"
          label="팩스번호"
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="address"
          label="주소"
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          name="zipCode"
          label="우편번호"
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="note"
          label="비고"
        />
      </Grid>
    </Grid>
  );
};
