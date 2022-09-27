import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import Button from 'layouts/Button';
import {
  UserNotificationId,
  UserNotificationVO
} from 'user_notification/domain';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextLink from 'components/TextLink';
import dayjs from 'dayjs';

interface Props {
  list: UserNotificationVO[] | undefined;
  onDelete: (id: UserNotificationId) => void;
  onRead: (id: UserNotificationId) => void;
}

export default function List(props: Props) {
  const {
          list,
          onDelete,
          onRead,
        } = props;
  return (
    <>
      <Box
        sx={{
          display:        'flex',
          flexWrap:       'wrap',
          justifyContent: 'flex-end',
          width:          '100%',
        }}>
        <Button onClick={() => {
          console.log('전체 삭제');
        }}>
          전체 삭제
        </Button>
      </Box>
      {Array.isArray(list) && list.map((notification) => {
        return (
          <Box
            key={notification.id}
            sx={{
              display:       'flex',
              flexWrap:      'wrap',
              flexDirection: 'column',
              width:         '100%',
              border:        `1px solid ${ColorPalette._e4e9f2}`,
              padding:       '10px',
              margin:        '10px 0',
            }}>
            <Box
              sx={{
                display:        'flex',
                flexWrap:       'wrap',
                width:          '100%',
                justifyContent: 'space-between'
              }}>
              <Box>
                <Typography>{dayjs(notification.createdAt)
                .format('YYYY-MM-DD hh:mm')}</Typography>
              </Box>
              <Box sx={{
                display:  'flex',
                flexWrap: 'wrap',
              }}>
                <ReadButton
                  id={UserNotificationId(notification.id!)}
                  onRead={onRead}
                />
                <RemoveButton
                  id={UserNotificationId(notification.id!)}
                  onDelete={onDelete}
                />
                <Box>
                  <Typography>From : {notification.sender?.name}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{
              border:  `1px solid ${ColorPalette._e4e9f2}`,
              padding: '10px',
              margin:  '10px 0',
            }}>
              <TextLink
                children={`[${notification.projectCode || '가등록'}] ${notification.projectName}`}
                onClick={notification.forwardUrl}
              />
            </Box>
            <Box>
              {notification.type}
            </Box>
          </Box>
        );
      })}
    </>
  );
}

interface DeleteButtonProps {
  id: UserNotificationId;
  onDelete: (id: UserNotificationId) => void;
}

function RemoveButton(props: DeleteButtonProps) {
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
          cursor: 'pointer'
        }}
        icon="trash"
        onClick={() => {
          onDelete(id);
        }}
      />
    </Box>
  );
}

interface ReadButtonProps {
  id: UserNotificationId;
  onRead: (id: UserNotificationId) => void;
}

function ReadButton(props: ReadButtonProps) {
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
          cursor: 'pointer'
        }}
        icon={['fab', 'readme']}
        onClick={() => {
          onRead(id);
        }}
      />
    </Box>
  );
}

