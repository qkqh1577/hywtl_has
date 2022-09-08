import React from 'react';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import TextField from 'components/TextField';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ColorPalette } from 'app/view/App/theme';

interface PlainTextProps {
  children: string;
}

function PlainText(props: PlainTextProps) {
  return (
    <Typography sx={{
      width:      '100%',
      padding:    '0 10px',
      fontSize:   'inherit',
      fontWeight: 'inherit',
      textAlign:  'left'
    }}>
      {props.children}
    </Typography>
  );
}

export default function BasicContractForm() {

  return (
    <>
      <TableContainer sx={{
        marginBottom: '20px',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th colSpan={2} backgroundColor={ColorPalette._e4e9f2}>
                풍동실험 용역 계약서
              </Th>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Th>
                용역명
              </Th>
              <Td>
                <PlainText>
                  프로젝트 명이 보여집니다.
                </PlainText>
              </Td>
            </TableRow>
            <TableRow>
              <Th rowSpan={2}>
                용역 기간
              </Th>
              <Td>
                <TextField
                  name="serviceDuration"
                  label="용역기간"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
            <TableRow>
              <Td>
                <PlainText>
                  견적서에 등록된 남품가능 주가 보여집니다.
                </PlainText>
              </Td>
            </TableRow>
            <TableRow>
              <Th>
                용역금액
              </Th>
              <Td>
                <PlainText>
                  견적서에 등록된 금액(부가세 포함)이 보여집니다.
                </PlainText>
              </Td>
            </TableRow>
            <TableRow>
              <Th rowSpan={2}>
                기성 단계
              </Th>
              <Td>
                <TextField
                  name="collectionStageNote"
                  label="기성단계"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
            <TableRow>
              <Td>
                <PlainText>
                  기성은 기성단계 관리 메뉴에서 관리할 수 있습니다.
                </PlainText>
              </Td>
            </TableRow>
            <TableRow>
              <Th>
                성과품
              </Th>
              <Td>
                <TextField
                  name="outcome"
                  label="성과품"
                  disableLabel
                  variant="outlined" />
              </Td>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        padding:      '15px 20px',
        border:       `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius: '5px',
        marginBottom: '20px',
      }}>
        <TextField
          disableLabel
          multiline
          variant="outlined"
          name="description"
          label="설명"
        />
      </Box>
    </>
  );
};
