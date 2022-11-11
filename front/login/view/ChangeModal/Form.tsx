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
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import { sexCategoryList } from 'user/domain';
import { fileToView } from 'file-item';

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
            readOnly
            key={formik.values.username}
            defaultValue={formik.values.username ?? ''}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="이름" labelPosition="top">
          <Input
            readOnly
            key={formik.values.name}
            defaultValue={formik.values.name ?? ''}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="이메일" labelPosition="top">
          <Input
            readOnly
            key={formik.values.email}
            value={formik.values.email ?? ''}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="프로필 사진" labelPosition="top">
          <UploadField
            preview
            edit={true}
            disableDownload
            accept="image/*"
            value={formik.values.profile}
            onChange={(e) => {
              if (!e.target || !e.target.files || e.target.files.length === 0) {
                formik.setFieldValue('profile', undefined);
                return;
              }
              formik.setFieldValue('profile', fileToView(e.target.files![0]));
            }}
          />
        </DataFieldWithLabel>
      </FieldBox>
      <FieldBox>
        <DataFieldWithLabel label="영문명" labelPosition="top">
          <Input
            key={formik.values.engName}
            defaultValue={formik.values.engName ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.engName !== value) {
                formik.setFieldValue('engName', value);
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
            key={formik.values.mobilePhone}
            defaultValue={formik.values.mobilePhone ?? ''}
            onBlur={(e) => {
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
            key={formik.values.privateEmail}
            defaultValue={formik.values.privateEmail ?? ''}
            onBlur={(e) => {
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
            key={formik.values.emergencyPhone}
            defaultValue={formik.values.emergencyPhone ?? ''}
            onBlur={(e) => {
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
            key={formik.values.relationship}
            defaultValue={formik.values.relationship ?? ''}
            onBlur={(e) => {
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
      </FieldBox>
    </Box>
  );
};
