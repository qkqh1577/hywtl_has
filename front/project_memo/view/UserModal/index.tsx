import React, {
  useEffect,
  useState
} from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import {
  UserId,
  UserVO
} from 'user/domain';
import {
  Box,
  Checkbox,
} from '@mui/material';
import Button from 'layouts/Button';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { userApi } from 'user/api';
import TextField from 'components/TextField';
import UserIcon from 'layouts/UserIcon';
import TextBox from 'layouts/Text';

interface Props {
  open: boolean;
  title?: string;
  onClose: DefaultFunction;
  afterSubmit: DefaultFunction<UserId[]>;
  idList?: UserId[];
}

interface FormikProps {
  keyword?: string;
}

export default function UserSelectModal(props: Props) {

  const [idList, setIdList] = useState<UserId[]>(props.idList ?? []);
  const [userList, setUserList] = useState<UserVO[]>([]);
  const formik = useFormik<FormikProps>({
    initialValues: {},
    onSubmit:      (values,
                    helpers
                   ) => {
      userApi.getList(values?.keyword)
             .then(setUserList)
             .finally(() => {
               helpers.setSubmitting(false);
             });
    }
  });
  useEffect(() => {
    if (props.open) {
      userApi.getList()
             .then(setUserList);
    }
  }, [props.open]);

  return (
    <ModalLayout
      width="40vw"
      open={props.open}
      title={props.title ?? '유저 선택'}
      onClose={props.onClose}
      children={
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'wrap',
          height:   '100%',
        }}>
          <Box sx={{
            display:  'flex',
            width:    '100%',
            flexWrap: 'nowrap',
            padding:  '10px',
          }}>
            <Box sx={{
              display:     'flex',
              flexWrap:    'nowrap',
              width:       '70%',
              marginRight: '10px',
            }}>
              <FormikProvider value={formik}>
                <TextField
                  label="검색어"
                  name="keyword"
                />
              </FormikProvider>
            </Box>
            <Box sx={{
              display:  'flex',
              flexWrap: 'nowrap',
              width:    'calc(30% - 10px)',
            }}>
              <Button sx={{ marginRight: '10px' }} onClick={() => {
                formik.handleSubmit();
              }}>
                검색
              </Button>
              <Button shape="basic2" onClick={() => {
                formik.setValues({});
                formik.handleSubmit();
              }}>
                초기화
              </Button>
            </Box>
          </Box>
          <Box sx={{
            display:  'flex',
            width:    '100%',
            flexWrap: 'wrap',
          }}>
            {userList.length === 0 && (
              <TextBox variant="body2">
                검색 결과가 없습니다.
              </TextBox>
            )}
            {userList.length !== 0 && (
              <Box sx={{
                display:    'flex',
                width:      '100%',
                alignItems: 'center',
                flexWrap:   'nowrap',
              }}>
                <Checkbox
                  name="idList"
                  value="all"
                  checked={idList.length === userList.length}
                  onChange={() => {
                    const checked = idList.length === userList.length;
                    setIdList(checked ? [] : userList.map(item => item.id!));
                  }}
                />
                <TextBox variant="body2">전체 선택</TextBox>
              </Box>
            )}
            {userList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display:    'flex',
                  width:      '100%',
                  alignItems: 'center',
                  flexWrap:   'nowrap'
                }}>
                <Checkbox
                  name="idList"
                  value={item.id}
                  checked={idList.includes(item.id!)}
                  onChange={() => {
                    const userId = item.id!;
                    const checked = idList.includes(userId);
                    setIdList(checked ? idList.filter(id => id !== userId) : [...idList, userId]);
                  }}
                />
                <Box sx={{
                  display:    'flex',
                  flexWrap:   'nowrap',
                  alignItems: 'center',
                }}>
                  <UserIcon
                    user={item}
                    sx={{
                      marginRight: '10px'
                    }}
                  />
                  <TextBox
                    variant="body2"
                    sx={{
                      marginRight: '10px'
                    }}>
                    {item.name}
                  </TextBox>
                </Box>
                <TextBox variant="body2">{item.department.name}</TextBox>
              </Box>
            ))}
          </Box>
        </Box>
      }
      footer={
        <Box sx={{
          display:        'flex',
          width:          '100%',
          justifyContent: 'center',
        }}>
          <Button
            shape="basic1"
            sx={{
              marginRight: '10px'
            }}
            onClick={() => {
              props.onClose();
              props.afterSubmit(idList);
            }}>
            저장
          </Button>
          <Button shape="basic2" onClick={props.onClose}>
            취소
          </Button>
        </Box>
      }
    />
  );
}