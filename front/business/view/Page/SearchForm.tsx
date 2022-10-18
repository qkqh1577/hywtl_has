import React, { useContext } from 'react';
import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import { keywordTypeList } from 'business/query';
import Select from 'layouts/Select';
import { MenuItem } from '@mui/material';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';

export default function () {
  const formik = useContext(FormikContext);
  return (
    <SearchForm>
      <SearchFormField
        label={
          <Select
            variant="transparent"
            value={formik.values.keywordType ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.keywordType !== value) {
                formik.setFieldValue('keywordType', value);
              }
            }}>
            {keywordTypeList.map(item => (
              <MenuItem key={item.key} value={item.key}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        }
        children={
          <Input
            variant="outlined"
            placeholder="검색어를 입력하세요"
            key={formik.values.keyword}
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
}
