import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel, MenuItem,
  Paper, Select
} from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import useUserInvitation from 'services/user/invitation/hook';

const UserAuthenticationForm = () => {
  const { email, authKey } = useParams<{ email: string, authKey: string }>();
  const { userInvitationState: { detail }, getOne, clearOne } = useUserInvitation();
  const initialParameter = {};

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
          initialValues={initialParameter}
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