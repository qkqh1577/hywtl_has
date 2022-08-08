import { Grid } from '@mui/material';
import {
  Form,
  Formik,
  FormikConfig
} from 'formik';
import CheckboxField from 'components/CheckboxField';
import {
  userRoleList,
  userRoleName
} from 'user/domain/user';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import React from 'react';
import {
  keywordTypeList,
  UserQuery
} from 'user/parameter/query';
import ClearButton from 'user/view/Page/SearchForm/ClearButton';
import SubmitButton from 'user/view/Page/SearchForm/SubmitButton';

export interface SearchFormProps {
  pageQuery: UserQuery;
  onSubmit: FormikConfig<UserQuery>['onSubmit'];
}

export default function ({
                           pageQuery,
                           onSubmit,
                         }: SearchFormProps) {

  return (
    <Formik
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={pageQuery}
    >
      <Grid container spacing={2}>
        <Grid item sm={10}>
          <Form>
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
          </Form>
        </Grid>
        <Grid item
          sm={2}
          sx={{
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'space-around',
            alignContent:   'center'
          }}>
          <SubmitButton />
          <ClearButton />
        </Grid>
      </Grid>
    </Formik>
  );
}