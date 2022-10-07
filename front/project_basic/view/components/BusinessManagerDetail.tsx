import {
  Box,
  FormLabel,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import React from 'react';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  BusinessManagerVO,
  BusinessVO
} from 'business/domain';

interface Props {
  business: BusinessVO;
  businessManager: BusinessManagerVO;
}

export default function ProjectBasicBusinessManagerDetailComponent({ business, businessManager: manager }: Props) {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <FormLabel component="legend" sx={{
          fontSize:  '13px',
          color:     ColorPalette._9b9ea4,
          wordBreak: 'keep-all',
        }}>
          담당자
        </FormLabel>
      </Box>
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>소속1</Th>
                <Th>이름</Th>
                <Th>직위</Th>
                <Th>핸드폰번호</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <Td>{manager.department}</Td>
                <Td>{manager.name}</Td>
                <Td>{manager.jobTitle}</Td>
                <Td>{manager.mobilePhone}</Td>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <Th>이메일주소</Th>
                <Th>회사번호</Th>
                <Th>팩스번호</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <Td>{manager.email}</Td>
                <Td>{manager.officePhone}</Td>
                <Td>{business.fax}</Td>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
