import React from 'react';
import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import SelectField from 'components/SelectField';
import { keywordTypeList } from 'business/query';
import TextField from 'components/TextField';
import { ColorPalette } from 'app/view/App/theme';

export default function () {
  return (
    <SearchForm>
      <SearchFormField
        label={
          <SelectField
            disableLabel
            variant="outlined"
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
            placeholder="검색어를 입력하세요"
          />
        }
      />
    </SearchForm>
  );
}
