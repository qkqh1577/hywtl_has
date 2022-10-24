import { DefaultFunction } from 'type/Function';
import React, {
  useEffect,
  useState
} from 'react';
import {
  UserId,
  UserVO
} from 'user/domain';
import { userApi } from 'user/api';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
  Radio
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import TextBox from 'layouts/Text';
import UserIcon from 'layouts/UserIcon';

interface Props {
  open: boolean;
  title?: string;
  value?: UserId;
  onClose: DefaultFunction;
  onChange: (value: UserId | undefined) => void;
}

export default function UserSelectorModal(props: Props) {

  const [keyword, setKeyword] = useState<string>();
  const [value, setValue] = useState<UserId | undefined>(props.value);
  const [userList, setUserList] = useState<UserVO[]>([]);

  const onSubmit = () => {
    userApi.getList(keyword)
           .then(setUserList);
  };

  useEffect(() => {
    if (!keyword) {
      userApi.getList()
             .then(setUserList);
    }
  }, [keyword]);

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
              <DataFieldWithLabel label="검색어">
                <Input
                  variant="standard"
                  placeholder="입력"
                  value={keyword ?? ''}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (value !== keyword) {
                      setKeyword(value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              display:  'flex',
              flexWrap: 'nowrap',
              width:    'calc(30% - 10px)',
            }}>
              <Button sx={{ marginRight: '10px' }} onClick={onSubmit}>
                검색
              </Button>
              <Button
                disabled={!keyword}
                shape="basic2"
                onClick={() => {
                  if (keyword) {
                    setKeyword(undefined);
                    onSubmit();
                  }
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
            {userList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display:    'flex',
                  width:      '100%',
                  alignItems: 'center',
                  flexWrap:   'nowrap'
                }}>
                <Radio
                  checked={value === item.id}
                  onChange={() => {
                    if (value !== item.id) {
                      setValue(item.id);
                    }
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
            sx={{
              marginRight: '10px'
            }}
            onClick={() => {
              props.onClose();
              props.onChange(value);
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