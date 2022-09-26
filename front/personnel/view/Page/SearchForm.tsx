import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SearchForm from 'layouts/SearchForm';
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
import { Option } from 'components/DataFieldProps';
import { sexCategoryList, sexCategoryName } from 'personnel/domain';

export interface SearchPersonnelFormProps {
  list: Option[];
}

export default function SearchBox({ list }: SearchPersonnelFormProps) {
  return (
    <SearchForm>
      <Box sx={{
        margin: '10px 0px',
        padding: '10px',
      }}>
        <Grid container spacing={2}>
          <Grid container item sm={12}>
            <Grid item sm={4}>
              <CheckboxField

                name="sex"
                label="성별"
                options={sexCategoryList.map(item => ({
                  key: item as string,
                  text: sexCategoryName(item)
                }))}
              />
            </Grid>
            <Grid item sm={4}>
              <CheckboxField
                name="hiredType"
                label="입사구분"
                options={hiredTypeList}
              />
            </Grid>
            <Grid item sm={4}>
              <CheckboxField
                name="status"
                label="계정상태"
                options={accountStateTypeList}
              />
            </Grid>
          </Grid>
          <Grid container item sm={12}>
            <Grid container item sm={4} spacing={2}>
              <Grid item sm={3}>
                <SelectField
                  disableLabel
                  name="keywordType"
                  label="검색 대상"
                  options={keywordTypeList}
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={7}>
                <TextField
                  disableLabel
                  name="keyword"
                  label="검색어"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item sm={8} spacing={2}>
              <Grid item sm={2}>
                <SelectField
                  disableLabel
                  name="dateType"
                  label="검색 대상"
                  options={dateTypeList}
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={2.3}>
                <DateField
                  disableLabel
                  name="startDate"
                  label="시작일"
                />
              </Grid>
              <Grid item sm={0.4}>
                <Typography>
                  ~
                </Typography>
              </Grid>
              <Grid item sm={2.3}>
                <DateField
                  disableLabel
                  name="endDate"
                  label="종료일"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item sm={12}>
            <CheckboxField
              name="departmentId"
              label="소속"
              options={list}
            />
          </Grid>
        </Grid>
      </Box>
    </SearchForm>
  );
}
