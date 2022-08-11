import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps
} from '@mui/material';
import React from 'react';
import RequiredMark from 'components/RequiredMark';

export interface TableCellProps
  extends MuiTableCellProps {
  key?: string;
  required?: boolean;
  hidden?: boolean;
}

export default function TableCell(props: TableCellProps) {

  const {
          children,
          required,
          hidden,
          ...rest
        } = props;


  if (hidden) {
    return null;
  }
  return (
    <MuiTableCell {...rest}>
      <RequiredMark required={required} text={children} />
    </MuiTableCell>
  );
}
