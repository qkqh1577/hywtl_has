import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Divider, Grid, Paper, TextField } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { makeStyles } from '@mui/styles';
import useUser from 'services/user/hook';
import DateFormat from 'components/DateFormat';

const useStyles = makeStyles(() => ({
  component: {
    alignContent: 'flex-start',
  },
  input: {
    width: '100%'
  }
}));

const UserDetailPage = () => {
  const classes = useStyles();
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;
  const { userState: { detail }, getOne, clearOne } = useUser();

  const handler = {
    submit: (values: any, { setSubmitting }: FormikHelpers<any>) => {

    }
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
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>

      <Grid item sm={12}>
        {<h2>계정 상세 정보</h2>}
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <table style={{ width: '100%' }}>
            <tr>
              <td>계정상태</td>
              <td>정상</td>
              <td>생성일시</td>
              <td>
                <DateFormat date={detail?.createdTime} format="YYYY-MM-DD HH:mm" />
              </td>
              <td>최근접속일</td>
              <td>
                <DateFormat date={detail?.signedInTime} format="YYYY-MM-DD HH:mm" />
              </td>
              <td>최종비밀번호변경일</td>
              <td>
                <DateFormat date={detail?.passwordChangedTime} format="YYYY-MM-DD HH:mm" />
              </td>
            </tr>
          </table>
        </Grid>
      </Grid>
      {detail && (
        <Formik
          initialValues={detail}
          onSubmit={handler.submit}
        >
          {({ values, isSubmitting, handleChange, handleSubmit }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <TextField
                    type="text"
                    name="username"
                    label="아이디"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                    className={classes.input}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    type="text"
                    name="name"
                    label="이름"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                    className={classes.input}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    type="text"
                    name="email"
                    label="이메일"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                    className={classes.input}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Button
                    onClick={() => {
                      history.go(-1);
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    color="primary"
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
                    variant="outlined"
                    onClick={() => {
                      history.go(-1);
                    }}
                  >
                    비밀번호 변경
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <div style={{ textAlign: 'center' }}>인사카드 개발 시점 정보 일부 노출 예정</div>
        </Grid>
        <Grid item sm={12}>
          <Divider />
        </Grid>
        <Grid item sm={12}>
          <div style={{ textAlign: 'center' }}>시스템 접속 이력 조회 기능 추가 예정</div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserDetailPage;