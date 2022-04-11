import React, { useEffect } from 'react';
import {
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
import useDepartment from 'services/department/hook';
import { departmentCategoryName } from 'services/department/data';
import { UserRole } from 'services/user/User';
import Department from 'services/department/Department';
import useUserInvitation from 'services/user/invitation/hook';

type Parameter = {
  name: string;
  email: string;
  userRole: UserRole | '';
  department: number | '';
}
const initialParameter: Parameter = {
  name: '',
  email: '',
  userRole: '',
  department: '',
};

const UserForm = () => {
  const { invite } = useUserInvitation();
  const { departmentState: { list: departmentList }, getAll: getAllDepartments } = useDepartment();

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

      const userRole: UserRole =
        ((): UserRole => {
          const userRole = userRoleList.find(item => item === values.userRole);
          if (userRole) {
            return userRole;
          }
          error.userRole = '권한 선택은 필수입니다.';
          return '' as UserRole;
        })();

      const departmentId: number =
        ((): number => {
          const department: Department | undefined = departmentList.find(item => item.id === values.department);
          if (department) {
            return department.id;
          }
          error.department = '부서 선택은 필수입니다.';
          return -1;
        })();


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

  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Grid item sm={12}>
        <h2>계정 초대</h2>
      </Grid>
      <Formik
        initialValues={initialParameter}
        onSubmit={handler.submit}
      >
        {({ values, isSubmitting, handleChange, handleSubmit }) => (
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
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="params-department-label">소속 부서</InputLabel>
                  <Select
                    labelId="params-department-label"
                    id="params-department"
                    name="department"
                    label="소속 부서"
                    value={values.department}
                    onChange={handleChange}
                    required
                  >
                    {departmentList.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{
                        `${item.name} ${departmentCategoryName(item.category)}`
                      }</MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="department" />
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
                  {isSubmitting ? ' 등록 중' : '등록'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default UserForm;