import React, { useCallback } from 'react';
import TextBox from "../../layouts/Text";
import {Box, Checkbox, Radio} from "@mui/material";
import UserIcon from "../../layouts/UserIcon";
import {UserVO} from "../../user/domain";
import CircularProgress from 'components/CircularProgress';

interface UserListProps {
  userList: UserVO[] | undefined,
  multi: boolean | undefined,
  selectedUserList: UserVO[] | undefined,
  onChange: (UserVO, boolean) => void
}

export default function UserList(props: UserListProps) {
  const {multi, userList, selectedUserList, onChange} = props;

  const isSelectedUser = useCallback((user: UserVO)=>{
    if (selectedUserList) {
      return selectedUserList.filter((value)=>value.id===user.id).length > 0 ;
    }
    return false;
  },[selectedUserList]);

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
          { multi && (
            <Checkbox
              defaultValue={item.id}
              checked={isSelectedUser(item)}
              onChange={() => {
                onChange(item, isSelectedUser(item));
            }}/>
          )}
          { !multi && (
            <Radio
              defaultValue={item.id}
              checked={isSelectedUser(item)}
              onChange={() => {
                onChange(item, isSelectedUser(item));
              }}/>
          )}
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