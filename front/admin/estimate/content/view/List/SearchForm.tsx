import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import React from 'react';
import { keywordTypeList } from 'admin/estimate/content/query';
import CheckboxField from 'components/CheckboxField';
import {
  TestType,
  testTypeList,
  testTypeName
} from 'type/TestType';
import { ColorPalette } from 'app/view/App/theme';

export default function () {
  return (
    <SearchForm>
      <SearchFormField
        label="실험 종류"
        children={
          <CheckboxField
            disableLabel
            name="testType"
            label="실험 종류"
            options={testTypeList.map(item => ({
              key:      item as string,
              text:     testTypeName(item),
              disabled: item === TestType.COMMON || item === TestType.REVIEW
            }))}
          />
        }
      />
      <SearchFormField
        label={
          <SelectField
            disableLabel
            variant="outlined"
            border="none"
            backgroundColor={ColorPalette.transparent}
            name="keywordType"
            label="검색 대상"
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
};
