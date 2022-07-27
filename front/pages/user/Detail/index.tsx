import React, { useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import {
  Box,
  Paper,
} from '@mui/material';
import {
  useUser,
} from 'services/user';
import UserDetailForm from 'pages/user/Detail/Form';
import UserDetailLog from 'pages/user/Detail/Log';
import UserDetailStatus from 'pages/user/Detail/Status';

export default function UserDetail() {
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;
  const { getOne, clearOne } = useUser();

  useEffect(() => {
    if (id) {
      getOne(id);
    }
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{
          display:        'flex',
          justifyContent: 'space-between',
          width:          '100%',
          height:         '50px',
          mb:             '40px',
        }}>
          <h2>계정 상세 정보</h2>
        </Box>
        <Box sx={{
          display: 'flex',
          width:   '100%',
          mb:      '40px',
        }}>
          <UserDetailStatus />
        </Box>
        <Box sx={{
          display: 'flex',
          width:   '100%',
          mb:      '40px',
        }}>
          <UserDetailForm />
        </Box>
      </Paper>
      <UserDetailLog />
    </>
  );
};
