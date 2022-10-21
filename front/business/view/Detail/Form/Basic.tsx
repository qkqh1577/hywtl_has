import React, { useContext } from 'react';
import {
  Box,
  InputAdornment
} from '@mui/material';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';

interface Props {
  checkButton: React.ReactNode;
}

export default function BusinessBasicSection(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
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
        <TextBox variant="body7">업체 정보</TextBox>
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
          width:        '80%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel required={edit} label="업체명">
            <Input
              readOnly={!edit}
              key={formik.values.name}
              defaultValue={formik.values.name ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.name !== value) {
                  formik.setFieldValue('name', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="대표명">
            <Input
              readOnly={!edit}
              key={formik.values.ceoName}
              defaultValue={formik.values.ceoName ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.name !== value) {
                  formik.setFieldValue('ceoName', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel required={edit} label="사업자번호">
            <Input
              readOnly={!edit}
              key={formik.values.registrationNumber}
              defaultValue={formik.values.registrationNumber ?? ''}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                  {props.checkButton}
                </InputAdornment>
              }
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.name !== value) {
                  formik.setFieldValue('registrationNumber', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="대표 전화번호">
            <Input
              readOnly={!edit}
              key={formik.values.officePhone}
              defaultValue={formik.values.officePhone ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.name !== value) {
                  formik.setFieldValue('officePhone', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="팩스 번호">
            <Input
              readOnly={!edit}
              key={formik.values.fax}
              defaultValue={formik.values.fax ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.fax !== value) {
                  formik.setFieldValue('fax', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="주소">
            <Input
              readOnly={!edit}
              key={formik.values.address}
              defaultValue={formik.values.address ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.address !== value) {
                  formik.setFieldValue('address', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="우편 번호">
            <Input
              readOnly={!edit}
              key={formik.values.zipCode}
              defaultValue={formik.values.zipCode ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.zipCode !== value) {
                  formik.setFieldValue('zipCode', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="우편 번호">
            <Input
              readOnly={!edit}
              key={formik.values.note}
              defaultValue={formik.values.note ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.note !== value) {
                  formik.setFieldValue('note', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
    </Box>
  );
};
