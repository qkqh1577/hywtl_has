import React, { useContext } from 'react';
import {
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import { initialContractorParameter } from 'admin/contract/basic/parameter';

export default function ContractorForm() {
  const formik = useContext(FormikContext);
  const contractor = formik.values.contractor ?? initialContractorParameter;
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
          <Th sx={{ width: '140px' }}>
            소재
          </Th>
          <Td>
            <Input
              key={contractor.address}
              defaultValue={contractor.address ?? ''}
              variant="outlined"
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (contractor.address !== value) {
                  formik.setFieldValue('contractor.address', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Th>
            "을" 상호
          </Th>
          <Td>
            <Input
              key={contractor.companyName}
              defaultValue={contractor.companyName ?? ''}
              variant="outlined"
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (contractor.companyName !== value) {
                  formik.setFieldValue('contractor.companyName', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Th>
            대표자
          </Th>
          <Td>
            <Input
              key={contractor.ceoName}
              defaultValue={contractor.ceoName ?? ''}
              variant="outlined"
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (contractor.ceoName !== value) {
                  formik.setFieldValue('contractor.ceoName', value);
                }
              }}
            />
          </Td>
        </TableRow>
      </TableBody>
    </Table>
  );
}
