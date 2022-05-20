import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  DataField,
  DateFormat,
  DepartmentSelector,
  useDialog,
} from 'components';
import {
  ChangeUserParameter,
  UserRole,
  useUser,
  userRoleList,
  userRoleName,
} from 'services/user';
import {
  PasswordResetParameter,
  usePasswordReset,
} from 'services/user/password_reset';
import PersonnelDetail from 'pages/hr/Detail';

const UserDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  const navigate = useNavigate();
  const dialog = useDialog();
  const {
    state: {
      detail
    },
    getOne,
    change,
    clearOne
  } = useUser();

  const {
    reset
  } = usePasswordReset();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
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
        children: '해당 유저의 비밀번호를 변경할 수 있게 메일을 발송하겠습니까?',
        confirmText: '발송',
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
  useEffect(() => {
    if (id) {
      getOne(id);
    }
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '50px',
          mb: '40px',
        }}>
          <h2>계정 상세 정보</h2>
        </Box>
        <Box sx={{
          display: 'flex',
          width: '100%',
          mb: '40px',
        }}>
          <Grid container spacing={2}>
            <Grid container spacing={2} item sm={6} xs={12}>
              <Grid item sm={4}>
                계정상태
              </Grid>
              <Grid item sm={8}>
                TBD
              </Grid>
            </Grid>
            <Grid container spacing={2} item sm={6} xs={12}>
              <Grid item sm={4}>
                생성일시
              </Grid>
              <Grid item sm={8}>
                <DateFormat date={detail?.createdAt} format="YYYY-MM-DD HH:mm" />
              </Grid>
            </Grid>
            <Grid container spacing={2} item sm={6} xs={12}>
              <Grid item sm={4}>
                최근접속일
              </Grid>
              <Grid item sm={8}>
                <DateFormat date={detail?.loginAt} format="YYYY-MM-DD HH:mm" />
              </Grid>
            </Grid>
            <Grid container spacing={2} item sm={6} xs={12}>
              <Grid item sm={4}>
                비밀번호 변경일
              </Grid>
              <Grid item sm={8}>
                <DateFormat date={detail?.passwordChangedAt} format="YYYY-MM-DD HH:mm" />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: '20px' }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              {detail && (
                <Formik
                  initialValues={{
                    ...detail,
                    departmentId: detail.department.id,
                  }}
                  onSubmit={handler.submit}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    dirty,
                    isSubmitting,
                    setFieldValue,
                    handleSubmit
                  }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item sm={3}>
                          <DataField
                            name="username"
                            label="아이디"
                            value={values.username}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            disabled
                          />
                        </Grid>
                        <Grid item sm={3}>
                          <DataField
                            name="name"
                            label="이름"
                            value={values.name}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            required
                          />
                        </Grid>
                        <Grid item sm={4}>
                          <DataField
                            name="email"
                            label="이메일"
                            value={values.email}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            required
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <DataField
                            type="select"
                            name="userRole"
                            label="권한"
                            value={values.userRole}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            options={userRoleList.map((item) => ({
                              key: item,
                              text: userRoleName(item)
                            }))}
                            required
                          />
                        </Grid>
                        <Grid item sm={3}>
                          <DepartmentSelector
                            name="departmentId"
                            label="소속 부서"
                            value={values.departmentId}
                            setFieldValue={setFieldValue}
                            errors={errors}
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
                              color="secondary"
                              variant="contained"
                              disabled={dirty}
                              onClick={() => {
                                navigate(-1);
                              }}
                            >
                              취소
                            </Button>
                            <Button
                              color="primary"
                              variant="contained"
                              disabled={!dirty && isSubmitting}
                              onClick={() => {
                                handleSubmit();
                              }}
                            >
                              저장
                            </Button>
                            <Button
                              style={{ float: 'right' }}
                              color="primary"
                              variant="contained"
                              onClick={handler.password}
                            >
                              비밀번호 변경
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {detail && (<PersonnelDetail />)}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ mb: '20px' }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <div style={{ textAlign: 'center' }}>
                시스템 접속 이력 조회 기능 추가 예정
              </div>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default UserDetail;
