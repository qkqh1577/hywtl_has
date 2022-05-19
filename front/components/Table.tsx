import React from 'react';
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow, Toolbar, Typography
} from '@mui/material';

export type TableCellProperty<T> = {
  label: string;
  renderCell: (item: T, index: number) => React.ReactNode | string | number | null;
  key?: string | number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width?: number;
  style?: object;
  cellStyle?: ((item: T, index: number) => object) | object;
  disableShow?: boolean;
  required?: boolean;
}
export type TableProps<T> = {
  columns: TableCellProperty<T>[];
  list?: T[];
  onRowClick?: (item: T) => void;
  hover?: boolean;
  sx?: object;
  emptyText?: string;
  title?: string | React.ReactNode;
  footer?: string | React.ReactNode;
};
const Table = <T, >({
  columns,
  list,
  onRowClick,
  hover,
  sx,
  emptyText = '항목이 없습니다.',
  title,
  footer,
}: TableProps<T>) => {
  const id: string = `tableTitle_${new Date().getTime()}_${`${Math.round(Math.random() * 100)}`.padStart(3, '0')}`;
  return (
    <Box sx={{
      width: '100%',
    }}>
      {title && (
        <Toolbar id={id}>
          {typeof title === 'string' && (<Typography
              variant="h6"
            >
              {title}
            </Typography>
          )}
          {typeof title !== 'string' && { title }}
        </Toolbar>
      )}
      <TableContainer sx={sx ? {
        width: '100%',
        ...sx,
      } : {
        width: '100%'
      }}>
        <MuiTable
          aria-label="sticky table"
          stickyHeader
          aria-labelledby={id}
        >
          <TableHead>
            <TableRow>
              {columns
              .filter(column => !column.disableShow)
              .map(({
                key,
                label,
                width = 100,
                style: prevStyle,
                required
              }, i) => {
                const style = {
                  ...prevStyle,
                  minWidth: width,
                };
                return (
                  <TableCell
                    key={key ?? i}
                    style={style}
                    align="center"
                  >
                    {label}
                    {required && (
                      <Typography
                        variant="caption"
                        sx={{
                          marginLeft: '4px',
                          fontSize: '0.7rem'
                        }}
                      >
                        *
                      </Typography>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!list || list.length === 0) && (
              <TableRow
                role="list"
                tabIndex={-1}
              >
                <TableCell
                  colSpan={columns.filter(column => !column.disableShow).length}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <Typography>{emptyText}</Typography>
                </TableCell>
              </TableRow>
            )}
            {list && list.length > 0 && list.map((item, i) => (
              <TableRow
                key={i}
                role="list"
                tabIndex={-1}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(item);
                  }
                }}
                hover={hover === true}
              >
                {columns
                .filter(column => !column.disableShow)
                .map((column, j) => {
                  const { cellStyle, align, renderCell } = column;
                  const style: object | undefined = cellStyle ?
                    (typeof cellStyle === 'function' ? cellStyle(item, i) : cellStyle)
                    : undefined;
                  return (
                    <TableCell
                      key={j}
                      align={align}
                      style={style}
                    >
                      {renderCell(item, i)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
          {footer && (
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={columns.filter(column => !column.disableShow).length}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  {typeof footer === 'string' && (<Typography>{footer}</Typography>)}
                  {typeof footer !== 'string' && footer}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

export default Table;
