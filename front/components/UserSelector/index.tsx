import {
  UserId,
  UserVO
} from 'user/domain';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import UserSelectorModal from 'components/UserSelector/Modal';
import useDialog from 'dialog/hook';
import {userApi} from 'user/api';
import Input, {InputProps} from 'layouts/Input';
import {
  Box, Fade,
  InputAdornment
} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ColorPalette} from 'assets/theme';

interface Props
  extends Omit<InputProps,
    | 'defaultValue'
    | 'startAdornment'
    | 'endAdornment'
    | 'onChange'
    | 'onClick'
    | 'value'> {
  onChange: (value: UserId | undefined) => void;
  value?: UserId;
}

export default function UserSelector({onChange, ...props}: Props) {

  const [open, setOpen] = useState<boolean>(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = useCallback(() => {
    setOpen(false);
  }, [open]);
  const {confirm} = useDialog();
  const value: UserId | undefined = props.value;
  const [user, setUser] = useState<UserVO>();
  useEffect(() => {
    if (value) {
      userApi.getOne(value)
        .then(setUser);
    } else {
      setUser(undefined);
    }
  }, [value]);

  const handleUserRemove = useCallback(() => {
    return () => {
      if (props.readOnly || props.disabled || !props.value) {
        return;
      }
      confirm({
        children: '해당 유저를 제외하겠습니까?',
        confirmText: '제외',
        afterConfirm: () => {
          onChange(undefined);
        }
      });
    };
  }, [props]);

  const handleUserAdd = useCallback(() => {
    return (e) => {
      if (props.readOnly || props.disabled) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      onOpen();
    };
  }, [props]);

  return (
    <>
      <Input
        {...props}
        readOnly
        value={user?.name ?? ''}
        onClick={handleUserRemove()}
        startAdornment={
          user && (
            <InputAdornment
              position="start"
            >
              <Box sx={{
                display: 'flex',
                fontSize: '18px',
                justifyContent: 'center',
                alignItems: 'flex-end',
                overflow: 'hidden',
                border: `1px solid ${ColorPalette._e4e9f2}`,
                color: ColorPalette._ffffff,
                backgroundColor: ColorPalette._e4e9f2,
                borderRadius: '25px',
                width: '25px',
                height: '25px',
                cursor: 'default',
              }}>
                {user.profile?.id && (
                  <Fade in={true}>
                    <img
                      alt="프로필 사진"
                      src={`/file-item/${user.profile.id}`}
                      style={{
                        objectFit: 'cover',
                        width: '25px',
                        height: '25px',
                      }}
                    />
                  </Fade>
                )}
                {!user.profile?.id && (
                  <Fade in={true}>
                    <FontAwesomeIcon icon="user"/>
                  </Fade>
                )}
              </Box>
            </InputAdornment>
          )
        }
        endAdornment={
          !(props.readOnly || props.disabled) && (
            <InputAdornment
              position="end"
              sx={{
                fontSize: '16px',
                cursor: props.disabled ? 'default' : 'pointer',
              }}>
              <FontAwesomeIcon
                icon="user"
                onClick={handleUserAdd()}
              />
            </InputAdornment>
          )
        }
      />
      <UserSelectorModal
        open={open}
        onClose={onClose}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
