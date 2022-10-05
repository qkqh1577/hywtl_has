import React, { useContext } from 'react';
import SearchForm, { SearchFormField } from 'layouts/SearchForm';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import {
  accountStateTypeList,
  dateTypeList,
  hiredTypeList,
  keywordTypeList,
} from 'personnel/query';
import CheckboxField from 'components/CheckboxField';
import {
  sexCategoryList,
  sexCategoryName
} from 'personnel/domain';
import DepartmentCheckboxField from 'components/DepartmentCheckboxField';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';

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
              text: sexCategoryName(item)
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
      <SearchFormField
        label={
          <SelectField
            disableLabel
            variant="outlined"
            border="none"
            backgroundColor={ColorPalette.transparent}
            name="dateType"
            label="검색 대상"
            options={dateTypeList}
          />
        }
        children={
          <Box sx={{
            width:          '100%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}>
            <DatePicker
              allowSameDateSelection
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
              allowSameDateSelection
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
