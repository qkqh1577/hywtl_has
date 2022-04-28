import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel, MenuItem,
  Paper, Select
} from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { UserInvitationInviteParameter } from 'services/user/invitation/parameter';
import { userRoleName, userRoleList } from 'services/user/data';
import { UserRole } from 'services/user/entity';
import useUserInvitation from 'services/user/invitation/hook';
import DepartmentSelector from 'components/DepartmentSelector';
import { ListDepartment } from 'services/department/entity';

type Parameter = {
  name: string;
  email: string;
  userRole: UserRole | '';
  department: ListDepartment | null;
}
const initialParameter: Parameter = {
  name: '',
  email: '',
  userRole: '',
  department: null,
};

const UserInviteForm = () => {
  const { invite } = useUserInvitation();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
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
        if (data) {
          window.alert('유저에게 이메일을 발송하였습니다.');
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>유저 초대</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Formik
              initialValues={initialParameter}
              onSubmit={handler.submit}
            >
              {({ values, isSubmitting, setFieldValue, handleChange, handleSubmit }) => (
                <Form>
                  <Grid container spacing={1}>
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
                        <InputLabel htmlFor="params-email">이메일</InputLabel>
                        <Input
                          type="text"
                          id="params-email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="이메일을 입력하세요"
                          required
                        />
                        <ErrorMessage name="email" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="params-role-label">권한</InputLabel>
                        <Select
                          labelId="params-userRole-label"
                          id="params-userRole"
                          name="userRole"
                          label="권한"
                          value={values.userRole}
                          onChange={handleChange}
                          required
                        >
                          {userRoleList.map((item) => (
                            <MenuItem key={item} value={item}>{userRoleName(item)} 권한</MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage name="userRole" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <DepartmentSelector
                        name="department"
                        label="소속 부서"
                        value={values.department}
                        setFieldValue={setFieldValue}
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