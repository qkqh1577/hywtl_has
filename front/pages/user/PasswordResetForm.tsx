import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField } from 'components';
import {
  PasswordChangeParameter,
  PasswordReset,
  passwordResetApi
} from 'services/user/password_reset';
import { userApi } from 'services/user';

const PasswordResetForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email: string | null = searchParams.get('email');
  const authKey: string | null = searchParams.get('authKey');

  if (!email || !authKey) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid item sm={12}>
          <h2>오류</h2>
        </Grid>
        <> 잘못된 접근입니다.</>
      </Paper>
    );
  }

  const [detail, setDetail] = useState<PasswordReset | undefined>();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const errors: any = {};

      const password: string = values.password;
      if (!password) {
        errors.password = '비밀번호 입력은 필수입니다.';
      }

      const passwordCheck: string = values.passwordCheck;
      if (!passwordCheck) {
        errors.passwordCheck = '비밀번호 확인 입력은 필수입니다.';
      }
      if (password !== passwordCheck) {
        errors.passwordCheck = '비밀번호 확인이 동일하지 않습니다.';
      }


      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: PasswordChangeParameter = {
        email,
        password,
        authKey
      };
      userApi.validatePassword(params).then(() => {
        window.alert('비밀번호 변경이 완료되었습니다. 홈으로 이동합니다.');
        navigate('/');
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        setSubmitting(false);
      });
    }
  };

  useEffect(() => {
    if (email && authKey) {
      passwordResetApi.getOne({
        email,
        authKey
      }).then(setDetail);
    }
  }, [email, authKey]);

  return (
    <Paper sx={{
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>비밀번호 변경</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
        justifyContent: 'center',
      }}>
        {!detail && (
          <> 잘못된 접근입니다.</>
        )}
        {detail && (
          <Formik
            initialValues={{
              password: '',
              passwordCheck: '',
            }}
            onSubmit={handler.submit}
          >
            {({ values, errors, isSubmitting, setFieldValue, handleSubmit }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <DataField
                      type="password"
                      name="password"
                      label="비밀번호"
                      value={values.password}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      required
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <DataField
                      type="password"
                      name="passwordCheck"
                      label="비밀번호 확인"
                      value={values.passwordCheck}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      required
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                      mt: '40px',
                    }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          handleSubmit();
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? ' 변경 요청 중' : '변경'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Paper>
  );
};

export default PasswordResetForm;
