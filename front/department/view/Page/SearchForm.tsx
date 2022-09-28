import CheckboxField from 'components/CheckboxField';
import {
  departmentCategoryList,
  departmentCategoryName
} from 'department/domain';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import { keywordTypeList } from 'department/query';
import React from 'react';
import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import { ColorPalette } from 'app/view/App/theme';

export default function () {

  return (
    <SearchForm>
      <SearchFormField
        label="조직 유형"
        children={
          <CheckboxField
            disableLabel
            name="category"
            label="조직 유형"
            options={departmentCategoryList.map(item => ({
              key:  item as string,
              text: departmentCategoryName(item),
            }))}
          />
        }
      />
      <SearchFormField
        label={
          <SelectField
            disableLabel
            variant="outlined"
            name="keywordType"
            label="검색 대상"
            border="none"
            backgroundColor={ColorPalette.transparent}
            options={keywordTypeList}
          />
        }
        children={
          <TextField
            disableLabel
            variant="outlined"
            name="keyword"
            label="검색어"
          />
        }
      />
    </SearchForm>
  );
}