import React from 'react';
import {
  Grid,
} from '@mui/material';
import SelectField from 'components/SelectField';
import {
  businessManagerStatusList,
  businessManagerStatusName
} from 'business/domain';
import TextField from 'components/TextField';

export default function () {
  return (
    <Grid container spacing={2}>
      <Grid container spacing={2} item xs={4}>
      </Grid>
      <Grid container spacing={2} item xs={8}>
        <Grid item xs={4}>
          <TextField
            required
            name="name"
            label="담당자명"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="department"
            label="소속"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="jobTitle"
            label="직위"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="mobilePhone"
            label="핸드폰"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="officePhone"
            label="전화번호"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="meta"
            label="메타"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="email"
            label="이메일"
          />
        </Grid>
        <Grid item xs={4}>
          <SelectField
            options={businessManagerStatusList.map((item) => ({
              key:  item,
              text: businessManagerStatusName(item)
            }))
            }
            name="status"
            label="상태" />
        </Grid>
        <Grid item xs={4}>
          {/* 임시 name 명칭*/}
          <TextField
            name="aligned-project"
            label="담당 프로젝트"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
