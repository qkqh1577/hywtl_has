import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
} from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import useUserInvitation from 'services/user/invitation/hook';
import { UserAddParameter } from 'services/user/parameter';
import useUser from 'services/user/hook';

const UserAuthenticationForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email: string | null = searchParams.get('email');
  const authKey: string | null = searchParams.get('authKey');

  if (!email || !authKey) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
        <Grid item sm={12}>
          <h2>계정 등록</h2>
        </Grid>
        <> 잘못된 접근입니다.</>
      </Paper>
    );
  }

  const { userInvitationState: { detail }, getOne, clearOne } = useUserInvitation();
  const { add: addUser } = useUser();

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

      const params: UserAddParameter = {
        name,
        username,
        password,
        email,
        authKey
      };
      addUser(params, (data => {
        if (data) {
          window.alert('가입이 완료되었습니다.');
        }
        setSubmitting(false);
      }));

    }
  };

  useEffect(() => {
    console.log(email, authKey);
    if (email && authKey) {
      getOne({ email, authKey });
    }
    return () => {
      clearOne();
    };
  }, [email, authKey]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Grid item sm={12}>
        <h2>계정 등록</h2>
      </Grid>
      {!detail && (
        <> 잘못된 접근입니다.</>
      )}
      {detail && (
        <Formik
          initialValues={{
            name: detail.name,
            email: detail.email,
            username: '',
            password: '',
            passwordCheck: '',
          }}
          onSubmit={handler.submit}
        >
          {({ values, isSubmitting, handleChange, handleSubmit }) => (
            <Form>
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="params-email">이메일</InputLabel>
                    <Input
                      type="text"
                      id="params-email"
                      name="name"
                      value={values.email}
                      disabled
                    />
                    <ErrorMessage name="email" />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="params-name">이름</InputLabel>
                    <Input
                      type="text"
                      id="params-name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="이름을 입력하세요"
                      required
                    />
                    <ErrorMessage name="name" />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="params-username">아이디</InputLabel>
                    <Input
                      type="text"
                      id="params-username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      placeholder="사용할 아이디를 입력하세요"
                      required
                    />
                    <ErrorMessage name="username" />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="params-password">비밀번호</InputLabel>
                    <Input
                      type="password"
                      id="params-password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="사용할 비밀번호를 입력하세요"
                      required
                    />
                    <ErrorMessage name="password" />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="params-password-check">비밀번호 확인</InputLabel>
                    <Input
                      type="password"
                      id="params-password-check"
                      name="passwordCheck"
                      value={values.passwordCheck}
                      onChange={handleChange}
                      placeholder="사용할 비밀번호를 다시 입력하세요"
                      required
                    />
                    <ErrorMessage name="passwordCheck" />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      handleSubmit();
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? ' 가입 요청 중' : '가입'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}

    </Paper>
  );
};

export default UserAuthenticationForm;