import SectionLayout from 'layouts/SectionLayout';
import {
  Grid,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

interface Props {
  projectContractCollectionStageList: {
    name: string; // 단계명
    ratio: number; // 비율
    condition: string; // 조건
    note?: string; // 비고
  }[];
}

export default function ProjectBasicContractSection({ projectContractCollectionStageList }: Props) {
  const getTableRows = () => {
    let collectionStageList = projectContractCollectionStageList;
    if (collectionStageList.length === 0) {
      return (
        <TableRow>
          <Td colSpan={4}>조회 결과가 없습니다.</Td>
        </TableRow>
      );
    }

    return collectionStageList.map((e) =>
      <TableRow key={e.name}>
        <Td>{e.name}</Td>
        <Td>{e.ratio}</Td>
        <Td>{e.condition}</Td>
        <Td>{e.note || '-'}</Td>
      </TableRow>
    );
  };

  return (
    <SectionLayout title="최종 계약 정보">
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <TextField
            status={FieldStatus.Disabled}
            name="orderer1"
            label="발주처"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="testAmount"
            label="풍동금액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="reviewAmount"
            label="구검"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="totalAmount"
            label="총액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="expectedDuration"
            label="일정"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            status={FieldStatus.Disabled}
            name="orderer2"
            label="발주처2"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            status={FieldStatus.Disabled}
            name="orderer3"
            label="발주처3"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            status={FieldStatus.Disabled}
            name="orderer4"
            label="발주처4"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Th>기성</Th>
                  <Th>기성비율 (%)</Th>
                  <Th>기성조건</Th>
                  <Th>비고</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {getTableRows()}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
