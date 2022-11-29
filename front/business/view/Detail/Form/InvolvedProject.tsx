import {
  Box,
  MenuItem,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import TextBox from 'layouts/Text';
import Select from 'layouts/Select';
import {
  BusinessInvolvedProjectVO,
  BusinessInvolvedType,
  businessInvolvedTypeList,
  businessInvolvedTypeName
} from 'business/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import DateFormat from 'layouts/DateFormat';
import Button from 'layouts/Button';

interface Props {
  involvedType: BusinessInvolvedType | undefined;
  setInvolvedType: (involvedType: BusinessInvolvedType | undefined) => void;
  list: BusinessInvolvedProjectVO[] | undefined;
}

export default function BusinessInvolvedProjectSection(props: Props) {
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginBottom:   '10px',
      }}>
        <Box sx={{
          display:    'flex',
          width:      '40%',
          alignItems: 'center',
        }}>
          <TextBox variant="body7">참여 프로젝트 정보</TextBox>
        </Box>
        <Box sx={{
          display:        'flex',
          width:          '20%',
          alignItems:     'center',
          justifyContent: 'flex-end',
        }}>
          <Select
            displayEmpty
            variant="outlined"
            value={props.involvedType ?? ''}
            onChange={(e) => {
              const value = e.target.value as BusinessInvolvedType || undefined;
              if (value !== props.involvedType) {
                props.setInvolvedType(value);
              }
            }}>
            <MenuItem value="">전체</MenuItem>
            {businessInvolvedTypeList.map(item => (
              <MenuItem key={item} value={item}>
                {businessInvolvedTypeName(item)}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>No.</Th>
              <Th>프로젝트 번호</Th>
              <Th>프로젝트명</Th>
              <Th>역할</Th>
              <Th>대표담당자</Th>
              <Th>견적분류</Th>
              <Th>착수일</Th>
              <Th>마감일</Th>
              <Th>상세</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!props.list || props.list.length === 0) && (
              <TableRow>
                <Td colSpan={9}>
                  참여한 프로젝트가 없습니다.
                </Td>
              </TableRow>
            )}
            {props.list && props.list.map((project,
                                           index
            ) => (
              <TableRow key={`${project.id}_${index}`}>
                <Td>
                  {index + 1}
                </Td>
                <Td>
                  {project.code}
                </Td>
                <Td>
                  {project.name}
                </Td>
                <Td>
                  {businessInvolvedTypeName(project.involvedType)}
                </Td>
                <Td>
                  {project.manager}
                </Td>
                <Td>
                  {"견적 분류"}
                </Td>
                <Td>
                  <DateFormat date={project.beginDate} />
                </Td>
                <Td>
                  <DateFormat date={project.closeDate} />
                </Td>
                <Td>
                  <Button
                    shape="small"
                    onClick={() => {
                      window.open(`/project/sales-management/${project.id}/basic`);
                    }}
                  >
                    새 창으로 상세 보기
                  </Button>
                </Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
