import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import { UserNotificationId, } from 'user_notification/domain';

interface Props {
  id: UserNotificationId;
  onDelete: (id: UserNotificationId) => void;
}

export default function RemoveButton(props: Props) {
  const {
          id,
          onDelete,
        } = props;
  return (
    <Box sx={{
      marginRight: '5px'
    }}>
      <FontAwesomeIcon
        style={{
          color:  ColorPalette._9bb6ea,
          cursor: 'pointer',
        }}
        icon="trash"
        onClick={() => {
          onDelete(id);
        }}
      />
    </Box>
  );
}
