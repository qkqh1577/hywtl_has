import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import CheckboxField from 'components/CheckboxField';
import {
  testTypeList,
  testTypeName
} from 'type/TestType';
import { keywordTypeList } from 'admin/estimate/template/query';
import React, { useContext } from 'react';
import Select from 'layouts/Select';
import { FormikContext } from 'formik';
import { MenuItem } from '@mui/material';
import Input from 'layouts/Input';

export default function () {

  const formik = useContext(FormikContext);

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