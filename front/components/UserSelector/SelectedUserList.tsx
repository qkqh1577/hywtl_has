import React from 'react';
import {UserVO} from "../../user/domain";
import TextBox from "../../layouts/Text";
import CircularProgress from "../CircularProgress";
import {Box, Tooltip} from "@mui/material";
import UserIcon from "../../layouts/UserIcon";

interface SelectedUserListProps {
  userList: UserVO[] | undefined,
  onUserClick: (UserVO) => void
}

export default function SelectedUserList(props: SelectedUserListProps) {
  const {userList, onUserClick} = props;
  return (
    <Box sx={{padding:'10px'}}>
      {!userList && (
        <TextBox variant="body2" sx={{width: '100%', height: '100%'}}>
          <CircularProgress size={30} sx={{justifyContent: 'center', alignItems: 'center'}}/>
        </TextBox>
      )}
      {userList?.length === 0 && (
        <TextBox variant="body2"
                 sx={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          선택된 유저 없음
        </TextBox>
      )}
      {userList?.map((item) => (
        <Box
          key={item.id}
          onClick={()=>{
            onUserClick(item);
          }}
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}>
          <Tooltip
            title="클릭 시 목록에서 제외"
            placement="top"
            >
            <Box sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              padding: '0 0 16px 0',
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
          </Tooltip>
          {/*<TextBox variant="body2">{item.department.name}</TextBox>*/}
        </Box>
      ))}
    </Box>
  );
}