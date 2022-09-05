import React, {} from 'react';
import {
  Box,
} from '@mui/material';
import { FieldStatus } from 'components/DataFieldProps';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import SelectField from 'components/SelectField';
import {
  sexTypeList,
  sexTypeName
} from 'user/domain';
import UploadField from 'components/UploadField';

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
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
      height:   '100%',
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
        <DateField
          name="birthDate"
          label="생년월일"
        />
      </FieldBox>
      <FieldBox>
        <SelectField
          labelPosition="top"
          name="sex"
          label="성별"
          options={sexTypeList.map((item) => ({
            key:  item as string,
            text: sexTypeName(item),
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
