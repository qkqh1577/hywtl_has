import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
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
import DateFormat from 'components/DateFormat';
import DepartmentSelector from 'components/DepartmentSelector';
import useUser from 'services/user/hook';
import { UserRole } from 'services/user/entity';
import { userRoleList, userRoleName } from 'services/user/data';
import { ChangeUserParameter } from 'services/user/parameter';
import PersonnelDetail from 'pages/personnel/Detail';

const UserDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;
  const navigate = useNavigate();
  const {
    userState: {
      detail
    },
    getOne,
    resetPassword,
    change,
    clearOne
  } = useUser();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      if (!detail) {
        window.alert('잘못된 접근입니다.');
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
        error.department = '부서 선택은 필수입니다.';
      }

      const params: ChangeUserParameter = {
        id: detail.id,
        name,
        email,
        userRole,
        departmentId,
      };

      if (Object.keys(error).length > 0) {
        setErrors(error);
        setSubmitting(false);
        return;
      }

      change(params, (data) => {
        if (data) {
          window.alert('저장하였습니다.');
        }
        setSubmitting(false);
      });
    },
    password: () => {
      if (!detail) {
        window.alert('잘못된 접근입니다.');
        return;
      }
      if (window.confirm('해당 유저의 비밀번호를 변경할 수 있게 메일을 발송하겠습니까?')) {
        resetPassword(detail.id, (data) => {
          if (data) {
            window.alert('비밀번호 변경 메일을 발송하였습니다.');
          }
        });
      }
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
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
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
          <Grid container spacing={1}>
            <Grid container spacing={3} item sm={6} xs={12}>
              <Grid item sm={4}>
                계정상태
              </Grid>
              <Grid item sm={8}>
                TBD
              </Grid>
            </Grid>
            <Grid container spacing={3} item sm={6} xs={12}>
              <Grid item sm={4}>
                생성일시
              </Grid>
              <Grid item sm={8}>
                <DateFormat date={detail?.createdTime} format="YYYY-MM-DD HH:mm" />
              </Grid>
            </Grid>
            <Grid container spacing={3} item sm={6} xs={12}>
              <Grid item sm={4}>
                최근접속일
              </Grid>
              <Grid item sm={8}>
                <DateFormat date={detail?.loginTime} format="YYYY-MM-DD HH:mm" />
              </Grid>
            </Grid>
            <Grid container spacing={3} item sm={6} xs={12}>
              <Grid item sm={4}>
                비밀번호 변경일
              </Grid>
              <Grid item sm={8}>
                <DateFormat date={detail?.passwordChangedTime} format="YYYY-MM-DD HH:mm" />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: '20px' }}>
          <Grid container spacing={1}>
            <Grid item sm={12}>
              {detail && (
                <Formik
                  initialValues={{
                    ...detail,
                    departmentId: detail.department.id,
                  }}
                  onSubmit={handler.submit}
                >
                  {({ values, isSubmitting, handleChange, handleSubmit }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item sm={12}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="params-username">아이디</InputLabel>
                            <Input
                              type="text"
                              id="params-username"
                              name="username"
                              value={values.username}
                              disabled
                            />
                          </FormControl>
                        </Grid>
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
                            <InputLabel id="params-departmentId-label">소속 부서</InputLabel>
                            <DepartmentSelector
                              labelId="params-departmentId-label"
                              id="params-departmentId"
                              name="departmentId"
                              value={values.departmentId}
                              handleChange={handleChange}
                            />
                            <ErrorMessage name="departmentId" />
                          </FormControl>
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
                              onClick={() => {
                                navigate(-1);
                              }}
                            >
                              취소
                            </Button>
                            <Button
                              color="primary"
                              variant="contained"
                              disabled={isSubmitting}
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
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
        <Box sx={{ mb: '20px' }}>
          <Grid container spacing={1}>
            <Grid item sm={12}>
              <div style={{ textAlign: 'center' }}>시스템 접속 이력 조회 기능 추가 예정
              <input type="file" onChange={(e) => {
                e.target.files
              }} />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default UserDetail;
