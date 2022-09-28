import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import CheckboxField from 'components/CheckboxField';
import {
  testTypeList,
  testTypeName
} from 'admin/estimate/template/domain';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import { keywordTypeList } from 'admin/estimate/template/query';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';

export default function () {

  return (
    <SearchForm>
      <SearchFormField
        label="실험 타입"
        children={
          <CheckboxField
            disableLabel
            name="testType"
            label="실험 타입"
            options={testTypeList.map(testType => ({
              key:  testType as string,
              text: testTypeName(testType)
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
            name="keywordType"
            label="검색 대상"
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