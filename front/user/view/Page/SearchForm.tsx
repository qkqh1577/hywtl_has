import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import CheckboxField from 'components/CheckboxField';
import {
  userRoleList,
  userRoleName
} from 'user/domain';
import { keywordTypeList } from 'user/query';
import React, { useContext } from 'react';
import { MenuItem } from '@mui/material';
import Select from 'layouts/Select';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';

export default function () {
  const formik = useContext(FormikContext);
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
          <Select
            displayEmpty
            variant="transparent"
            value={formik.values.keywordType ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.keywordType !== value) {
                formik.setFieldValue('keywordType', value);
              }
            }}>
            <MenuItem value="">선택</MenuItem>
            {keywordTypeList.map(item => (
              <MenuItem key={item.key} value={item.key}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        }
        children={
          <Input
            key={formik.values.keyword}
            defaultValue={formik.values.keyword ?? ''}
            variant="outlined"
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.keyword !== value) {
                formik.setFieldValue('keyword', value);
              }
            }}
          />
        }
      />
    </SearchForm>
  );
}