import React, { useContext } from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import UploadField from 'components/UploadField';
import DateField from 'components/DateField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import {
  PersonnelVO,
  sexCategoryList
} from 'personnel/domain';
import SelectField from 'components/SelectField';
import { FieldStatus } from 'components/DataFieldProps';
import TextBox from 'layouts/Text';

export default function BasicForm() {
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
        <TextBox variant="body7">기본 정보</TextBox>
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
          <TextField
            required
            name="basic.engName"
            label="영문명"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DateField
            required
            disableFuture
            name="basic.birthDate"
            label="생년월일"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginRight:  '47%',
          marginBottom: '15px',
        }}>
          <SelectField
            required
            label="성별"
            name="basic.sex"
            options={sexCategoryList}
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="basic.phone"
            label="핸드폰"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="basic.personalEmail"
            label="개인 이메일"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="basic.emergencyPhone"
            label="비상연락처"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="basic.relationship"
            label="사원과의 관계"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '100%',
          marginBottom: '15px',
        }}>
          <TextField
            name="basic.address"
            label="거주지 주소"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '100%',
          marginBottom: '15px',
        }}>
          <UploadField
            preview
            name="basic.image"
            label="프로필 사진"
            accept="image/*"
            status={edit ? FieldStatus.Idle : FieldStatus.Disabled}
          />
        </Box>
      </Box>
    </Box>
  );
}
