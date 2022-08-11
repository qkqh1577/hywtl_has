import React from 'react';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import UsernameField from 'user/view/Detail/Form/UsernameField';
import SelectField from 'components/SelectField';
import {
  userRoleList,
  userRoleName
} from 'user/domain';
import DepartmentSelector from 'components/DepartmentSelector';

export default function () {

  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <UsernameField />
      </Grid>
      <Grid item sm={3}>
        <TextField
          required
          name="name"
          label="이름"
        />
      </Grid>
      <Grid item sm={4}>
        <TextField
          required
          name="email"
          label="이메일"
        />
      </Grid>
      <Grid item sm={2}>
        <SelectField
          required
          name="role"
          label="권한"
          options={userRoleList.map((item) => ({
            key:  item,
            text: userRoleName(item)
          }))}
        />
      </Grid>
      <Grid item sm={3}>
        <DepartmentSelector
          required
          name="department.id"
          label="소속 조직"
        />
      </Grid>
    </Grid>
  );
}