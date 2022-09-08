import React from 'react';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TextField from 'components/TextField';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ColorPalette } from 'app/view/App/theme';

export default function ContractorForm() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th colSpan={2} backgroundColor={ColorPalette._e4e9f2}>
              수급자
            </Th>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <Th>
              소재
            </Th>
            <Td>
              <TextField
                name="contractor.address"
                label="소재"
                disableLabel
                variant="outlined"
              />
            </Td>
          </TableRow>
          <TableRow>
            <Th>
              "을" 상호
            </Th>
            <Td>
              <TextField
                name="contractor.companyName"
                label="회사명"
                disableLabel
                variant="outlined"
              />
            </Td>
          </TableRow>
          <TableRow>
            <Th>
              대표자
            </Th>
            <Td>
              <TextField
                name="contractor.ceoName"
                label="대표자"
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
