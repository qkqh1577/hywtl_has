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
import TextBox from 'layouts/Text';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';

export default function BasicContractForm() {
  const formik = useContext(FormikContext);

  return (
    <Table variant="cross">
      <TableHead>
        <TableRow>
          <Th colSpan={2}>
            풍동실험 용역 계약서
          </Th>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Th sx={{ width: '140px' }}>
            용역명
          </Th>
          <Td align="left">
            <TextBox variant="body3">
              프로젝트 명이 보여집니다.
            </TextBox>
          </Td>
        </TableRow>
        <TableRow>
          <Th rowSpan={2}>
            용역 기간
          </Th>
          <Td>
            <Input
              key={formik.values.serviceDuration}
              defaultValue={formik.values.serviceDuration ?? ''}
              variant="outlined"
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.serviceDuration !== value) {
                  formik.setFieldValue('serviceDuration', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Td align="left">
            <TextBox variant="body3">
              견적서에 등록된 납품 가능 주가 보여집니다.
            </TextBox>
          </Td>
        </TableRow>
        <TableRow>
          <Th>
            용역 금액
          </Th>
          <Td align="left">
            <TextBox variant="body3">
              견적서에 등록된 금액(부가세 포함)이 보여집니다.
            </TextBox>
          </Td>
        </TableRow>
        <TableRow>
          <Th rowSpan={2}>
            기성 단계
          </Th>
          <Td>
            <Input
              key={formik.values.collectionStageNote}
              defaultValue={formik.values.collectionStageNote ?? ''}
              variant="outlined"
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.collectionStageNote !== value) {
                  formik.setFieldValue('collectionStageNote', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Td align="left">
            <TextBox variant="body3">
              기성은 기성단계 관리 메뉴에서 관리할 수 있습니다.
            </TextBox>
          </Td>
        </TableRow>
        <TableRow>
          <Th>
            성과품
          </Th>
          <Td>
            <Input
              key={formik.values.outcome}
              defaultValue={formik.values.outcome ?? ''}
              variant="outlined"
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.outcome !== value) {
                  formik.setFieldValue('outcome', value);
                }
              }}
            />
          </Td>
        </TableRow>
      </TableBody>
    </Table>
  );
};
