import React, { useContext } from 'react';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import UploadField from 'components/UploadField';
import { FormikContext } from 'formik';
import { sexCategoryList } from 'personnel/domain';
import { FieldStatus } from 'components/DataFieldProps';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'components/DataFieldLabel';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

export default function BasicForm() {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const values = formik.values.basic ?? {};
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
          <DataFieldWithLabel required={edit} label="영문명">
            <Input
              disabled={!edit}
              defaultValue={values.engName ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (values.engName !== value) {
                  formik.setFieldValue('basic.engName', value);
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
          <DataFieldWithLabel required={edit} label="생년월일">
            <DatePicker
              openTo="year"
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              disabled={!edit}
              value={values.birthDate ? dayjs(values.birthDate)
              .format('YYYY-MM-DD') : null}
              onChange={(e) => {
                const value = e ? dayjs(e)
                .format('YYYY-MM-DD') : undefined;
                const formikValue = values.birthDate ? dayjs(values.birthDate)
                .format('YYYY-MM-DD') : undefined;
                if (formikValue !== value) {
                  formik.setFieldValue('basic.birthDate', value);
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="standard"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginRight:  '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel required={edit} label="성별">
            {!edit && (
              <Input
                disabled
                value={values.sex ?? '-'}
              />
            )}
            {edit && (
              <RadioGroup row>
                {sexCategoryList.map(item => (
                  <FormControlLabel
                    key={item}
                    label={item}
                    control={
                      <Radio
                        value={item as string}
                        checked={item === values.sex}
                        onChange={() => {
                          const value = item;
                          if (values.sex !== value) {
                            formik.setFieldValue('basic.sex', value);
                          }
                        }}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            )}
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="핸드폰">
            <Input
              disabled={!edit}
              defaultValue={values.phone ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (values.phone !== value) {
                  formik.setFieldValue('basic.phone', value);
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
          <DataFieldWithLabel label="개인 이메일">
            <Input
              disabled={!edit}
              defaultValue={values.personalEmail ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (values.phone !== value) {
                  formik.setFieldValue('basic.personalEmail', value);
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
          <DataFieldWithLabel label="비상 연락처">
            <Input
              disabled={!edit}
              defaultValue={values.emergencyPhone ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (values.phone !== value) {
                  formik.setFieldValue('basic.emergencyPhone', value);
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
          <DataFieldWithLabel label={
            <>
              비상 연락처
              <br />
              사원과의 관계
            </>
          }>
            <Input
              disabled={!edit}
              defaultValue={values.relationship ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (values.phone !== value) {
                  formik.setFieldValue('basic.relationship', value);
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
          <DataFieldWithLabel label="거주지 주소">
            <Input
              disabled={!edit}
              defaultValue={values.address ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (values.phone !== value) {
                  formik.setFieldValue('basic.address', value);
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
