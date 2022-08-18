import React from 'react';
import Page, {
  initialPage,
  pageSizeList
} from 'type/Page';
import {
  Box,
  Button,
  Grid,
  TablePagination,
  TablePaginationProps
} from '@mui/material';
import { BusinessShort } from 'business/domain';
import { useNavigate } from 'react-router-dom';

export interface FooterProps {
  page: Page<BusinessShort> | undefined;
  onPageChange: TablePaginationProps['onPageChange'];
  onRowsPerPageChange: TablePaginationProps['onRowsPerPageChange'];
}


function AddButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/business/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}

export default function ({ page = initialPage,
                           onPageChange,
                           onRowsPerPageChange}: FooterProps) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
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
};
