import React from 'react';
import {
  TableBody,
  TableContainer,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextField from 'components/TextField';

export default function Form() {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <Th>
              제목
            </Th>
            <Td>
              <TextField
                label="제목"
                name="title"
                disableLabel
                variant="outlined"
              />
            </Td>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
