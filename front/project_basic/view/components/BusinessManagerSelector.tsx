import {
  Box,
  FormLabel,
  MenuItem,
  Radio,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import React from 'react';
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
import Select from 'layouts/Select';
import Input from 'layouts/Input';

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
          <Select
            variant="outlined"
            value={formik.values.keywordType ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.keywordType !== value) {
                formik.setFieldValue('keywordType', value);
              }
            }}>
            {keywordTypeList.map(item => (
              <MenuItem key={item.key} value={item.key}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: '60%', display: 'flex' }}>
          <Input
            variant="outlined"
            placeholder="검색어를 입력하세요"
            key={formik.values.keyword}
            defaultValue={formik.values.keyword ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.keyword !== value) {
                formik.setFieldValue('keyword', value);
              }
            }}
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
      </Box>
    </>
  );
}
