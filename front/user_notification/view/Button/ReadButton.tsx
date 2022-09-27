import { UserNotificationId } from 'user_notification/domain';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import React from 'react';

interface Props {
  id: UserNotificationId;
  onRead: (id: UserNotificationId) => void;
}

export default function ReadButton(props: Props) {
  const {
          id,
          onRead,
        } = props;
  return (
    <Box sx={{
      marginRight: '5px'
    }}>
      <FontAwesomeIcon
        style={{
          color:  ColorPalette._252627,
          cursor: 'pointer',
        }}
        icon={['fab', 'readme']}
        onClick={() => {
          onRead(id);
        }}
      />
    </Box>
  );
}
