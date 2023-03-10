import React, { useContext } from 'react';
import {
  Box,
  InputAdornment,
} from '@mui/material';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';
import {
  RegistrationNumberResultType,
  RegistrationNumberState
} from 'business/domain';
import { ColorPalette } from 'assets/theme';
import { UpdateByFormik } from 'components/AddressModal/AddressModal';

interface Props {
  checkButton: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
  onAddressModal: DefaultFunction;
  checkRegistrationNumber?: RegistrationNumberState;
  setAddress: DefaultFunction<UpdateByFormik>;
}

export default function BusinessBasicSection(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit === false ? !formik.values.id : (formik.values.id && formik.values.edit);

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
          <DataFieldWithLabel required={edit} label="업체명" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.name}
              defaultValue={formik.values.name ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
          <DataFieldWithLabel label="대표명" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.ceoName}
              defaultValue={formik.values.ceoName ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (formik.values.ceoName !== value) {
                  formik.setFieldValue('ceoName', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:       'flex',
          flexWrap:      'nowrap',
          width:         '47%',
          marginBottom:  '15px',
          flexDirection: 'column',
        }}>
          <DataFieldWithLabel required={edit} label="사업자번호" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.registrationNumber}
              defaultValue={formik.values.registrationNumber ?? ''}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                  {props.checkButton}
                </InputAdornment>
              }
              inputRef={props.inputRef}
            />
          </DataFieldWithLabel>
          {props.checkRegistrationNumber && (
            <Box sx={{
              display:        'flex',
              justifyContent: 'flex-end',
            }}>
              <TextBox variant="body7"
                sx={{
                  color:      `${props.checkRegistrationNumber.state === RegistrationNumberResultType.SUCCESS ? `${ColorPalette._4c9eeb}` : `${ColorPalette._eb4c4c}`}`,
                  marginLeft: '10px'
                }}>
                {props.checkRegistrationNumber.message}
              </TextBox>
            </Box>
          )}
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="대표 전화번호" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.officePhone}
              defaultValue={formik.values.officePhone ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (formik.values.officePhone !== value) {
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
          <DataFieldWithLabel label="팩스 번호" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.fax}
              defaultValue={formik.values.fax ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
          width:        '100%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="주소" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.address}
              value={formik.values.address ?? ''}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                  <Button disabled={!edit} onClick={() => {
                    props.setAddress({ formik: formik, fieldName: ['address', 'zipCode'] });
                    props.onAddressModal()
                  }
                  }>
                    주소 검색
                  </Button>
                </InputAdornment>
              }
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="우편 번호" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.zipCode}
              value={formik.values.zipCode ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '100%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="비고" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={formik.values.note}
              defaultValue={formik.values.note ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
