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
import UserIcon from "../../layouts/UserIcon";
import TextBox from "../../layouts/Text";

interface Props
  extends Omit<InputProps,
    | 'defaultValue'
    | 'startAdornment'
    | 'endAdornment'
    | 'onChange'
    | 'onClick'
    | 'value'> {
  onChange: (value: UserId | UserId[] | undefined) => void;
  value?: UserId | UserId[];
  multi?: boolean;
  readOnly?: boolean;
  viewCount?: number;
}

export default function UserSelector({onChange, multi, readOnly, viewCount, ...props}: Props) {
  const {confirm} = useDialog();
  const value: UserId | UserId[] | undefined = props.value;
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserVO>();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  useEffect(() => {
    if (value && !Array.isArray(value)  ) {
      userApi.getOne(value).then(setUser);
    } else {
      setUser(undefined);
    }
  }, [value]);

  const handleUserRemove = useCallback(() => {
    return () => {
      if (readOnly || props.disabled || !props.value) {
        return;
      }
      confirm({
        title: '유저 제외',
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
      if (readOnly || props.disabled) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      onOpen();
    };
  }, [props]);

  return (
    <>
    {
      multi && (
        <Box sx={{
          display:        'flex',
          width:          '100%',
          flexWrap:       'nowrap',
          justifyContent: 'flex-start',
          height:         '40px',
        }}>
          {value && Array.isArray(value) && value.filter((item,
                         i
          ) => !viewCount || viewCount > i)
            .map((item) => (
              <UserIcon
                key={item}
                user={item}
                sx={{
                  marginRight: '10px',
                  cursor:      readOnly ? 'default' : 'pointer'
                }}
                onClick={() => {
                  if (readOnly) {
                    return;
                  }
                  confirm({
                    children:     '해당 유저를 제외하겠습니까?',
                    confirmText:  '제외',
                    afterConfirm: () => {
                      const idList = value.filter(id => id !== item);
                      onChange(idList.length === 0 ? undefined : idList);
                    }
                  });
                }}
              />
            ))}
          {viewCount && Array.isArray(value) && value.length > viewCount && (
            <TextBox variant="body10">외 {value.length - viewCount}명</TextBox>
          )}
          {!readOnly && (
            <UserIcon
              user="plus"
              onClick={onOpen}
            />
          )}
          <UserSelectorModal
            open={open}
            onClose={onClose}
            value={value}
            departmentId={user?.department.id}
            onChange={onChange}
            multi={multi}
          />
        </Box>
      )
    }
    {
      !multi && (
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
              !(readOnly || props.disabled) && (
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
            departmentId={user?.department.id}
            onChange={onChange}
            multi={multi}
          />
        </>
      )
    }
    </>
  );
}
