import React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { PasswordResetParameter } from 'services/user/password_reset/parameter';
import passwordResetApi from 'services/user/password_reset/api';
import { DataField } from 'components';

const PasswordForgotForm = () => {
  const navigate = useNavigate();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const errors: any = {};

      const email: string = values.email;
      if (!email) {
        errors.email = '이메일은 필수 입력 항목입니다.';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: PasswordResetParameter = {
        email,
      };
      passwordResetApi.reset(params).then((data) => {
        if (data) {
          window.alert('이메일이 발송되었습니다. 메일함을 확인하여 주시기 바랍니다.');
          navigate('/login');
        }
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        setSubmitting(false);
      });

    },
    toLogin: () => {
      navigate('/login');
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
        justifyContent: 'center',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>비밀번호 초기화 본인 인증</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
        justifyContent: 'center',
      }}>
        <Formik initialValues={{
          email: '',
        }}
          onSubmit={handler.submit}
        >
          {({ values, isSubmitting, setFieldValue, handleSubmit }) => (
            <Form>
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <DataField
                    name="email"
                    label="이메일"
                    value={values.email}
                    setFieldValue={setFieldValue}
                    required
                  />
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
                      onClick={handler.toLogin}
                    >
                      돌아가기
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleSubmit();
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? ' 확인 중' : '초기화 요청'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default PasswordForgotForm;
