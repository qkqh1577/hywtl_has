import SectionLayout from 'layouts/SectionLayout';
import Button from 'layouts/Button';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  Box,
  MenuItem,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import Input from 'layouts/Input';
import Checkbox from 'layouts/Checkbox';
import Select from 'layouts/Select';
import {
  Difficulty,
  difficultyList
} from 'project_complex/domain';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import UserSelector from 'components/UserSelector';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const siteList = formik.values.siteList;

  return (
    <Box sx={{
      width:        '100%',
      marginBottom: '10px',
    }}>
      <SectionLayout
        disableFold
        title="대지 모형"
        titleLeftComponent={edit && (
          <Button shape="small" onClick={() => {
            formik.setFieldValue('siteList', [...siteList, {}]);
          }}>
            + 추가
          </Button>
        )}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>대지 모형</Th>
              <Th>실험 종류 E 여부</Th>
              <Th>견적 대지 모형 제작 난이도</Th>
              <Th>대지 모형 제작 난이도</Th>
              <Th sx={{ width: '180px' }}>담당자</Th>
              {edit && (<Th>삭제</Th>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {siteList.map((item,
                           i
            ) => (
              <TableRow key={i}>
                <Td>
                  <Input
                    key={item.name}
                    readOnly={!edit}
                    type="text"
                    variant="outlined"
                    defaultValue={item.name ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (value !== item.name) {
                        formik.setFieldValue(`siteList.${i}.name`, value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = (e.target as HTMLInputElement).value || undefined;
                        if (value !== item.name) {
                          formik.setFieldValue(`siteList.${i}.name`, value);
                        }
                      }
                    }}
                  />
                </Td>
                <Td>
                  <Checkbox
                    readOnly={!edit}
                    checked={!!item.withEnvironmentTest}
                    onChange={() => {
                      formik.setFieldValue(`siteList.${i}.withEnvironmentTest`, !item.withEnvironmentTest);
                    }}
                  />
                </Td>
                <Td>
                  <Select
                    readOnly={!edit}
                    variant="outlined"
                    value={item.estimateFigureDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      if (item.estimateFigureDifficulty !== value) {
                        formik.setFieldValue(`siteList.${i}.estimateFigureDifficulty`, value);
                      }
                    }}>
                    {difficultyList.map(item => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Td>
                <Td>
                  <Select
                    readOnly={!edit}
                    variant="outlined"
                    value={item.figureDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      if (item.figureDifficulty !== value) {
                        formik.setFieldValue(`siteList.${i}.figureDifficulty`, value);
                      }
                    }}>
                    {difficultyList.map(item => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Td>
                <Td>
                  <UserSelector
                    readOnly={!edit}
                    variant="outlined"
                    value={item.managerId ?? item.manager?.id}
                    onChange={(value) => {
                      const prevValue = item.managerId ?? item.manager?.id;
                      if (prevValue !== value) {
                        formik.setFieldValue(`siteList.${i}.managerId`, value);
                      }
                    }}
                  />
                </Td>
                {edit && (
                  <Td>
                    <Button shape="basic3" onClick={() => {
                      formik.setFieldValue('siteList', siteList.filter((site,
                                                                        j
                      ) => j !== i));
                    }}>
                      삭제
                    </Button>
                  </Td>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionLayout>
    </Box>
  );
}