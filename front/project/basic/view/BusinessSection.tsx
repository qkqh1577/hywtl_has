import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Button from 'layouts/Button';
import { ProjectBasicBusiness } from 'project/basic/domain';
import { ColorPalette } from 'app/view/App/theme';
import { businessInvolvedTypeName } from 'business/domain';

interface Props {
  list?: ProjectBasicBusiness[];
}

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
        color:     ColorPalette.Grey['1'],
        wordBreak: 'keep-all',
        width:     '110px'
      }}>
        {props.children}
      </Typography>
    </Box>
  );
}

export default function ProjectBasicBusinessSection(props: Props) {

  return (
    <SectionLayout
      title="관계사"
      titleRightComponent={
        <Button shape="basic1">
          + 등록
        </Button>
      }>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
        padding:  '15px 20px'
      }}>
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'nowrap',
        }}>
          <TableContainer>
            <Table sx={{
              border: 'none',
            }}

            >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell><Label>업체명</Label></TableCell>
                  <TableCell><Label>소속</Label></TableCell>
                  <TableCell><Label>이름</Label></TableCell>
                  <TableCell><Label>직위</Label></TableCell>
                  <TableCell><Label>핸드폰번호</Label></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!props.list || props.list.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={6}>등록된 관계사가 없습니다.</TableCell>
                  </TableRow>
                )}
                {props.list && props.list.map((item) => (
                  <TableRow key={item.id} onClick={() => {
                    // TODO: 상세 모달
                  }}>
                    <TableCell>
                      <Label>{businessInvolvedTypeName(item.involvedType)}</Label>
                    </TableCell>
                    <TableCell>
                      {item.business.name}
                    </TableCell>
                    <TableCell>
                      {item.businessManager.department}
                    </TableCell>
                    <TableCell>
                      {item.businessManager.name}
                    </TableCell>
                    <TableCell>
                      {item.businessManager.jobTitle}
                    </TableCell>
                    <TableCell>
                      {item.businessManager.mobilePhone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </SectionLayout>
  );
}