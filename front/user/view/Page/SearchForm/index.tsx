import {
  Box,
  Grid
} from '@mui/material';
import CheckboxField from 'components/CheckboxField';
import {
  userRoleList,
  userRoleName
} from 'user/domain/user';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import React from 'react';
import { keywordTypeList } from 'user/parameter/query';
import ClearButton from 'user/view/Page/SearchForm/ClearButton';
import SubmitButton from 'user/view/Page/SearchForm/SubmitButton';


export default function () {
  return (
    <Grid container spacing={2}>
      <Grid item sm={10}>
        <Box sx={{
          display: 'flex',
          width:   '100%',
        }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <CheckboxField
                name="role"
                label="권한"
                options={userRoleList.map((item) => ({
                  key:  item as string,
                  text: userRoleName(item)
                }))}
              />
            </Grid>
            <Grid container spacing={2} item sm={12}>
              <Grid item sm={4}>
                <SelectField
                  name="keywordType"
                  label="검색 대상"
                  options={keywordTypeList}
                />
              </Grid>
              <Grid item sm={8}>
                <TextField
                  name="keyword"
                  label="검색어"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item sm={2}>
        <Box sx={{
          padding:        '8px',
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          flexWrap:       'wrap',
          justifyContent: 'space-around',
          alignContent:   'stretch'
        }}>
          <SubmitButton />
          <ClearButton />
        </Box>
      </Grid>
    </Grid>
  );
}