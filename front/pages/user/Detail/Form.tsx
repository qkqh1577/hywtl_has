import {
  ChangeUserParameter,
  UserForm,
  UserRole,
  userRoleList,
  userRoleName,
  useUser
} from 'services/user';
import {
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import {
  Box,
  Button,
  Grid
} from '@mui/material';
import {
  DepartmentSelector,
  useDialog
} from 'components';
import React, { useMemo } from 'react';
import {
  PasswordResetParameter,
  usePasswordReset
} from 'services/user/password_reset';
import UserDetailCancelButton from 'pages/user/Detail/CancelButton';
import UserDetailSubmitButton from 'pages/user/Detail/SubmitButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

export default function UserDetailForm() {
  const {
          state: { detail },
          change
        } = useUser();

  const initialValues: Partial<UserForm> = useMemo(() => {
    return {
      ...detail,
      departmentId: detail?.department.id,
    };
  }, [detail]);
  const dialog = useDialog();

  const {
          reset
        } = usePasswordReset();

  const handler = {
    submit:   (values: any,
               { setSubmitting, setErrors }: FormikHelpers<any>
              ) => {
      if (!detail) {
        dialog.alert('잘못된 접근입니다.');
        return;
      }
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
        error.departmentId = '부서 선택은 필수입니다.';
      }

      if (Object.keys(error).length > 0) {
        setErrors(error);
        setSubmitting(false);
        return;
      }
      const params: ChangeUserParameter = {
        id: detail.id,
        name,
        email,
        userRole,
        departmentId,
      };

      change(params, (data) => {
        setSubmitting(false);
        if (data) {
          dialog.alert('저장하였습니다.');
        }
      });
    },
    password: () => {
      if (!detail) {
        dialog.alert('잘못된 접근입니다.');
        return;
      }
      dialog.confirm({
        children:     '해당 유저의 비밀번호를 변경할 수 있게 메일을 발송하겠습니까?',
        confirmText:  '발송',
        afterConfirm: () => {
          const params: PasswordResetParameter = {
            email: detail.email
          };
          reset(params, (data) => {
            if (data) {
              dialog.alert('비밀번호 변경 메일을 발송하였습니다.');
            }
          });
        }
      });
    },
  };

  return (
    <Formik enableReinitialize
      onSubmit={handler.submit}
      initialValues={initialValues}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <TextField
              disabled
              name="username"
              label="아이디"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              required
              name="name"
              label="이름"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              required
              name="email"
              label="이메일"
            />
          </Grid>
          <Grid item sm={2}>
            <SelectField
              required
              name="userRole"
              label="권한"
              options={userRoleList.map((item) => ({
                key:  item,
                text: userRoleName(item)
              }))}
            />
          </Grid>
          <Grid item sm={3}>
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
              <UserDetailCancelButton />
              <UserDetailSubmitButton />
              <Button style={{ float: 'right' }} onClick={handler.password}>
                비밀번호 변경
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}