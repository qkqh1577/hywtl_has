import React, {
  KeyboardEvent,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
} from '@mui/material';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { loginAction } from 'login/action';
import { LoginParameter } from 'login/parameter';
import { RootState } from 'services/reducer';
import { closeStatus } from 'components/DataFieldProps';
import TextBox from 'layouts/Text';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { requestLogin, loginError } = useSelector((root: RootState) => root.login);
  const login = useCallback((params: LoginParameter) => dispatch(loginAction.login(params)), [dispatch]);

  const handler = {
    keyDown: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
              handleSubmit: () => void
             ) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    submit:  (values: any,
              { setSubmitting, setErrors }: FormikHelpers<any>
             ) => {

      const errors: any = {};

      const username: string = values.username;
      if (!username) {
        errors.username = '아이디를 입력해 주세요.';
      }

      const password: string = values.password;
      if (!password) {
        errors.password = '비밀번호를 입력해 주세요.';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const parameter: LoginParameter = {
        username,
        password
      };
      login(parameter);
      setSubmitting(false);
    },
  };

  useEffect(() => {
    closeStatus(requestLogin, () => {
      dispatch(loginAction.requestDetail());
    }, () => {
      dispatch(loginAction.loginError(undefined));
      dispatch(loginAction.requestLogin('idle'));
    });
  }, [requestLogin]);

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      height:         '50%',
      justifyContent: 'space-between',
      alignItems:     'center',
      flexWrap:       'wrap',
      flexDirection:  'column',
      marginTop:      '40vh',
    }}>
      <Formik
        onSubmit={handler.submit}
        initialValues={{
          username: '',
          password: '',
        }}>
        {({ values, isSubmitting, handleChange, handleSubmit, setSubmitting }) => (
          <Form
            style={{
              width: '25%'
            }}>
            <h2>로그인</h2>
            <Box>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="params-username">아이디</InputLabel>
                <Input required
                  type="text"
                  id="params-username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
                <ErrorMessage name="username" />
              </FormControl>
            </Box>
            <Box>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="params-password">비밀번호</InputLabel>
                <Input required
                  type="password"
                  id="params-password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    handler.keyDown(e, handleSubmit);
                    setSubmitting(false);
                  }}
                />
                <ErrorMessage name="password" />
              </FormControl>
            </Box>
            {loginError &&
              (<TextBox
                sx={{
                  display:        'flex',
                  justifyContent: 'center',
                  marginTop:      '10px',
                }}
                variant="body20">
                {loginError?.message}
              </TextBox>)}
            <Box>
              <Button
                sx={{
                  width:     '100%',
                  marginTop: '10px'
                }}
                disabled={isSubmitting}
                onClick={() => {
                  handleSubmit();
                }}>
                {isSubmitting ? ' 로그인 중' : '로그인'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
      }}>
        <TextBox variant="body12">임직원을 위한 시스템으로서 인가된 분만 사용할 수 있습니다.</TextBox>
        <TextBox variant="body12">불법으로 사용시에는 법적 제재를 받을 수가 있습니다.</TextBox>
        <TextBox variant="body12">Only authorized personnel can access this web site.</TextBox>
      </Box>;
    </Box>
  );
}

