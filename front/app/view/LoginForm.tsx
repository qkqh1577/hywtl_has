import React, { KeyboardEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from '@mui/material';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import { LoginParameter } from 'app/domain/parameter';
import useLogin from 'app/service/loginHook';
import PageLayout from 'layouts/PageLayout';

const LoginForm = () => {
  const { login } = useLogin();

  const handler = {
    keyDown: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
              handleSubmit: () => void
             ) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    submit:  (values: any,
              { setSubmitting, setErrors }: FormikHelpers<any>
             ) => {

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
      login(params);
    },
  };

  return (
    <PageLayout
      body={
        <Box sx={{
          display:        'flex',
          width:          '100%',
          height:         '100%',
          justifyContent: 'center',
          flexWrap:       'wrap',
        }}>
          <Box sx={{
            display:        'flex',
            justifyContent: 'center',
            width:          '100%',
            height:         '50px',
            mb:             '40px',
          }}>
            <h2>로그인</h2>
          </Box>
          <Formik
            onSubmit={handler.submit}
            initialValues={{
              username: '',
              password: '',
            }}>
            {({ values, isSubmitting, handleChange, handleSubmit }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="params-username">아이디</InputLabel>
                      <Input required
                        type="text"
                        id="params-username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="username" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="params-password">비밀번호</InputLabel>
                      <Input required
                        type="password"
                        id="params-password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                          handler.keyDown(e, handleSubmit);
                        }}
                      />
                      <ErrorMessage name="password" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={12}>
                    <Box sx={{
                      display:        'flex',
                      justifyContent: 'space-between',
                      width:          '100%',
                      mt:             '40px',
                    }}>
                      <Button
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}>
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
      }
    />
  );
};

export default LoginForm;


