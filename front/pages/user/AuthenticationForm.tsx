import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import useUserInvitation from 'services/user/invitation/hook';
import { UserAddParameter } from 'services/user/parameter';

const UserAuthenticationForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email: string | null = searchParams.get('email');
  const authKey: string | null = searchParams.get('authKey');

  const { userInvitationState: { detail }, getOne, clearOne } = useUserInvitation();

  const handler = {
    submit: (values: any, { setSubmitting }: FormikHelpers<any>) => {

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
            department: detail.department,
            userRole: detail.userRole,
            username: '',
            password: '',
            passwordCheck: '',
          }}
          onSubmit={handler.submit}
        >
          {({}) => (
            <Form>

            </Form>
          )}
        </Formik>
      )}

    </Paper>
  );
};

export default UserAuthenticationForm;