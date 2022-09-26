import {
  Grid,
  TablePagination,
  TablePaginationProps
} from '@mui/material';
import Page, {
  initialPage,
  pageSizeList
} from 'type/Page';
import React from 'react';
import { PersonnelShortVO } from 'personnel/domain';

export interface FooterProps {
  page: Page<PersonnelShortVO> | undefined;
  onPageChange: TablePaginationProps['onPageChange'];
  onRowsPerPageChange: TablePaginationProps['onRowsPerPageChange'];
}

export default function Footer({
                                 page = initialPage,
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
    </Grid>
  );
};
