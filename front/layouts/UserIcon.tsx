import React, {
  useEffect,
  useState
} from 'react';
import {
  Box,
  BoxProps,
  Tooltip
} from '@mui/material';
import { ColorPalette } from 'assets/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  UserId,
  UserVO
} from 'user/domain';
import { userApi } from 'user/api';

interface Props {
  user: UserId | UserVO | string;
  onClick?: (userId?: UserId) => void;
  sx?: BoxProps['sx'];
}

export default function UserIcon(props: Props) {

  const isPlus = props.user === 'plus';

  const [user, setUser] = useState<UserVO>();

  useEffect(() => {
    if (typeof props.user === 'string') {
      return;
    }
    if (typeof props.user === 'number') {
      userApi.getOne(props.user)
             .then(setUser);
    }
    else {
      setUser(props.user);
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
        ...props.sx,
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
      {typeof props.user === 'string' && !isPlus && (
        <span>{props.user}</span>
      )}
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