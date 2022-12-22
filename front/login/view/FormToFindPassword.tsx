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
import logo from 'assets/loginLogo.png';
import { PasswordToFindByEmailParameter } from 'login/parameter';
import { UserPasswordChangeParameter } from 'user/parameter';
import { userAction } from 'user/action';
import useDialog from 'dialog/hook';
import { closeStatus } from 'components/DataFieldProps';
import { Progress } from 'components/Progress';

export default function FormToFindPassword(props) {
  const dispatch = useDispatch();
  const { userError, requestFindPasswordByUsername } = useSelector((root: RootState) => root.user);
  const sendEmail = useCallback((email: UserPasswordChangeParameter) => dispatch(userAction.requestEmailToChangePassword(email)), [dispatch]);
  const { confirm } = useDialog();

  const handler = {
    keyDown: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
              handleSubmit: () => void
             ) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    submit:  (values: any,
              { setSubmitting, setErrors, resetForm }: FormikHelpers<any>
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

      const parameter: PasswordToFindByEmailParameter = {
        username,
      };
      confirm({
        children:     '이메일을 전송하시겠습니까?',
        confirmText:  '확인',
        afterConfirm: () => {
          sendEmail(parameter);
        }
      });
      setSubmitting(false);
    },
  };
  useEffect(() => {
    closeStatus(requestFindPasswordByUsername,
      () => {

      },
      () => {
        dispatch(userAction.userError(undefined));
        dispatch(userAction.requestFindPasswordByUsername('idle'));
      });
  }, [requestFindPasswordByUsername]);
  return (
    <>
      <Formik
        onSubmit={handler.submit}
        initialValues={{
          username: '',
        }}>
        {({ values, isSubmitting, handleChange, handleSubmit, setSubmitting }) => (
          <Form style={{
            display:        'flex',
            width:          '100%',
            height:         '100%',
            alignItems:     'center',
            justifyContent: 'center',
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
                width:          '25%'
              }}>
              <img
                src={logo}
                width="auto"
                alt="한양풍동실험연구소_로고"
              />
              <TextBox variant="heading1">
                비밀번호 찾기
              </TextBox>
              <Box sx={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
              }}>
                <TextBox variant="body12">등록된 이메일로 비밀번호 재설정 링크 메일이 발송됩니다.</TextBox>
                <TextBox variant="body12">메일이 오지 않을 경우, 관리자에게 문의주시기 바랍니다.</TextBox>
              </Box>
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
              {userError &&
                (<TextBox
                  sx={{
                    display:        'flex',
                    justifyContent: 'center',
                    marginTop:      '10px',
                  }}
                  variant="body20">
                  {userError?.message}
                </TextBox>)}
              <Button
                sx={{
                  width:     '100%',
                  marginTop: '10px'
                }}
                disabled={isSubmitting}
                onClick={() => {
                  handleSubmit();
                }}>
                확인
              </Button>
              <Box sx={{
                display:    'block',
                marginLeft: 'auto',
                marginTop:  '10px'
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
            </Box>
          </Form>
        )}
      </Formik>
      <Progress />
    </>
  )
    ;
}
