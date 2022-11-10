import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import Button from 'layouts/Button';
import { ColorPalette } from 'assets/theme';

export interface SearchFormProps {
  children: React.ReactNode;
}

function SubmitButton() {

  const formik = useContext(FormikContext);
  const onClick = () => {
    if (formik) {
      formik.setFieldValue('page', 0);
      formik.handleSubmit();
      formik.setSubmitting(false);
    }
  };

  return (
    <Button
      children="검색"
      onClick={onClick}
      sx={{
        marginBottom: '15px',
      }}
    />
  );
}

function ClearButton() {

  const formik = useContext(FormikContext);
  const onClick = () => {
    if (formik) {
      formik.handleReset();
      formik.handleSubmit();
      formik.setSubmitting(false);
    }
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
        display:         'flex',
        flexWrap:        'nowrap',
        minWidth:        '130px',
        marginRight:     '20px',
        alignItems:      'center',
        borderRadius:    '5px',
        backgroundColor: ColorPalette._f1f5fc,
        fontSize:        '13px',
        minHeight:       '30px',
        padding:         typeof props.label === 'string' ? '0 10px' : '0'
      }}>
        {props.label}
      </Box>
      <Box sx={{
        display:    'flex',
        flexWrap:   'nowrap',
        minWidth:   '380px',
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
