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
import { userApi } from 'user/api';
import UserIcon from 'layouts/UserIcon';
import TextBox from 'layouts/Text';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'components/DataFieldLabel';
import useDialog from 'components/Dialog';

interface Props {
  viewCount?: number;
  afterSubmit: (list: UserId[] | undefined) => void;
  list: UserId[] | undefined;
  readOnly?: boolean;
}

interface ModalProps
  extends Props {
  open: boolean;
  title?: string;
  onClose: DefaultFunction;
}

export function AttendanceSelectModal(props: ModalProps) {

  const [keyword, setKeyword] = useState<string>();
  const [idList, setIdList] = useState<UserId[]>(props.list ?? []);
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

export default function AttendanceListField(props: Props) {

  const { confirm } = useDialog();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'nowrap',
      justifyContent: 'flex-start',
      height:         '40px',
    }}>
      {props.list?.filter((item,
                           i
      ) => !props.viewCount || props.viewCount > i)
            .map((item) => (
              <UserIcon
                key={item}
                user={item}
                sx={{
                  marginRight: '10px',
                  cursor:      props.readOnly ? 'default' : 'pointer'
                }}
                onClick={() => {
                  if (props.readOnly) {
                    return;
                  }
                  confirm({
                    children:     '해당 유저를 제외하겠습니까?',
                    confirmText:  '제외',
                    afterConfirm: () => {
                      const idList = props.list!.filter(id => id !== item);
                      props.afterSubmit(idList.length === 0 ? undefined : idList);
                    }
                  });
                }}
              />
            ))}
      {props.list && props.viewCount && props.list.length > props.viewCount && (
        <TextBox variant="body10">외 {props.list.length - props.viewCount}명</TextBox>
      )}
      {!props.readOnly && (
        <UserIcon
          user="plus"
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
      <AttendanceSelectModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        list={props.list}
        afterSubmit={props.afterSubmit}
      />
    </Box>
  );
}