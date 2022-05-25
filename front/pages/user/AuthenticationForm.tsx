import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  AddUserParameter,
  userApi
} from 'services/user';
import {
  UserInvitation,
  userInvitationApi
} from 'services/user/invitation';
import { DataField } from 'components';

const UserAuthenticationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const [detail, setDetail] = useState<UserInvitation | undefined>();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const error: any = {};

      const name: string = values.name;
      if (!name) {
        error.name = '이름 입력은 필수입니다.';
      }

      const username: string = values.username;
      if (!username) {
        error.username = '아이디 입력은 필수입니다.';
      }

      const password: string = values.password;
      if (!password) {
        error.password = '비밀번호 입력은 필수입니다.';
      }

      const passwordCheck: string = values.passwordCheck;
      if (!passwordCheck) {
        error.passwordCheck = '비밀번호 확인 입력은 필수입니다.';
      }

      if (password !== passwordCheck) {
        error.passwordCheck = '비밀번호 확인이 일치하지 않습니다.';
      }

      if (Object.keys(error).length > 0) {
        setErrors(error);
        setSubmitting(false);
        return;
      }

      const params: AddUserParameter = {
        name,
        username,
        password,
        email,
        authKey
      };
      userApi.add(params).then((() => {
        window.alert('가입이 완료되었습니다.');
        navigate('/login');
      })).catch((e) => {
        console.log(e);
      }).finally(() => {
        setSubmitting(false);
      });
    }
  };

  useEffect(() => {
    if (email && authKey) {
      userInvitationApi.getOne({
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
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>계정 등록</h2>
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
            onSubmit={handler.submit}
            initialValues={{
              name: detail.name,
              email: detail.email,
              username: '',
              password: '',
              passwordCheck: '',
            }}>
            {({ values, errors, isSubmitting, setFieldValue, handleSubmit }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <DataField disabled
                      name="email"
                      label="이메일"
                      value={values.email}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <DataField required
                      name="name"
                      label="이름"
                      value={values.name}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <DataField required
                      name="username"
                      label="아이디"
                      value={values.username}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <DataField required
                      type="password"
                      name="password"
                      label="비밀번호"
                      value={values.password}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      placeholder="사용할 비밀번호를 입력하세요"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <DataField required
                      type="password"
                      name="passwordCheck"
                      label="비밀번호 확인"
                      value={values.passwordCheck}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      placeholder="사용할 비밀번호를 다시 입력하세요"
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
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}>
                        {isSubmitting ? ' 가입 요청 중' : '가입'}
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

export default UserAuthenticationForm;