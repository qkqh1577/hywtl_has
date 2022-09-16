import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import TextField from 'components/TextField';
import { FormikContext } from 'formik';
import Button from 'layouts/Button';

function BackToCalendarButton() {
  const onClick = () => {
    console.log('달력으로 돌아가기');
  };
  return (
    <Button
      shape="basic2"
      onClick={onClick}
    >
      달력으로 돌아가기
    </Button>
  );
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

export default function SearchSection() {
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
    }}>
      <Box sx={{
        display:     'flex',
        width:       '60%',
      }}>
        <Box sx={{
          width:       '100%',
          marginRight: '10px'
        }}>
          <TextField
            disableLabel
            name="keyword"
            label="검색어"
            placeholder="일정을 검색해주세요"
            variant="outlined"
          />
        </Box>
        <Box>
          <SubmitButton />
        </Box>
      </Box>
      <Box>
        <BackToCalendarButton />
      </Box>
    </Box>
  );
};
