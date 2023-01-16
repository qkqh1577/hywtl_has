import React, {
  useCallback,
  useEffect
} from 'react';
import useId from 'services/useId';
import useDialog from 'dialog/hook';
import {
  UserId,
  UserVO
} from 'user/domain';
import UserDetail from 'user/view/Detail';
import {AppRoute} from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {userAction} from 'user/action';
import {
  initialUserParameter,
  UserChangeParameter,
  UserPasswordChangeParameter
} from 'user/parameter';
import {RootState} from 'services/reducer';
import {closeStatus} from 'components/DataFieldProps';
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {detail, requestChange} = useSelector((root: RootState) => root.user);
  const {confirm, rollback, alert} = useDialog();
  const change = useCallback((formikProps: UserChangeParameter) => dispatch(userAction.change(formikProps)), [dispatch]);
  const invite = useCallback((props) => dispatch(userAction.invite(props)), [dispatch]);
  const sendEmail = useCallback((email: UserPasswordChangeParameter) => dispatch(userAction.requestEmailToChangePassword(email)), [dispatch]);

  const validate = (values: UserChangeParameter) => {
    const messages: string[] = [];
    if (!values.email) {
      messages.push('이메일은 필수항목 입니다');
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      messages.push('이메일이 유효하지 않습니다');
    }
    if (!values.name) messages.push('이름은 필수항목 입니다');
    if (!values.role) messages.push('권한은 필수항목 입니다');
    if (!values.departmentId) messages.push('소속 조직은 필수항목 입니다');
    messages.length > 0 && alert({
      title: '확인',
      children: messages.map((value, index) => <Box key={index} sx={{width: '100%'}}>{value}</Box>)
    });
    return messages.length === 0;
  }

  const formik = useFormik<UserChangeParameter>({
    initialValues: initialUserParameter,
    onSubmit: (values) => {
      if (values.id) {
        validate(values) && change({
          id: values.id,
          name: values.name,
          email: values.email,
          role: values.role,
          departmentId: values.departmentId ?? (values as unknown as UserVO).department.id,
        });
      } else {
        validate(values) && invite({
          parameter: {
            email: values.email,
            name: values.name,
            departmentId: values.departmentId ?? (values as unknown as UserVO).department.id,
            role: values.role,
          },
          callback: () => {
            alert({
              title: '확인',
              children: '초대 메일을 발송하였습니다'
            });
            navigate('/admin/user-management');
          }
        });
      }
    }
  });

  useEffect(() => {
    dispatch(userAction.setId(id ? UserId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        departmentId: detail.department.id,
        edit: false,
      } as unknown as UserChangeParameter);
    } else {
      formik.setValues(initialUserParameter);
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestChange, () => {
      alert('변경하였습니다.');
      dispatch(userAction.setId(UserId(id!)));
    }, () => {
      formik.setSubmitting(false);
      dispatch(userAction.requestChange('idle'));
    });
  }, [requestChange]);

  return (
    <FormikProvider value={formik}>
      <UserDetail
        onCancel={() => {
          rollback(() => {
            if (detail) {
              formik.setValues({
                ...detail,
                edit: false,
              } as unknown as UserChangeParameter);
            } else {
              navigate(-1);
            }
          });
        }}
        onPasswordChange={() => {
          confirm({
            children: '비밀번호 변경 안내 메일을 발송하겠습니까?',
            confirmText: '발송',
            afterConfirm: () => {
              if (detail && detail.username) {
                sendEmail({username: detail.username});
              }
            }
          });
        }}
      />
    </FormikProvider>
  );
}

const userDetailRoute: AppRoute = {
  path: '/admin/user-management/:id',
  element: <Element/>
};

export default userDetailRoute;