import SearchForm from 'layouts/SearchForm';
import { Grid } from '@mui/material';
import CheckboxField from 'components/CheckboxField';
import {
  userRoleList,
  userRoleName
} from 'user/domain';
import SelectField from 'components/SelectField';
import { keywordTypeList } from 'user/query';
import TextField from 'components/TextField';
import React from 'react';

export default function () {
  return (
    <SearchForm>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CheckboxField
            name="role"
            label="권한"
            options={userRoleList.map((item) => ({
              key:  item as string,
              text: userRoleName(item)
            }))}
          />
        </Grid>
        <Grid item sm={4}>
          <SelectField
            name="keywordType"
            label="검색 대상"
            options={keywordTypeList}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            name="keyword"
            label="검색어"
          />
        </Grid>
      </Grid>
    </SearchForm>
  );
}