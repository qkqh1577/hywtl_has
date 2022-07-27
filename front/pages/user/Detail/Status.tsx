import { Grid } from '@mui/material';
import { DateFormat } from 'components';
import React from 'react';
import { useUser } from 'services/user';

export default function UserDetailStatus() {
  const { state: { detail } } = useUser();

  return (
    <Grid container spacing={2}>
      <Grid container spacing={2} item sm={6} xs={12}>
        <Grid item sm={4}>
          계정상태
        </Grid>
        <Grid item sm={8}>
          TBD
        </Grid>
      </Grid>
      <Grid container spacing={2} item sm={6} xs={12}>
        <Grid item sm={4}>
          생성일시
        </Grid>
        <Grid item sm={8}>
          <DateFormat date={detail?.createdAt} format="YYYY-MM-DD HH:mm" />
        </Grid>
      </Grid>
      <Grid container spacing={2} item sm={6} xs={12}>
        <Grid item sm={4}>
          최근접속일
        </Grid>
        <Grid item sm={8}>
          <DateFormat date={detail?.loginAt} format="YYYY-MM-DD HH:mm" />
        </Grid>
      </Grid>
      <Grid container spacing={2} item sm={6} xs={12}>
        <Grid item sm={4}>
          비밀번호 변경일
        </Grid>
        <Grid item sm={8}>
          <DateFormat date={detail?.passwordChangedAt} format="YYYY-MM-DD HH:mm" />
        </Grid>
      </Grid>
    </Grid>
  );
}