import SectionLayout from 'layouts/SectionLayout';
import {
  Box, Fade,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { testTypeName } from 'type/TestType';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ProjectComplexTestVO } from 'project_complex/domain';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import CircularProgress from "../../components/CircularProgress";

interface Props {
  detail: ProjectComplexTestVO | undefined;
}

export default function ProjectBasicTestSection({ detail }: Props) {

  const colSpan = detail?.testList?.map((test) => test.buildingNameList.length)
                        .reduce((a,
                                 b
                        ) => Math.max(a, b), 1) || 1;

  return (
    <SectionLayout title="실험 정보">
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        <Box sx={{
          width:    '100%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <Box sx={{
            width:        '33%',
            marginRight:  '10px',
            marginBottom: '15px',
          }}>
            <DataFieldWithLabel label="대지 모형 수">
              <Input
                readOnly
                key={detail?.siteCount}
                defaultValue={detail?.siteCount ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            width:        '33%',
            marginRight:  '10px',
            marginBottom: '15px',
          }}>
            <DataFieldWithLabel label="실험 대상 동 수">
              <Input
                readOnly
                key={detail?.targetTest}
                defaultValue={detail?.targetTest ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
        <Box sx={{
          width:    '100%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <Th>실험 종류</Th>
                <Th>동 수</Th>
                <Th colSpan={colSpan}>실험 대상 동명</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!detail?.testList) && (
                <TableRow>
                  <Td colSpan={3} sx={{minHeight: '38px'}}>
                    <CircularProgress size={24} sx={{justifyContent: 'center', alignItems: 'center'}}/>
                  </Td>
                </TableRow>
              )}
              {(detail?.testList.length === 0) && (
                <TableRow>
                  <Td colSpan={3}>
                    <Fade in={true}>
                      <Box>조회 결과가 없습니다</Box>
                    </Fade>
                  </Td>
                </TableRow>
              )}
              {detail?.testList && detail?.testList.map((item) => (
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
        </Box>
      </Box>
    </SectionLayout>
  );
}
