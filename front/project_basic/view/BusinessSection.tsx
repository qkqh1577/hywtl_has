import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Button from 'layouts/Button';
import {
  ProjectBasicBusiness,
  ProjectBasicBusinessId
} from 'project_basic/domain';
import { ColorPalette } from 'app/view/App/theme';
import { businessInvolvedTypeName } from 'business/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

function Label(props: { children: string }) {
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      height:         '100%',
      justifyContent: 'center',
      alignItems:     'center',
    }}>
      <Typography sx={{
        fontSize:  '13px',
        color:     ColorPalette._9b9ea4,
        wordBreak: 'keep-all',
        width:     '110px'
      }}>
        {props.children}
      </Typography>
    </Box>
  );
}

interface Props {
  projectBasicBusinessList: ProjectBasicBusiness[];
  handleAddBusiness: () => void;
  handleDetailBusiness: (id: ProjectBasicBusinessId) => void;
}

export default function ProjectBasicBusinessSection({ projectBasicBusinessList, handleAddBusiness, handleDetailBusiness }: Props) {
  const getTableRows = () => {
    if (projectBasicBusinessList.length === 0) {
      return (
        <TableRow>
          <Td colSpan={6}>등록된 관계사가 없습니다.</Td>
        </TableRow>
      );
    }

    return projectBasicBusinessList.map((item) => (
      <TableRow
        key={item.id}
        onClick={() => {
          handleDetailBusiness(item.id);
        }}>
        <Td>
          <Label>{businessInvolvedTypeName(item.involvedType)}</Label>
        </Td>
        <Td>
          {item.business.name}
        </Td>
        <Td>
          {item.businessManager.department}
        </Td>
        <Td>
          {item.businessManager.name}
        </Td>
        <Td>
          {item.businessManager.jobTitle}
        </Td>
        <Td>
          {item.businessManager.mobilePhone}
        </Td>
      </TableRow>
    ));
  };

  return (
    <SectionLayout
      title="관계사"
      titleRightComponent={
        <Button onClick={() => handleAddBusiness()}>
          + 등록
        </Button>
      }>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
      }}>
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'nowrap',
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Th><Label> </Label></Th>
                  <Th><Label>업체명</Label></Th>
                  <Th><Label>소속</Label></Th>
                  <Th><Label>이름</Label></Th>
                  <Th><Label>직위</Label></Th>
                  <Th><Label>핸드폰번호</Label></Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {getTableRows()}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </SectionLayout>
  );
}
