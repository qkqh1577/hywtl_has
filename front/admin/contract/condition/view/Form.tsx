import React from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Table } from 'layouts/Table';
import TextField from 'components/TextField';

export default function Form() {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell variant="head">
              제목
            </TableCell>
            <TableCell>
              <TextField
                label="제목"
                name="title"
                disableLabel
                variant="outlined"
              />

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
