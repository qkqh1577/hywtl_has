import React from 'react';
import { Box, } from '@mui/material';
import Button from 'layouts/Button';
import {
  UserNotificationId,
  UserNotificationVO,
} from 'user_notification/domain';
import { ColorPalette } from 'assets/theme';
import TextLink from 'layouts/TextLink';
import RemoveButton from 'user_notification/view/Button/RemoveButton';
import ReadButton from 'user_notification/view/Button/ReadButton';
import DateFormat from 'layouts/DateFormat';
import { useNavigate } from 'react-router-dom';
import TextBox from 'layouts/Text';

interface Props {
  onDelete: (id: UserNotificationId) => void;
  onRead: (id: UserNotificationId) => void;
  onDeleteAll: () => void;
  onReadAll: () => void;
  onClose: () => void;
  list: UserNotificationVO[] | undefined;
}

export default function List(props: Props) {
  const navigate = useNavigate();
  const {
          onDelete,
          list,
          onRead,
          onDeleteAll,
          onReadAll,
          onClose
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
      {list && list.length === 0 && (
        <Box
          sx={{
            display:        'flex',
            flexWrap:       'wrap',
            justifyContent: 'center',
            width:          '100%',
            padding:        '10px',
            margin:         '10px 0',
          }}>
          <TextBox variant="heading3">
            등록된 알림이 없습니다.
          </TextBox>
        </Box>
      )}
      {list && list.map((notification) => {
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
                <DateFormat date={notification.createdAt} format="YYYY-MM-DD HH:mm" />
              </Box>
              <Box sx={{
                display: 'flex',
              }}>
                {!notification.readAt && (
                  <ReadButton
                    onClick={() => {
                      onRead(notification.id);
                    }}
                  />
                )}
                <RemoveButton
                  onClick={() => {
                    onDelete(notification.id);
                  }}
                />
                <Box>
                  <TextBox variant="body1">From : {notification.sender.name}</TextBox>
                </Box>
              </Box>
            </Box>
            <Box sx={{
              border:  `1px solid ${ColorPalette._e4e9f2}`,
              padding: '10px',
              margin:  '10px 0',
            }}>
              {notification.forwardUrl && (
                <TextLink
                  children={`[${notification.projectCode || '가등록'}] ${notification.projectName}`}
                  onClick={() => {
                    navigate(notification.forwardUrl!);
                    onClose();
                  }}
                />
              )}
              {!notification.forwardUrl && (
                <TextBox variant="body2">
                  {`[${notification.projectCode || '가등록'}] ${notification.projectName}`}
                </TextBox>
              )}
            </Box>
            <Box>
              <TextBox variant="body2">
                {notification.type}
              </TextBox>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
