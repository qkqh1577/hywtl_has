import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import Button from 'layouts/Button';
import {
  UserNotificationId,
  UserNotificationListVO,
} from 'user_notification/domain';
import { ColorPalette } from 'app/view/App/theme';
import TextLink from 'components/TextLink';
import dayjs from 'dayjs';
import RemoveButton from 'user_notification/view/Button/RemoveButton';
import ReadButton from 'user_notification/view/Button/ReadButton';

interface Props {
  onDelete: (id: UserNotificationId) => void;
  onRead: (id: UserNotificationId) => void;
  onDeleteAll: () => void;
  onReadAll: () => void;
  userNotification: UserNotificationListVO | undefined;
}

export default function List(props: Props) {

  const {
          onDelete,
          userNotification,
          onRead,
          onDeleteAll,
          onReadAll
        } = props;
  const list = userNotification?.list;
  return (
    <>
      <Box
        sx={{
          display:        'flex',
          flexWrap:       'wrap',
          justifyContent: 'flex-end',
          width:          '100%',
        }}>
        <Box sx={{
          marginRight: '5px',
        }}>
          <Button onClick={() => {
            onReadAll();
          }}>
            전체 읽기
          </Button>
        </Box>
        <Box>
          <Button
            shape="basic3"
            onClick={() => {
              onDeleteAll();
            }}>
            전체 삭제
          </Button>
        </Box>
      </Box>
      {(list && list?.length === 0) && (
        <Box
          sx={{
            display:        'flex',
            flexWrap:       'wrap',
            justifyContent: 'center',
            width:          '100%',
            padding:        '10px',
            margin:         '10px 0',
          }}>
          <Typography>등록된 알람이 없습니다.</Typography>
        </Box>
      )}
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
              opacity:       `${notification.readAt && 0.5}`
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
                display: 'flex',
              }}>
                {!notification.readAt && (
                  <ReadButton
                    id={UserNotificationId(notification.id!)}
                    onRead={onRead}
                  />
                )}
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
