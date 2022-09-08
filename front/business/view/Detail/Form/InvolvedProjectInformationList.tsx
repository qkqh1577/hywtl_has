import React from 'react';
import {
  BusinessInvolvedProjectVO,
  businessInvolvedTypeList,
  businessInvolvedTypeName,
} from 'business/domain';
import {
  Button,
  Grid,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DateFormat from 'components/DateFormat';
import Title from 'components/Title';
import SelectField from 'components/SelectField';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { FieldStatus } from 'components/DataFieldProps';

interface Props {
  list: BusinessInvolvedProjectVO[];
}

export default function ({ list }: Props) {

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Title
          title="참여 프로젝트 정보"
          titleRightComponent={
            <SelectField
              disableLabel
              status={FieldStatus.Idle}
              name="involvedProjectFilter"
              label="참여 프로젝트 정보 필터"
              options={businessInvolvedTypeList.map((type) => ({
                key:  type as string,
                text: businessInvolvedTypeName(type)
              }))}
            />
          }
        />
      </Grid>
      <Grid item sm={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>No.</Th>
                <Th>프로젝트 번호</Th>
                <Th>프로젝트명</Th>
                <Th>역할</Th>
                <Th>대표담당자</Th>
                <Th>착수일</Th>
                <Th>마감일</Th>
                <Th>상세</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!list || list.length === 0) && (
                <TableRow>
                  <Td colSpan={8}>
                    <Typography>참여한 프로젝트가 없습니다.</Typography>
                  </Td>
                </TableRow>
              )}
              {list.map((project,
                         no
              ) => (
                <TableRow key={project.id}>
                  <Td>
                    {no}
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
                    <DateFormat date={project.beginDate} />
                  </Td>
                  <Td>
                    <DateFormat date={project.closeDate} />
                  </Td>
                  <Td>
                    <Button>새 창으로 상세 보기</Button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
