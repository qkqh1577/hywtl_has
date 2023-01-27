import React, {
  KeyboardEvent,
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { LoginParameter } from 'login/parameter';
import { loginAction } from 'login/action';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import { closeStatus } from 'components/DataFieldProps';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
} from '@mui/material';
import logo from 'assets/loginLogo.png';
import TextBox from 'layouts/Text';
import { DefaultFunction } from 'type/Function';

interface Props {
  onClose : DefaultFunction;
}
export default function LoginForm(props: Props) {
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
      props.onClose();
    }, () => {
      dispatch(loginAction.loginError(undefined));
      dispatch(loginAction.requestLogin('idle'));
    });
  }, [requestLogin]);


  return (
    <Formik
      onSubmit={handler.submit}
      initialValues={{
        username: '',
        password: '',
      }}>
      {({ values, isSubmitting, handleChange, handleSubmit, setSubmitting }) => (
        <Form
          style={{
            display:        'flex',
            width:          '100%',
            height:         '100%',
            justifyContent: 'center',
            alignItems:     'center',
            flexWrap:       'wrap',
            flexDirection:  'column',
          }}>
          <Box
            sx={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexWrap:       'wrap',
              flexDirection:  'column',
              width:          '460px'
            }}>

            <img
              src={logo}
              width="auto"
              alt="한양풍동실험연구소_로고"
            />
            <FormControl variant="standard" fullWidth sx={{mt: 2}}>
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
            <FormControl variant="standard" fullWidth sx={{mt: 2}}>
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
            <Button
              sx={{
                width:     '100%',
                mt: 3
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
  );
}
