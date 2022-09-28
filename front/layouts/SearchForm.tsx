import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import Button from 'layouts/Button';
import { ColorPalette } from 'app/view/App/theme';

export interface SearchFormProps {
  children: React.ReactNode;
}

function SubmitButton() {

  const formikContext = useContext(FormikContext);
  const onClick = () => {
    if (formikContext) {
      formikContext.setFieldValue('page', 0);
      formikContext.handleSubmit();
    }
  };

  return (
    <Button
      children="검색"
      disabled={formikContext?.isSubmitting}
      onClick={onClick}
      sx={{
        marginBottom: '15px',
      }}
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
      shape="basic4"
      onClick={onClick}
      children="초기화"
      sx={{
        marginBottom: '15px',
      }}
    />
  );
}

interface SearchFormFieldProps {
  children: React.ReactNode;
  label: React.ReactNode;
}

export function SearchFormField(props: SearchFormFieldProps) {
  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'nowrap',
      marginRight:    '80px',
      justifyContent: 'flex-start',
      alignItems:     'center',
      marginBottom:   '15px',
    }}>
      <Box sx={{
        display:     'flex',
        flexWrap:    'nowrap',
        minWidth:    '130px',
        marginRight: '20px',
        alignItems:  'center',
      }}>
        {props.label}
      </Box>
      <Box sx={{
        display:    'flex',
        flexWrap:   'nowrap',
        width:      '380px',
        alignItems: 'center',
      }}>
        {props.children}
      </Box>
    </Box>
  );
}

export default function SearchForm(props: SearchFormProps) {
  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'wrap',
      width:          '100%',
      justifyContent: 'space-between',
      alignItems:     'flex-start',
      marginLeft:     '20px',
      marginRight:    '30px',
      padding:        '20px',
      border:         `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:   '5px',
    }}>
      <Box sx={{
        display:  'flex',
        flexWrap: 'wrap',
        width:    'calc(100% - 36px)',
      }}>
        {props.children}
      </Box>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '36px',
        justifyContent: 'flex-end',
        alignItems:     'flex-start',
      }}>
        <SubmitButton />
        <ClearButton />
      </Box>
    </Box>
  );
}