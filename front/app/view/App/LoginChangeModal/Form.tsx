import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import { FieldStatus } from 'components/DataFieldProps';
import TextField from 'components/TextField';
import UploadField from 'components/UploadField';
import RadioField from 'components/RadioField';
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
        <TextField
          labelPosition="top"
          name="username"
          label="아이디"
          status={FieldStatus.ReadOnly}
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="name"
          label="이름"
          status={FieldStatus.ReadOnly}
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="email"
          label="이메일"
          status={FieldStatus.ReadOnly}
        />
      </FieldBox>
      <FieldBox>
        <UploadField
          preview
          name="profile"
          label="프로필 사진"
          accept="image/*"
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="englishName"
          label="영문명"
        />
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
        <RadioField
          name="sex"
          label="성별"
          options={sexCategoryList.map((item) => ({
            key:  item as string,
            text: item
          }))}
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="mobilePhone"
          label="핸드폰"
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="privateEmail"
          label="개인 이메일"
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="emergencyPhone"
          label="비상 연락처"
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="relationship"
          label="관계"
        />
      </FieldBox>
      <FieldBox>
        <TextField
          labelPosition="top"
          name="address"
          label="거주지 주소"
        />
      </FieldBox>
    </Box>
  );
};
