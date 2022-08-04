import React from 'react';
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead as TableHeader,
  TableRow,
  Typography
} from '@mui/material';
import {
  TableHead,
  RequiredMark
} from 'components';
import Title, { TitleProps } from 'components/Title';

export type TableCellProperty<T> = {
  label: string;
  renderCell: (item: T,
               index: number
  ) => React.ReactNode | React.ReactNode[] | string | number;
  key?: string | number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width?: number;
  style?: object;
  cellStyle?: ((item: T,
                index: number
  ) => object) | object;
  disableShow?: boolean;
  required?: boolean;
  colSpan?: number;
}

export interface TableProps<T>
  extends TitleProps {
  disableTitle?: boolean;
  columns?: TableCellProperty<T>[];
  list?: T[];
  onRowClick?: (item: T) => void;
  hover?: boolean;
  sx?: object;
  emptyText?: string;
  footer?: string | React.ReactNode;
  head?: React.ReactNode,
  body?: React.ReactNode,
}

const Table = <T, >({
                      disableTitle,
                      columns,
                      list,
                      onRowClick,
                      hover,
                      sx,
                      emptyText = '항목이 없습니다.',
                      title,
                      titleRightComponent,
                      footer,
                      head,
                      body,
                    }: TableProps<T>) => {
  const id: string = `tableTitle_${new Date().getTime()}_${`${Math.round(Math.random() * 100)}`.padStart(3, '0')}`;
  return (
    <Box sx={{
      width: '100%',
    }}>
      {!disableTitle && (<Title title={title} titleVariant="h6" titleRightComponent={titleRightComponent} />)}
      <Box sx={{
        display:   'flex',
        flexWrap:  'unwrap',
        overflowX: 'auto'
      }}>
        <TableContainer sx={sx ? {
          width: '100%',
          ...sx,
        } : {
          width: '100%',
        }}>
          <MuiTable stickyHeader aria-label="sticky table" aria-labelledby={id}>
            {!columns && head}
            {!columns && body}
            {columns && (
              <TableHeader>
                <TableRow>
                  {columns
                  .filter(column => !column.disableShow)
                  .map(({
                          key,
                          label,
                          width = 100,
                          style: prevStyle,
                          required,
                          colSpan
                        },
                        i
                  ) => {
                    const style = {
                      ...prevStyle,
                      minWidth: width,
                    };
                    return (
                      <TableHead
                        key={key ?? i}
                        style={style}
                        colSpan={colSpan}
                      >
                        <RequiredMark text={label} required={required} />
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
            )}
            {columns && (
              <TableBody>
                {(!list || list.length === 0) && (
                  <TableRow role="list" tabIndex={-1}>
                    <TableCell
                      colSpan={columns.filter(column => !column.disableShow).length}
                      sx={{
                        textAlign: 'center'
                      }}>
                      <Typography>
                        {emptyText}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {list && list.length > 0 && list.map((item,
                                                      i
                ) => (
                  <TableRow
                    key={i}
                    role="list"
                    tabIndex={-1}
                    hover={hover}
                    onClick={() => {
                      if (onRowClick) {
                        onRowClick(item);
                      }
                    }}>
                    {columns.filter(column => !column.disableShow)
                            .map((column,
                                  j
                            ) => {
                              const { cellStyle, align, renderCell } = column;
                              const style: object | undefined = cellStyle ?
                                (typeof cellStyle === 'function' ? cellStyle(item, i) : cellStyle)
                                : undefined;
                              return (
                                <TableCell key={j} align={align} style={style}>
                                  {renderCell(item, i)}
                                </TableCell>
                              );
                            })}
                  </TableRow>
                ))}
              </TableBody>
            )}
            {footer && (
              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={columns?.filter(column => !column.disableShow).length}
                    sx={{
                      textAlign: 'center'
                    }}>
                    {typeof footer === 'string' && (<Typography>{footer}</Typography>)}
                    {typeof footer !== 'string' && footer}
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </MuiTable>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Table;
