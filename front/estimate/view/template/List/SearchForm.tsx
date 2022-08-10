import SearchForm from 'layouts/SearchForm';
import { Grid } from '@mui/material';
import CheckboxField from 'components/CheckboxField';
import {
  testTypeList,
  testTypeName
} from 'estimate/domain/template';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import { keywordTypeList } from 'estimate/parameter/query';
import React from 'react';

export default function () {

  return (
    <SearchForm>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CheckboxField
            name="testType"
            label="실험 타입"
            options={testTypeList.map(testType => ({
              key:  testType as string,
              text: testTypeName(testType)
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