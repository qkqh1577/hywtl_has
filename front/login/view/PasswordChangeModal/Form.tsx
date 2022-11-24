import React, { useContext } from 'react';
import { Box } from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import TextBox from 'layouts/Text';
import { FormikContext } from 'formik';
import {
  PasswordValidation,
  PasswordValidationCode
} from 'login/parameter';

interface Props {
  passwordValidation?: PasswordValidation;
}

function Form({ passwordValidation }: Props) {
  const formik = useContext(FormikContext);

  return (
    <Box sx={{
      width: '100%',
    }}>
      <Box sx={{
        display:       'flex',
        flexDirection: 'column',
        flexWrap:      'nowrap',
        width:         '100%',
        marginBottom:  '40px',
      }}>
        <DataFieldWithLabel
          label="현재 비밀번호"
          labelPosition="top"
        >
          <Input
            key={formik.values.nowPassword}
            type="password"
            autoComplete="off"
            defaultValue={formik.values.nowPassword ?? ''}
            placeholder="현재 비밀번호를 입력해주세요."
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.nowPassword !== value) {
                formik.setFieldValue('nowPassword', value);
              }
            }}
          />
        </DataFieldWithLabel>
        {[PasswordValidationCode.PASSWORD_NOT_MATCH,
          PasswordValidationCode.USER_NOW_PASSWORD_NOT_BLANK].includes(passwordValidation?.code as PasswordValidationCode) && (
          <Box sx={{
            display:        'flex',
            justifyContent: 'center',
            marginTop:      '15px',
          }}>
            <TextBox variant="body20">
              {passwordValidation?.message}
            </TextBox>
          </Box>
        )}
      </Box>
      <Box sx={{
        display:       'flex',
        flexDirection: 'column',
        flexWrap:      'nowrap',
        width:         '100%',
        marginBottom:  '40px',
      }}>
        <DataFieldWithLabel
          label="신규 비밀번호"
          labelPosition="top"
        >
          <Input
            key={formik.values.newPassword}
            type="password"
            autoComplete="off"
            defaultValue={formik.values.newPassword ?? ''}
            placeholder="신규 비밀번호는 영문, 숫자, 특수문자 조합 8자리 이상으로 입력해 주세요"
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.newPassword !== value) {
                formik.setFieldValue('newPassword', value);
              }
            }}
          />
        </DataFieldWithLabel>
        {[PasswordValidationCode.PASSWORD_SAME,
          PasswordValidationCode.PASSWORD_ROLE_VIOLATION,
          PasswordValidationCode.USER_NEW_PASSWORD_NOT_BLANK].includes(passwordValidation?.code as PasswordValidationCode) && (
          <Box sx={{
            display:        'flex',
            justifyContent: 'center',
            marginTop:      '15px',
          }}>
            <TextBox variant="body20">
              {passwordValidation?.message}
            </TextBox>
          </Box>
        )}
      </Box>
      <Box sx={{
        display:       'flex',
        flexDirection: 'column',
        flexWrap:      'nowrap',
        width:         '100%',
      }}>
        <DataFieldWithLabel
          label="신규 비밀번호 확인"
          labelPosition="top"
        >
          <Input
            key={formik.values.newPasswordConfirm}
            type="password"
            autoComplete="off"
            defaultValue={formik.values.newPasswordConfirm}
            placeholder="신규 비밀번호를 다시 입력해주세요."
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.checkPassword !== value) {
                formik.setFieldValue('newPasswordConfirm', value);
              }
            }}
          />
        </DataFieldWithLabel>
        {[PasswordValidationCode.PASSWORD_NOT_EQUAL_NEW_PASSWORD,
          PasswordValidationCode.USER_NEW_PASSWORD_CONFIRM_NOT_BLANK].includes(passwordValidation?.code as PasswordValidationCode) && (
          <Box sx={{
            display:        'flex',
            justifyContent: 'center',
            marginTop:      '15px',
          }}>
            <TextBox variant="body20">
              {passwordValidation?.message}
            </TextBox>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Form;
