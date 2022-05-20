import React, { KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper
} from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { LoginParameter, userApi } from 'services/user';

const LoginForm = () => {
  const navigate = useNavigate();

  const handler = {
    keyDown: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, handleSubmit: () => void) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {

      const errors: any = {};

      const username: string = values.username;
      if (!username) {
        errors.username = '아이디를 입력해 주세요.';
      }

      const password: string = values.password;
      if (!password) {
        errors.password = '비밀번호를 입력해 주세요.';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: LoginParameter = {
        username,
        password
      };
      userApi.login(params).then(() => {
        const prevLocation = localStorage.getItem('path') ?? '/';
        navigate(prevLocation);
      }).catch(() => {
        setSubmitting(false);
      });
    },
    toPasswordForget: () => {
      navigate('/password-forgot');
    }
  };

  useEffect(() => {
    userApi.getLogin().then(() => {
      const prevLocation = localStorage.getItem('path') ?? '/';
      navigate(prevLocation);
    }).catch(() => {
      // nothing to do
    });
  }, []);

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
        <h2>로그인</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
        justifyContent: 'center',
      }}>
        <Formik initialValues={{
          username: '',
          password: '',
        }}
          onSubmit={handler.submit}
        >
          {({ values, isSubmitting, handleChange, handleSubmit }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="params-username">아이디</InputLabel>
                    <Input
                      type="text"
                      id="params-username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
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
                      onKeyDown={(e) => {
                        handler.keyDown(e, handleSubmit);
                      }}
                      required
                    />
                    <ErrorMessage name="password" />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    mt: '40px',
                  }}>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handler.toPasswordForget}
                    >
                      비밀번호 초기화
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleSubmit();
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? ' 로그인 중' : '로그인'}
                    </Button>
                  </Box>
                </Grid>
                <Grid item sm={12} sx={{ color: '#700', textAlign: 'center' }}>
                  초기 관리자 계정: admin / qwe123
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default LoginForm;
