import React from 'react';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
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
const contentsStyle = {
  width:       '100%',
  textAlign:   'left',
  paddingLeft: '10px',
  color:       '#b2b4b7'
};

export default function BasicContractForm() {

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Typography sx={typographyStyle}>풍동실험 용역 계약서
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
                  용역명
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={contentsStyle}>프로젝트 명이 보여집니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" rowSpan={2}>
                <Typography sx={typographyStyle}>
                  용역기간
                </Typography>
              </TableCell>
              <TableCell>
                <TextField name="serviceDuration" label="용역기간" disableLabel variant="outlined" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={contentsStyle}>견적서에 등록된 남품가능 주가 보여집니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                <Typography
                  sx={typographyStyle}
                >
                  용역금액
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={contentsStyle}>견적서에 등록된 금액(부가세 포함)이 보여집니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" rowSpan={2}>
                <Typography
                  sx={typographyStyle}
                >
                  기성단계
                </Typography>
              </TableCell>
              <TableCell>
                <TextField name="collectionStageNote" label="기성단계" disableLabel variant="outlined" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={contentsStyle}>기성은 기성단계 관리 메뉴에서 관리할 수 있습니다.</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                <Typography
                  sx={typographyStyle}
                >
                  성과품
                </Typography>
              </TableCell>
              <TableCell>
                <TextField name="outcome" label="성과품" disableLabel variant="outlined" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        width:   '100%',
        border:  `1px solid ${ColorPalette._e4e9f2}`,
        padding: '20px',
      }}>
        <TextField name="description" label="설명" disableLabel multiline variant="outlined" />
      </Box>
    </>
  );
};
