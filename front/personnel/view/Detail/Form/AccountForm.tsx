import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';

export default function AccountForm(props) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      <Grid container>
        <Grid item sm={2}>
          <Grid container item sm={12}>계정 정보</Grid>
        </Grid>
        <Grid item sm={10}>
          <Grid item sm={12}>
            <TextField name="name" label="이름" />
          </Grid>
          <Grid item sm={12}>
            <TextField name="email" label="이메일" />
          </Grid>
          <Grid item sm={12}>
            <TextField name="userStatus" label="상태" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
