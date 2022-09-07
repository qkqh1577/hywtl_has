import React from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import TextField from 'components/TextField';
import { Table } from 'layouts/Table';
import { ColorPalette } from 'app/view/App/theme';

const typographyStyle = {
  fontWeight: 'bold',
  fontSize:   '14px',
  lineHeight: '22px',
  color:      `${ColorPalette._252627}`,
};
export default function ContractorForm() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <Typography
                sx={typographyStyle}
              >
                수급자
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell variant="head">
              <Typography
                sx={typographyStyle}
              >
                소재
              </Typography>
            </TableCell>
            <TableCell>
              <TextField name="contractor.address" label="소재" disableLabel />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <Typography
                sx={typographyStyle}
              >
                "을" 상호
              </Typography>
            </TableCell>
            <TableCell>
              <TextField name="contractor.companyName" label="회사명" disableLabel />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <Typography
                sx={typographyStyle}
              >
                대표자
              </Typography>
            </TableCell>
            <TableCell>
              <TextField name="contractor.ceoName" label="대표자" disableLabel />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
