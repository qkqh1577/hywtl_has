import React from 'react';
import { Grid } from '@mui/material';
import SearchForm from 'layouts/SearchForm';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import {
  accountStateTypeList,
  dateTypeList,
  hiredTypeList,
  jobTypeList,
  keywordTypeList,
  sexTypeList
} from 'personnel/query';
import CheckboxField from 'components/CheckboxField';
import DateField from 'components/DateField';

export default function SearchBox(props) {
  return (
    <SearchForm>
      <Grid container spacing={2}>
        <Grid container item sm={12}>
          <Grid item sm={4}>
            <CheckboxField
              name="sex"
              label="성별"
              options={sexTypeList}
            />
          </Grid>
          <Grid item sm={4}>
            <CheckboxField
              name="hiredType"
              label="입사구분"
              options={hiredTypeList}
            />
          </Grid>
          <Grid item sm={4}>
            <CheckboxField
              name="accountState"
              label="계정상태"
              options={accountStateTypeList}
            />
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={2}>
            <SelectField
              disableLabel
              name="keywordType"
              label="검색 대상"
              options={keywordTypeList}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              disableLabel
              name="keyword"
              label="검색어"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={2}>
            <SelectField
              disableLabel
              name="dateType"
              label="검색 대상"
              options={dateTypeList}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={3}>
            <DateField
              disableLabel
              name="startDate"
              label="시작일"
            />
          </Grid>
          <Grid item sm={3}>
            <DateField
              disableLabel
              name="endDate"
              label="종료일"
            />
          </Grid>
          <Grid container item sm={12}>
            <CheckboxField
              name="jobType"
              label="소속"
              options={jobTypeList}
            />
          </Grid>
        </Grid>
      </Grid>
    </SearchForm>
  );
}
