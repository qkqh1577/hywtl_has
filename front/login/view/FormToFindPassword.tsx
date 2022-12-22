import React, { KeyboardEvent } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { passwordToFindByEmailParameter } from 'login/parameter';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Link
} from '@mui/material';
import TextBox from 'layouts/Text';
import { ColorPalette } from 'assets/theme';

export default function FormToFindPassword(props) {
  const dispatch = useDispatch();
  const { loginError } = useSelector((root: RootState) => root.login);

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

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const parameter: passwordToFindByEmailParameter = {
        username,
      };
      // TODO: 비밀번호 찾기 위한 이메일 전송
      setSubmitting(false);
    },
  };

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
            <h2>비밀번호 찾기</h2>
            <Box sx={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
            }}>
              <TextBox variant="body12">등록된 이메일로 비밀번호 재설정 링크 메일이 발송됩니다.</TextBox>
              <TextBox variant="body12">메일이 오지 않을 경우, 관리자에게 문의주시기 바랍니다.</TextBox>
            </Box>
            <Box>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="params-username">아이디</InputLabel>
                <Input required
                  type="text"
                  id="params-username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    handler.keyDown(e, handleSubmit);
                    setSubmitting(false);
                  }}
                />
                <ErrorMessage name="username" />
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
                {isSubmitting ? ' 로그인 중' : '확인'}
              </Button>
            </Box>
            <Box sx={{
              display:        'flex',
              justifyContent: 'flex-end',
              marginTop:      '10px'
            }}>
              <Link
                onClick={() => {
                  window.open('/login', '_self');
                }}
                sx={{
                  color:    ColorPalette._386dd6,
                  fontSize: '12px',
                }}
                underline="none"
              >
                로그인으로 돌아가기
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
