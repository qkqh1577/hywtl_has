import React, {
  useEffect,
  useState
} from 'react';
import {
  Box,
  Tooltip
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  UserId,
  UserVO
} from 'user/domain';
import { userApi } from 'user/api';

interface Props {
  userId: UserId | 'plus';
  onClick?: (userId?: UserId) => void;
}

export default function UserIcon(props: Props) {

  const isPlus = props.userId === 'plus';

  const [user, setUser] = useState<UserVO>();

  useEffect(() => {
    if (typeof props.userId === 'number') {
      userApi.getOne(props.userId)
             .then(setUser);
    }
  }, []);

  return (
    <Box
      onClick={() => {
        if (props.onClick) {
          props.onClick(user?.id);
        }
      }}
      sx={{
        display:         'flex',
        width:           '25px',
        height:          '25px',
        justifyContent:  'center',
        alignItems:      isPlus ? 'center' : 'flex-end',
        fontSize:        '18px',
        borderRadius:    '25px',
        backgroundColor: ColorPalette._e4e9f2,
        color:           isPlus ? ColorPalette._386dd6 : ColorPalette._ffffff,
        border:          `1px solid ${ColorPalette._e4e9f2}`,
        overflow:        'hidden',
        cursor:          props.onClick ? 'pointer' : 'default',
      }}>
      {isPlus && (
        <FontAwesomeIcon icon="plus" />
      )}
      {user && (
        <Tooltip
          title={user.name}
          placement="top"
        >
          {user.profile?.id
            ? (
              <img
                alt="프로필 사진"
                src={`/file-items/${user.profile.id}`}
                style={{
                  objectFit: 'cover',
                  width:     '25px',
                  height:    '25px',
                }}
              />
            )
            : (<FontAwesomeIcon icon="user" />)}
        </Tooltip>
      )}
    </Box>
  );
}