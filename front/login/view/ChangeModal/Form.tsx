import React, { useContext } from 'react';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import UploadField from 'components/UploadField';
import { DatePicker } from '@mui/x-date-pickers';
import { FormikContext } from 'formik';
import dayjs from 'dayjs';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'components/DataFieldLabel';
import { sexCategoryList } from 'user/domain';

function FieldBox(props: { children: React.ReactNode }) {
  return (
    <Box
      children={props.children}
      sx={{
        width:        '100%',
        display:      'flex',
        marginBottom: '15px',
      }}
    />
  );
}

export default function () {
  const formik = useContext(FormikContext);
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <FieldBox>
        <DataFieldWithLabel label="아이디" labelPosition="top">
          <Input
            disabled
            value={formik.values.username ?? ''}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="이름" labelPosition="top">
          <Input
            disabled
            value={formik.values.name ?? ''}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="이메일" labelPosition="top">
          <Input
            disabled
            value={formik.values.email ?? ''}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="프로필 사진" labelPosition="top">
          <UploadField
            preview
            disableLabel
            name="profile"
            label="프로필 사진"
            accept="image/*"
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="영문명" labelPosition="top">
          <Input
            value={formik.values.englishName ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.englishName !== value) {
                formik.setFieldValue('englishName', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel
          label="생년월일"
          labelPosition="top"
          children={
            <DatePicker
              disableFuture
              value={formik.values.birthDate || null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="year"
              onChange={(e) => {
                if (e === null) {
                  formik.setFieldValue('birthDate', undefined);
                }
                else {
                  formik.setFieldValue('birthDate', dayjs(e)
                  .format('YYYY-MM-DD'));
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
          }
        />
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="성별" labelPosition="top">
          <RadioGroup row>
            {sexCategoryList.map(item => (
              <FormControlLabel
                key={item}
                label={item}
                control={
                  <Radio
                    checked={item === formik.values.sex}
                    value={item}
                    onChange={() => {
                      formik.setFieldValue('sex', item);
                    }}
                  />
                }
              />
            ))}
          </RadioGroup>
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="핸드폰" labelPosition="top">
          <Input
            value={formik.values.mobilePhone ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.mobilePhone !== value) {
                formik.setFieldValue('mobilePhone', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="개인 이메일" labelPosition="top">
          <Input
            value={formik.values.privateEmail ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.privateEmail !== value) {
                formik.setFieldValue('privateEmail', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="비상 연락처" labelPosition="top">
          <Input
            value={formik.values.emergencyPhone ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.emergencyPhone !== value) {
                formik.setFieldValue('emergencyPhone', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel
          labelPosition="top"
          label={
            <>
              비상 연락처
              <br />
              사원과의 관계
            </>
          }>
          <Input
            value={formik.values.relationship ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.relationship !== value) {
                formik.setFieldValue('relationship', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="거주지 주소" labelPosition="top">
          <Input
            value={formik.values.address ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.address !== value) {
                formik.setFieldValue('address', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </FieldBox>
    </Box>
  );
};
