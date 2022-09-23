import React, { useContext } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import SelectField from 'components/SelectField';
import { FormikContext } from 'formik';
import { ColorPalette } from 'app/view/App/theme';

interface Props {
  totalElements: number;
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

export default function ({ totalElements }: Props) {

  return (

    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'flex-end',
      alignItems:     'center',
    }}>
      <Typography sx={{
        fontWeight:  'bold',
        fontSize:    '12px',
        color:       ColorPalette._252627,
        marginRight: '5px'
      }}>
        {`총 ${totalElements}건`}
      </Typography>
      <Box sx={{
        marginRight: '10px'
      }}>
        <SelectField
          disableLabel
          name="tabName"
          label="탭명 검색"
          variant="outlined"
          options={[
            '기본 정보',
            '단지 정보',
            '견적/계약',
            '진행 정보',
            '자료',
            '일정',
            '이력'
          ]}
        />
      </Box>
      <Box sx={{
        marginRight: '10px'
      }}>
        <DateField
          disableLabel
          variant="outlined"
          name="createdAt"
          label="날짜"
        />
      </Box>
      <Box sx={{
        width:       '40%',
        marginRight: '10px'
      }}>
        <TextField
          disableLabel
          name="keyword"
          label="검색어"
          placeholder="ID 검색"
          variant="outlined"
        />
      </Box>
      <SubmitButton />
    </Box>
  );
}
