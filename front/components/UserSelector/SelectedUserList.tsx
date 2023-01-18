import React from 'react';
import {UserVO} from "../../user/domain";
import TextBox from "../../layouts/Text";
import CircularProgress from "../CircularProgress";
import {Badge, Box} from "@mui/material";
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
            cursor: 'pointer'
          }}>
            <Box sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              padding: '0 0 16px 0',
            }}>
              <Badge
                anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                badgeContent="X"
                color="error"
                overlap="rectangular"
                sx={{ "& .MuiBadge-badge": { fontSize: '0.6rem', height: '0.7rem', minWidth: '0.7rem', padding:'0.3rem' } }}
              >
                <UserIcon
                  user={item}
                  sx={{
                    marginRight: '10px'
                  }}
                />
              </Badge>
              <TextBox
                variant="body2"
                sx={{
                  marginRight: '10px'
                }}>
                {item.name}
              </TextBox>
            </Box>

        </Box>
      ))}
    </Box>
  );
}