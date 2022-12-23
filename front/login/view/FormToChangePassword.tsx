import React, { useContext } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import {
  PasswordValidation,
  PasswordValidationCode
} from 'login/parameter';
import TextBox from 'layouts/Text';
import { FormikContext } from 'formik';
import logo from 'assets/loginLogo.png';

interface Props {
  passwordValidation?: PasswordValidation;
}

function FormToChangePassword({ passwordValidation }: Props) {
  const formik = useContext(FormikContext);

  return (
    <Box sx={{
      display:       'flex',
      width:         '100%',
      height:        '50%',
      alignItems:    'center',
      flexWrap:      'wrap',
      flexDirection: 'column',
      marginTop:     '40vh',
    }}>
      <img
        src={logo}
        width="auto"
        alt="한양풍동실험연구소_로고"
      />
      <h2>비밀번호 재설정</h2>
      <Box sx={{
        display:       'flex',
        flexDirection: 'column',
        flexWrap:      'nowrap',
        width:         '25%',
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
        width:         '25%',
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
      <Box sx={{
        width:     '25%',
      }}>
        <Button
          sx={{
            width:     '100%',
            marginTop: '10px'
          }}
          onClick={() => {
            formik.handleSubmit();
          }}>
          확인
        </Button>
      </Box>
      <Box sx={{
        display:        'flex',
        justifyContent: 'flex-end',
        marginTop:      '10px'
      }}>
      </Box>
    </Box>
  );
}

export default FormToChangePassword;
