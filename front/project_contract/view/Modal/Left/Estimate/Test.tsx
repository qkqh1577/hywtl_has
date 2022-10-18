import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { ColorPalette } from 'app/view/App/theme';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { testTypeName } from 'type/TestType';

export default function () {
  const formik = useContext(FormikContext);
  const test = formik.values.estimate?.test ?? {};
  const rowSize = test.testList?.map(item => item.buildingNameList.length)
                      .reduce((a,
                               b
                      ) => a > b ? a : b, 0) ?? 0;
  const rowList: number[] = [];
  for (let i = 0; i < rowSize; i++) {
    rowList.push(i);
  }
  return (
    <Box sx={{
      width:        '100%',
      padding:      '10px',
      display:      'flex',
      flexWrap:     'wrap',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius: '5px',
    }}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          width:        '45%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="대지 모형 수" labelPosition="top">
            <Input
              readOnly
              key={test.siteCount}
              defaultValue={test.siteCount ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          width:        '45%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="실험 대상 동 수" labelPosition="top">
            <Input
              readOnly
              key={test.targetTest}
              defaultValue={test.targetTest ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
      {test.testList && (
        <Table>
          <TableHead>
            <TableRow>
              {test.testList.map(item => (
                <Th key={item.testType}>{testTypeName(item.testType)}</Th>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {test.testList.map(item => (
                <Td sx={{ backgroundColor: ColorPalette._f4f4f4 }} key={item.testType}>{item.buildingCount}</Td>
              ))}
            </TableRow>
            {rowList.map(i => (
              <TableRow key={i}>
                {test.testList.map(item => {
                  const buildingNameList = item.buildingNameList;
                  const name = Array.isArray(buildingNameList) ? buildingNameList[i] : '';
                  return (
                    <Td key={item.testType}>
                      {name}
                    </Td>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}