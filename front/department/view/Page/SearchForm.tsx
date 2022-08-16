import { Grid } from '@mui/material';
import CheckboxField from 'components/CheckboxField';
import {
  departmentCategoryList,
  departmentCategoryName
} from 'department/domain';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import { keywordTypeList } from 'department/query';
import React from 'react';
import SearchForm from 'layouts/SearchForm';

export default function () {

  return (
    <SearchForm>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CheckboxField
            name="category"
            label="조직 유형"
            options={departmentCategoryList.map(item => ({
              key:  item as string,
              text: departmentCategoryName(item),
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