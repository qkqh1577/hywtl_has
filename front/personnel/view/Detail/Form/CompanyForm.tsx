import React, { useContext } from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import {
  hiredTypeList,
  PersonnelVO
} from 'personnel/domain';
import SelectField from 'components/SelectField';
import TextBox from 'layouts/Text';

export default function CompanyForm() {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'nowrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '13%',
        justifyContent: 'flex-start',
        alignItems:     'flex-start'
      }}>
        <TextBox variant="body7">입사 정보</TextBox>
      </Box>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '80%',
        justifyContent: 'space-between',
        alignItems:     'flex-start'
      }}>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DateField
            required
            name="company.hiredDate"
            label="입사일"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          {edit && (
            <SelectField
              required
              label="입사 구분"
              name="company.hiredType"
              options={hiredTypeList}
            />
          )}
          {!edit && (
            <TextField
              name="company.hiredType"
              label="입사 구분"
            />
          )}
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
          marginRight:  '47%',
        }}>
          <TextField
            name="company.recommender"
            label="추천자"
          />
        </Box>
      </Box>
    </Box>
  );
}
