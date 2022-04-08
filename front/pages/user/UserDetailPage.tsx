import React from 'react';
import { Button, Divider, Grid, Paper, TextField } from '@mui/material';
import { Formik } from 'formik';
import { makeStyles } from '@mui/styles';

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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>

      <Grid item sm={12}>
        {<h2>계정 상세 정보</h2>}
      </Grid>

      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          console.log(values);
        }}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <table style={{ width: '100%' }}>
              <tr>
                <td>계정상태</td>
                <td>정상</td>
                <td>생성일</td>
                <td>2022/03/22</td>
                <td>최근접속일</td>
                <td>2022/03/24</td>
                <td>최종비밀번호변경일</td>
                <td>2022/03/22</td>
              </tr>
            </table>
          </Grid>
          <Grid item sm={6}>
            <TextField
              type="text"
              name="name"
              label="아이디"
              value="user01"
              placeholder="아이디를 입력하세요"
              className={classes.input}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              type="text"
              name="name"
              label="이름"
              value="테스터1"
              placeholder="이름을 입력하세요"
              className={classes.input}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              type="text"
              name="name"
              label="소속"
              value="테스트팀"
              placeholder="자동으로 입력됩니다"
              className={classes.input}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              type="text"
              name="name"
              label="이메일"
              placeholder="이메일을 입력하세요"
              value="tester@hywtl.com"
              className={classes.input}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              type="text"
              name="name"
              label="전화번호"
              value="00-0000-0000"
              placeholder="전화번호를 입력하세요"
              className={classes.input}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              type="text"
              name="name"
              label="핸드폰"
              value="010-0000-0000"
              placeholder="핸드폰번호를 입력하세요"
              className={classes.input}
            />
          </Grid>

          <Grid item sm={12}>
            <Divider />
          </Grid>

          <Grid item sm={12}>
            <div style={{ textAlign: 'center' }}>인사카드 개발 시점 정보 일부 노출 예정</div>
          </Grid>

          <Grid item sm={12}>
            <Divider />
          </Grid>

          <Grid item sm={12}>
            <div style={{ textAlign: 'center' }}>시스템 접속 이력 조회 기능 추가 예정</div>
          </Grid>

          <Grid item sm={12}>
            <Divider />
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
              onClick={() => {
                history.go(-1);
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


      </Formik>

    </Paper>
  );
};

export default UserDetailPage;