import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';

export default function Form() {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                풍동실험 용역 계약서
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell variant="head">
                용역명
              </TableCell>
              <TableCell>
                <Typography>프로젝트 명이 보여집니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" rowSpan={2}>
                용역기간
              </TableCell>
              <TableCell>
                <TextField name="serviceDuration" label="용역기간" disableLabel />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>견적서에 등록된 남품가능 주가 보여집니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                용역금액
              </TableCell>
              <TableCell>
                <Typography>견적서에 등록된 금액(부가세 포함)이 보여집니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" rowSpan={2}>
                기성단계
              </TableCell>
              <TableCell>
                <TextField name="collectionStageNote" label="기성단계" disableLabel />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>기성은 기성단계 관리 메뉴에서 관리할 수 있습니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                성과품
              </TableCell>
              <TableCell>
                <TextField name="outcome" label="성과품" disableLabel />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        width: '100%',
        height: '50px'
      }}>
        <TextField name="description" label="설명" disableLabel />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                수급자
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell variant="head">
                소재
              </TableCell>
              <TableCell>
                <TextField name="address" label="소재" disableLabel />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                "을" 상호
              </TableCell>
              <TableCell>
                <TextField name="companyName" label="회사명" disableLabel />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                대표자
              </TableCell>
              <TableCell>
                <TextField name="ceoName" label="대표자" disableLabel />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};