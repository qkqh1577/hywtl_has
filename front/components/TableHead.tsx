import React from 'react';
import { TableCell } from '@mui/material';
import { TableCellProps } from '@mui/material/TableCell/TableCell';

const TableHead = (props: TableCellProps) => <TableCell align="center" variant="head"  {...props} />;

export default TableHead;
