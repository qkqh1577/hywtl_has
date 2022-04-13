import React, { KeyboardEvent, useEffect } from 'react';
import { Box, Button, FormControl, Grid, Input, InputLabel, Paper } from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginParameter } from 'services/user/parameter';
import userApi from 'services/user/api';

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    userApi.getLogin().then(() => {
      const state: any | undefined = location.state;
      const prevLocation = state?.path ?? '/';
      navigate(prevLocation);
    });
  }, []);

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
        navigate('/');
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        setSubmitting(false);
      });
    }
  };

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
        width: '100%',
        justifyContent: 'center',
      }}>
        <h2>로그인</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
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
              <Grid container spacing={1}>
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