import {
  Form,
  Formik,
  FormikConfig,
} from 'formik';
import { InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import React from 'react';
import TextField from 'components/TextField';

export interface InitialValues {
  keyword: string;
}

const initialValues: InitialValues = {
  keyword: ''
};

export default function () {

  const onSubmit: FormikConfig<InitialValues>['onSubmit']
          = (values,
             { setSubmitting }
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <Form>
        <TextField
          labelProps={{
            disableLabel: true,
          }}
          name="keyword"
          label="통합검색"
          placeholder="통합검색"
          sx={{
            width:        '240px',
            paddingLeft:  '10px',
            paddingRight: '10px',
            border:       '1px solid #44527b',
            borderRadius: '8px',
            color:        '#fff',
          }}
          endAdornment={
            <InputAdornment
              position="end"
              sx={{
                color: '#717ea8',
              }}>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Form>
    </Formik>
  );
}