import React, { useContext } from 'react';
import {
  Box,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup
} from '@mui/material';
import UploadField from 'components/UploadField';
import { FormikContext } from 'formik';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { sexCategoryList } from 'user/domain';
import { fileToView } from 'file-item';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

interface Props {
  onAddressModal: DefaultFunction;
}
export default function BasicForm(props: Props) {
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
          <DataFieldWithLabel label="영문명" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={values.engName}
              defaultValue={values.engName ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
          <DataFieldWithLabel label="생년월일" labelSX={{minWidth: '80px'}}>
            <DatePicker
              openTo="year"
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              readOnly={!edit}
              value={values.birthDate ? dayjs(values.birthDate)
              .format('YYYY-MM-DD') : null}
              onChange={(e) => {
                if (!edit) {
                  return;
                }
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
          <DataFieldWithLabel label="성별" labelSX={{minWidth: '80px'}}>
            {!edit && (
              <Input
                readOnly
                key={values.sex}
                defaultValue={values.sex ?? '-'}
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
          <DataFieldWithLabel label="핸드폰" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={values.phone}
              defaultValue={values.phone ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
          <DataFieldWithLabel label="개인 이메일" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={values.personalEmail}
              defaultValue={values.personalEmail ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
          <DataFieldWithLabel label="비상 연락처" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={values.emergencyPhone}
              defaultValue={values.emergencyPhone ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
          }  labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={values.relationship}
              defaultValue={values.relationship ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
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
          <DataFieldWithLabel label="거주지 주소" labelSX={{minWidth: '80px'}}>
            <Input
              readOnly={!edit}
              key={values.address}
              value={values.address ?? ''}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                  <Button disabled={!edit} onClick={props.onAddressModal}>
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
          width:        '100%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="프로필 사진" labelSX={{minWidth: '80px'}}>
            <UploadField
              preview
              accept="image/*"
              edit={edit}
              disableDownload
              value={values.image}
              onChange={(e) => {
                if (!e.target || !e.target.files || e.target.files.length === 0) {
                  formik.setFieldValue('basic.image', undefined);
                  return;
                }
                formik.setFieldValue('basic.image', fileToView(e.target.files![0]));
              }}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
    </Box>
  );
}
