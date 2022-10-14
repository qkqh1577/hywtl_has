import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import React, { useContext } from 'react';
import { keywordTypeList } from 'admin/estimate/content/query';
import CheckboxField from 'components/CheckboxField';
import {
  TestType,
  testTypeList,
  testTypeName
} from 'type/TestType';
import Select from 'layouts/Select';
import { MenuItem } from '@mui/material';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';

export default function () {
  const formik = useContext(FormikContext);
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
            variant="outlined"
            defaultValue={formik.values.keyword ?? ''}
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
};
