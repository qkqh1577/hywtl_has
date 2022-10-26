import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import Input from 'layouts/Input';

export default function () {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const basic = formik.values.basic ?? {};

  return (
    <Table variant="cross">
      <TableHead>
        <TableRow>
          <Th colSpan={2}>
            발주자
          </Th>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Th sx={{ width: '140px' }}>소재</Th>
          <Td>
            <Input
              readOnly={!edit}
              variant="outlined"
              key={basic.ordererAddress}
              defaultValue={basic.ordererAddress ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.ordererAddress !== value) {
                  formik.setFieldValue('basic.ordererAddress', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Th sx={{ width: '140px' }}>"갑" 상호</Th>
          <Td>
            <Input
              readOnly={!edit}
              variant="outlined"
              key={basic.ordererCompanyName}
              defaultValue={basic.ordererCompanyName ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.ordererCompanyName !== value) {
                  formik.setFieldValue('basic.ordererCompanyName', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Th sx={{ width: '140px' }}>대표자</Th>
          <Td>
            <Input
              readOnly={!edit}
              variant="outlined"
              key={basic.ordererCeoName}
              defaultValue={basic.ordererCeoName ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.ordererCeoName !== value) {
                  formik.setFieldValue('basic.ordererCeoName', value);
                }
              }}
            />
          </Td>
        </TableRow>
      </TableBody>
    </Table>
  );

}