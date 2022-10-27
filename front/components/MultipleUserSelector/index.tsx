import { UserId } from 'user/domain';
import useDialog from 'dialog/hook';
import { Box } from '@mui/material';
import UserIcon from 'layouts/UserIcon';
import TextBox from 'layouts/Text';
import React, { useState } from 'react';
import MultiUserSelectorModal from 'components/MultipleUserSelector/Modal';

interface Props {
  readOnly?: boolean;
  viewCount?: number;
  onChange: (value: UserId[] | undefined) => void;
  value?: UserId[];
  title?: string;
}

export default function MultiUserSelector(props: Props) {
  const { confirm } = useDialog();
  const [open, setOpen] = useState<boolean>(false);
  const onOpen = () => { setOpen(true);};
  const onClose = () => { setOpen(false);};
  const value: UserId[] = Array.isArray(props.value) ? props.value : (typeof props.value === 'undefined' ? [] : [props.value]);
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'nowrap',
      justifyContent: 'flex-start',
      height:         '40px',
    }}>
      {value.filter((item,
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
                      const idList = value.filter(id => id !== item);
                      props.onChange(idList.length === 0 ? undefined : idList);
                    }
                  });
                }}
              />
            ))}
      {props.viewCount && value.length > props.viewCount && (
        <TextBox variant="body10">외 {value.length - props.viewCount}명</TextBox>
      )}
      {!props.readOnly && (
        <UserIcon
          user="plus"
          onClick={onOpen}
        />
      )}
      <MultiUserSelectorModal
        {...props}
        open={open}
        onClose={onClose}
      />
    </Box>
  );
}