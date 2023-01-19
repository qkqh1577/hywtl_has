import {
  Fade,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { testTypeName } from 'type/TestType';
import React from 'react';
import { ProjectComplexTestVO } from 'project_complex/domain';
import CircularProgress from "../../components/CircularProgress";

interface Props
  extends Partial<ProjectComplexTestVO> {

}

export default function ProjectComplexTestSection({ testList }: Props) {

  const colSpan = testList?.map((test) => test.buildingNameList.length)
                          .reduce((a,
                                   b
                          ) => Math.max(a, b), 1) || 1;

  return (

    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>실험 종류</Th>
            <Th>동 수</Th>
            <Th colSpan={colSpan}>실험 대상 동명</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {!testList && (
            <TableRow>
              <Td colSpan={3}>
                <CircularProgress size={24} sx={{justifyContent: 'center', alignItems: 'center'}}/>
              </Td>
            </TableRow>
          )}
          { testList?.length === 0 && (
            <TableRow>
              <Td colSpan={3}>
                <Fade in>
                  <span>조회 결과가 없습니다.</span>
                </Fade>
              </Td>
            </TableRow>
          )}
          {testList && testList.map((item) => (
            <TableRow key={item.testType}>
              <Td>{testTypeName(item.testType)}</Td>
              <Td>{item.buildingCount}</Td>
              {item.buildingNameList.map((name,
                                          i
              ) => (
                <Td key={name || `${testTypeName(item.testType)}-${i}`}>{name}</Td>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}