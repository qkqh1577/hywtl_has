import {
  Box,
  Grid,
  TablePagination,
  TablePaginationProps
} from '@mui/material';
import ToAddPageButton from 'user/view/Page/Footer/ToAddPageButton';
import React from 'react';
import Page, { pageSizeList } from 'services/common/domain/Page';
import { UserVO } from 'user/domain/user';

export interface FooterProps {
  page: Page<UserVO>;
  onPageChange: TablePaginationProps['onPageChange'];
  onRowsPerPageChange: TablePaginationProps['onRowsPerPageChange'];
}

export default function ({
                           page,
                           onPageChange,
                           onRowsPerPageChange
                         }: FooterProps) {
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
          <ToAddPageButton />
        </Box>
      </Grid>
    </Grid>
  );
}