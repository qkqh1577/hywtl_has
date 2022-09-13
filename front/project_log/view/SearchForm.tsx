import React from 'react';
import SearchForm from 'layouts/SearchForm';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import { tabNameList } from 'project_log/query';
import SelectField from 'components/SelectField';

export default function () {
  return (
    <SearchForm>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <SelectField
            options={tabNameList}
            name="tabName"
            label="탭명 검색"
            disableLabel
          />
        </Grid>
        <Grid item sm={4}>
          <DateField name="date" label="날짜" disableLabel />
        </Grid>
        <Grid item sm={4}>
          <TextField
            name="keyword"
            label="검색어"
            disableLabel
            placeholder="ID 검색"
          />
        </Grid>
      </Grid>
    </SearchForm>
  );
}
