import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ColorPalette } from 'app/view/App/theme';
import TextField from 'components/TextField';

export default function (props: FormikLayoutProps<any>) {
  const { formik } = props;
  return (
    <Box sx={{
      marginBottom: '20px'
    }}>
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
                  name="basic.contractorAddress"
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
                  name="basic.contractorCompanyName"
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
                  name="basic.contractorCeoName"
                  label="대표자"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
