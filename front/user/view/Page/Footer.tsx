import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Box,
  Button,
  Grid,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';
import Page, {
  initialPage,
  pageSizeList
} from 'type/Page';
import { UserVO } from 'user/domain';

function AddButton() {

  const navigate = useNavigate();
  const onClick = () => {
    navigate('/user/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}

export interface UserPageFooterProps
  extends Pick<TablePaginationProps, | 'onPageChange' | 'onRowsPerPageChange'> {
  page: Page<UserVO> | undefined;
}

export default function ({
                           page = initialPage,
                           onPageChange,
                           onRowsPerPageChange,
                         }: UserPageFooterProps) {
  return (
    <Grid container spacing={2}>
      <Grid item
        sm={8}
        sx={{
          display:        'flex',
          justifyContent: 'flex-start',
        }}>
        <TablePagination
          component="div"
          rowsPerPageOptions={pageSizeList}
          count={page.totalElements}
          rowsPerPage={page.size}
          page={page.number}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Grid>
      <Grid item sm={4}>
        <Box sx={{
          display:        'flex',
          justifyContent: 'flex-end',
          width:          '100%',
          mt:             '40px',
        }}>
          <AddButton />
        </Box>
      </Grid>
    </Grid>
  );
}