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
            수급자
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
              key={basic.contractorAddress}
              defaultValue={basic.contractorAddress ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.contractorAddress !== value) {
                  formik.setFieldValue('basic.contractorAddress', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Th sx={{ width: '140px' }}>"을" 상호</Th>
          <Td>
            <Input
              readOnly={!edit}
              variant="outlined"
              key={basic.contractorCompanyName}
              defaultValue={basic.contractorCompanyName ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.contractorCompanyName !== value) {
                  formik.setFieldValue('basic.contractorCompanyName', value);
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
              key={basic.contractorCeoName}
              defaultValue={basic.contractorCeoName ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.contractorCeoName !== value) {
                  formik.setFieldValue('basic.contractorCeoName', value);
                }
              }}
            />
          </Td>
        </TableRow>
      </TableBody>
    </Table>
  );

}