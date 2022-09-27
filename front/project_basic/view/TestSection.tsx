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
  TestType,
  testTypeName
} from 'admin/estimate/content/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

interface Props {
  testList: {
    testType: TestType;
    buildingCount: number;
    buildingNameList: string[];
  }[];
}

export default function ProjectBasicTestSection({ testList }: Props) {
  const maxBuildingCount = testList?.map((test) => test.buildingCount)
                                   .reduce((a,
                                            b
                                   ) => Math.max(a, b), 1) || 1;

  const getTableHeadRow = () => {
    return (
      <TableRow>
        <Th>실험 종류</Th>
        <Th>동 수</Th>
        <Th colSpan={maxBuildingCount}>실험 대상 동명</Th>
      </TableRow>
    );
  };

  const getTableBodyRows = () => {
    if (testList.length === 0) {
      return (
        <TableRow>
          <Td colSpan={3}>조회 결과가 없습니다.</Td>
        </TableRow>
      );
    }

    return testList.map((item) => (
      <TableRow key={item.testType}>
        <Td>{testTypeName(item.testType)}</Td>
        <Td>{item.buildingCount}</Td>
        {
          new Array(maxBuildingCount)
          .fill('')
          .map((_,
                i
          ) => (
            <Td key={item.buildingNameList[i] || `${testTypeName(item.testType)}-${i}`}>
              {item.buildingNameList[i]}
            </Td>
          ))
        }
      </TableRow>
    ));
  };

  return (
    <SectionLayout title="실험 정보">
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <TextField
            name="siteCount"
            label="대지 모형 수"
            status={FieldStatus.Disabled}
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="targetTest"
            label="실험 대상 동 수"
            status={FieldStatus.Disabled}
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={12}>
          <TableContainer>
            <Table>
              <TableHead>
                {getTableHeadRow()}
              </TableHead>
              <TableBody>
                {getTableBodyRows()}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
