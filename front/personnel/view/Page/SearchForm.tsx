import React from 'react';
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
import DateField from 'components/DateField';
import {
  sexCategoryList,
  sexCategoryName
} from 'personnel/domain';
import DepartmentCheckboxField from 'components/DepartmentCheckboxField';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';

export default function SearchBox() {
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
          <>
            <DateField
              disableLabel
              variant="outlined"
              name="startDate"
              label="시작일"
            />
            <TextBox
              variant="body9"
              sx={{
                margin: '0 10px'
              }}>
              ~
            </TextBox>
            <DateField
              disableLabel
              variant="outlined"
              name="endDate"
              label="종료일"
            />
          </>
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
