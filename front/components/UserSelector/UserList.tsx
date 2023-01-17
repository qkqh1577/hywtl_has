import React from 'react';
import TextBox from "../../layouts/Text";
import {Box, Radio} from "@mui/material";
import UserIcon from "../../layouts/UserIcon";
import {UserId, UserVO} from "../../user/domain";
import CircularProgress from 'components/CircularProgress';

interface UserListProps {
  userList: UserVO[] | undefined,
  selectedUser: UserId | undefined,
  onChange: (UserId) => void
}

export default function UserList(props: UserListProps) {
  const {userList, selectedUser, onChange} = props;

  return (
    <>
      {!userList && (
        <TextBox variant="body2" sx={{width: '100%', height: '100%'}}>
          <CircularProgress size={30} sx={{justifyContent: 'center', alignItems: 'center'}}/>
        </TextBox>
      )}
      {userList?.length === 0 && (
        <TextBox variant="body2"
                 sx={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          검색 결과가 없습니다.
        </TextBox>
      )}
      {userList?.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}>
          <Radio
            checked={selectedUser === item.id}
            onChange={() => {
              if (selectedUser !== item.id) {
                onChange(item.id);
              }
            }}
          />
          <Box sx={{
            display: 'flex',
            flexWrap: 'nowrap',
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
    </>
  );
}