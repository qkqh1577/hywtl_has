import SearchForm from 'layouts/SearchForm';
import { Grid } from '@mui/material';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import React from 'react';
import { keywordTypeList } from 'admin/estimate/content/query';

export default function () {
  return (
    <SearchForm>
      <Grid container spacing={2}>
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
};
