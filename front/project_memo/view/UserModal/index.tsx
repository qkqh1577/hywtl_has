import React, { useState } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import {
  UserId,
  UserVO
} from 'user/domain';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { useFormik } from 'formik';
import { userApi } from 'user/api';

interface Props {
  open: boolean;
  title?: string;
  onClose: DefaultFunction;
  afterSubmit: DefaultFunction<UserId[]>;
  idList?: UserId[];
}

export default function UserSelectModal(props: Props) {

  const [idList, setIdList] = useState<UserId[]>(props.idList ?? []);
  const [userList, setUserList] = useState<UserVO[]>([]);
  const formik = useFormik({
    initialValues: {},
    onSubmit:      (values) => {
      userApi.getList();
    }
  });

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
            </Box>
            <Box sx={{
              display:  'flex',
              flexWrap: 'nowrap',
              width:    'calc(30% - 10px)',
            }}>
              <Button onClick={() => {
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

        </Box>
      }
      footer={
        <Box sx={{
          display:        'flex',
          width:          '100%',
          justifyContent: 'center',
        }}>
          <Button shape="basic1" onClick={() => {
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