import SearchForm, { SearchFormField } from 'layouts/SearchForm';
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
      <SearchFormField label="권한">
        <CheckboxField
          disableLabel
          name="role"
          label="권한"
          options={userRoleList.map((item) => ({
            key:  item as string,
            text: userRoleName(item)
          }))}
        />
      </SearchFormField>
      <SearchFormField
        label={
          <SelectField
            disableLabel
            name="keywordType"
            label="검색 대상"
            options={keywordTypeList}
          />
        }
        children={
          <TextField
            disableLabel
            name="keyword"
            label="검색어"
          />
        }
      />
    </SearchForm>
  );
}