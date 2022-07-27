import React from 'react';
import {
  Box,
  Button,
  Grid,
  Paper
} from '@mui/material';
import {
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import {
  DepartmentSelector
} from 'components';
import {
  UserInvitationInviteParameter,
  useUserInvitation,
} from 'services/user/invitation';
import {
  UserRole,
  userRoleList,
  userRoleName,
} from 'services/user';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

type Parameter = {
  name: string;
  email: string;
  userRole: UserRole | '';
  departmentId: number | '';
}
const initialParameter: Parameter = {
  name:         '',
  email:        '',
  userRole:     '',
  departmentId: '',
};

const UserInviteForm = () => {
  const { invite } = useUserInvitation();

  const handler = {
    submit: (values: any,
             { setSubmitting, setErrors }: FormikHelpers<any>
            ) => {
      const error: any = {};

      const name: string = values.name;
      if (!name) {
        error.name = '이름 입력은 필수입니다.';
      }

      const email: string = values.email;
      if (!email) {
        error.email = '이메일 입력은 필수입니다.';
      }

      const userRole: UserRole = values.userRole;
      if (!userRole) {
        error.userRole = '권한 선택은 필수입니다.';
      }

      const departmentId: number = values.departmentId;
      if (!departmentId) {
        error.department = '부서 선택은 필수입니다.';
      }

      if (Object.keys(error).length > 0) {
        setErrors(error);
        setSubmitting(false);
        return;
      }

      const params: UserInvitationInviteParameter = { name, email, userRole, departmentId };
      invite(params, (data) => {
        setSubmitting(false);
        if (data) {
          window.alert('유저에게 이메일을 발송하였습니다.');
        }
      });
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{
        display:        'flex',
        justifyContent: 'space-between',
        width:          '100%',
        height:         '50px',
        mb:             '40px',
      }}>
        <h2>유저 초대</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width:   '100%',
        mb:      '40px',
      }}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Formik initialValues={initialParameter} onSubmit={handler.submit}>
              {({ isSubmitting, handleSubmit }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <TextField
                        required
                        name="name"
                        label="이름"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <TextField
                        required
                        name="email"
                        label="이메일"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <SelectField
                        required
                        name="userRole"
                        label="권한"
                        options={userRoleList.map(item => ({
                          key:  item,
                          text: `${userRoleName(item)} 권한`
                        }))}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DepartmentSelector
                        required
                        name="departmentId"
                        label="소속 부서"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Box sx={{
                        display:        'flex',
                        justifyContent: 'flex-end',
                        width:          '100%',
                        mt:             '40px',
                      }}>
                        <Button
                          disabled={isSubmitting}
                          onClick={() => {
                            handleSubmit();
                          }}>
                          {isSubmitting ? ' 등록 중' : '등록'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default UserInviteForm;