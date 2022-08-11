import {
  Box,
  Button,
  Grid
} from '@mui/material';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';


export interface SearchFormProps {
  children: JSX.Element;
}

function SubmitButton() {

  const formikContext = useContext(FormikContext);
  const onClick = () => {
    if (formikContext) {
      const { handleSubmit } = formikContext;
      handleSubmit();
    }
  };

  return (
    <Button
      children="검색"
      disabled={formikContext?.isSubmitting}
      onClick={onClick}
    />
  );
}

function ClearButton() {

  const formikContext = useContext(FormikContext);
  const onClick = () => {
    formikContext?.handleReset();
    formikContext?.handleSubmit();
  };

  return (
    <Button
      color="secondary"
      onClick={onClick}
      children="초기화"
    />
  );
}

export default function SearchForm(props: SearchFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={10}>
        <Box
          children={props.children}
          sx={{
            display: 'flex',
            width:   '100%',
          }}
        />
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