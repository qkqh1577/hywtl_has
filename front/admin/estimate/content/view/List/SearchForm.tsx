import SearchForm from 'layouts/SearchForm';
import { Grid } from '@mui/material';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import React from 'react';
import { keywordTypeList } from 'admin/estimate/content/query';
import CheckboxField from 'components/CheckboxField';
import {
  TestType,
  testTypeList,
  testTypeName
} from 'admin/estimate/content/domain';

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
        <Grid item sm={12}>
          <CheckboxField
            name="testType"
            label="실험 종류"
            options={testTypeList.map(item => ({
              key:      item as string,
              text:     testTypeName(item),
              disabled: item === TestType.COMMON || item === TestType.REVIEW
            }))}
          />
        </Grid>
      </Grid>
    </SearchForm>
  );
};
