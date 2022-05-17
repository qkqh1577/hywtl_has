import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

export type TableCellProperty<T> = {
  label: string;
  renderCell: (item: T, index: number) => React.ReactNode | string | number | null;
  key?: string | number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width?: number;
  style?: object;
  cellStyle?: ((item: T, index: number) => object) | object;
}
export type TableProps<T> = {
  columns: TableCellProperty<T>[];
  list?: T[];
  onRowClick?: (item: T) => void;
  hover?: boolean;
  sx?: object;
};
const Table = <T, >({
  columns,
  list,
  onRowClick,
  hover,
  sx
}: TableProps<T>) => {

  return (
    <TableContainer sx={sx ?? {
      width: '100%'
    }}>
      <MuiTable stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(({
              key,
              label,
              width = 100,
              style: prevStyle,
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
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((item, i) => (
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
              {columns.map((column, j) => {
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
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
