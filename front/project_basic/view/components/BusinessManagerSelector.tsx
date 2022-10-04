import {
  Box,
  FormLabel,
  Radio,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import React from 'react';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  BusinessManagerId,
  BusinessManagerVO
} from 'business/domain';
import { useFormik } from 'formik';

const keywordTypeList = [
  {
    key:  'by_name',
    text: '이름',
  },
  {
    key:  'by_department',
    text: '소속1',
  },
];

interface Props {
  initBusinessManagerList: BusinessManagerVO[];
  selectedBusinessManagerId?: BusinessManagerId;
  handleSelectBusinessManagerId: (id: BusinessManagerId) => void;
  initFilterCondition?: { keywordType: string, keyword: string };
  handleSetFilter: (condition: { keywordType: string, keyword: string }) => void;
}

export default function ProjectBasicBusinessManagerSelectorComponent({ initBusinessManagerList, selectedBusinessManagerId, handleSelectBusinessManagerId, initFilterCondition, handleSetFilter }: Props) {
  const formik = useFormik({
    initialValues: initFilterCondition || {
      keywordType: '',
      keyword:     '',
    },
    onSubmit:      () => {}
  });
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <FormLabel component="legend" sx={{
          fontSize:  '13px',
          color:     ColorPalette._9b9ea4,
          wordBreak: 'keep-all',
        }}>
          담당자
        </FormLabel>
      </Box>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        border:         `1px solid ${ColorPalette._e4e9f2}`,
        padding:        '10px 0',
        alignItems:     'center',
        justifyContent: 'space-around',
      }}>
        <Box sx={{ width: '15%', display: 'flex' }}>
          <SelectField
            disableLabel
            formik={formik}
            variant="outlined"
            name="keywordType"
            label="검색어 구분"
            options={keywordTypeList}
          />
        </Box>
        <Box sx={{ width: '60%', display: 'flex' }}>
          <TextField
            disableLabel
            formik={formik}
            variant="outlined"
            name="keyword"
            label="검색어"
            placeholder="검색어를 입력하세요"
          />
        </Box>
        <Box sx={{ width: '10%', display: 'flex' }}>
          <Button
            onClick={() => {
              handleSetFilter({
                keywordType: formik.values.keywordType,
                keyword:     formik.values.keyword,
              });
            }}>
            검색
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>선택</Th>
                <Th>소속1</Th>
                <Th>이름</Th>
                <Th>직위</Th>
                <Th>핸드폰번호</Th>
                <Th>이메일주소</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {initBusinessManagerList.length === 0 && (
                <TableRow>
                  <Td colSpan={6}>조회 결과가 없습니다.</Td>
                </TableRow>
              )}
              {initBusinessManagerList.map((item) => (
                <TableRow key={item.id}>
                  <Td>
                    <Radio
                      value={item.id}
                      checked={item.id === selectedBusinessManagerId}
                      onClick={() => {
                        if (!item.id) {
                          return;
                        }
                        handleSelectBusinessManagerId(item.id);
                      }}
                    />
                  </Td>
                  <Td>{item.department}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.jobTitle}</Td>
                  <Td>{item.mobilePhone}</Td>
                  <Td>{item.email}</Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
