import React, { useContext } from 'react';
import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import {
  accountStateTypeList,
  dateTypeList,
  hiredTypeList,
  keywordTypeList,
} from 'personnel/query';
import CheckboxField from 'components/CheckboxField';
import DepartmentCheckboxField from 'components/DepartmentCheckboxField';
import TextBox from 'layouts/Text';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import {
  Box,
  MenuItem
} from '@mui/material';
import { sexCategoryList } from 'user/domain';
import Select from 'layouts/Select';

export default function SearchBox() {
  const formik = useContext(FormikContext);
  return (
    <SearchForm>
      <SearchFormField
        label="성별"
        children={
          <CheckboxField
            disableLabel
            name="sex"
            label="성별"
            options={sexCategoryList.map(item => ({
              key:  item as string,
              text: item
            }))}
          />
        }
      />
      <SearchFormField
        label="입사구분"
        children={
          <CheckboxField
            disableLabel
            name="hiredType"
            label="입사구분"
            options={hiredTypeList}
          />
        }
      />
      <SearchFormField
        label="계정 상태"
        children={
          <CheckboxField
            disableLabel
            name="status"
            label="계정상태"
            options={accountStateTypeList}
          />
        }
      />
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
      <SearchFormField
        label={
          <Select
            variant="transparent"
            value={formik.values.dateType ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.dateType !== value) {
                formik.setFieldValue('dateType', value);
              }
            }}>
            {dateTypeList.map(item => (
              <MenuItem key={item.key} value={item.key}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        }
        children={
          <Box sx={{
            width:          '100%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}>
            <DatePicker
              value={formik.values.startDate ? dayjs(formik.values.startDate)
              .format('YYYY-MM-DD') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="day"
              onChange={(e) => {
                if (e === null) {
                  formik.setFieldValue('startDate', undefined);
                }
                else {
                  formik.setFieldValue('startDate', dayjs(e)
                  .format('YYYY-MM-DD'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="outlined"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
            <TextBox
              variant="body9"
              sx={{
                margin: '0 10px'
              }}>
              ~
            </TextBox>
            <DatePicker
              value={formik.values.endDate ? dayjs(formik.values.endDate)
              .format('YYYY-MM-DD') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="day"
              onChange={(e) => {
                if (e === null) {
                  formik.setFieldValue('endDate', undefined);
                }
                else {
                  formik.setFieldValue('endDate', dayjs(e)
                  .format('YYYY-MM-DD'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="outlined"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </Box>
        }
      />
      <SearchFormField
        label="소속"
        children={
          <DepartmentCheckboxField
            disableLabel
            name="departmentId"
            label="소속"
          />
        }
      />
    </SearchForm>
  );
}
