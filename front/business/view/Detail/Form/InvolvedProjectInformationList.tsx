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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DateFormat from 'components/DateFormat';
import Title from 'components/Title';
import SelectField from 'components/SelectField';
import { Table } from 'layouts/Table';
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
                <TableCell>No.</TableCell>
                <TableCell>프로젝트 번호</TableCell>
                <TableCell>프로젝트명</TableCell>
                <TableCell>역할</TableCell>
                <TableCell>대표담당자</TableCell>
                <TableCell>착수일</TableCell>
                <TableCell>마감일</TableCell>
                <TableCell>상세</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!list || list.length === 0) && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography>참여한 프로젝트가 없습니다.</Typography>
                  </TableCell>
                </TableRow>
              )}
              {list.map((project,
                         no
              ) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {no}
                  </TableCell>
                  <TableCell>
                    {project.code}
                  </TableCell>
                  <TableCell>
                    {project.name}
                  </TableCell>
                  <TableCell>
                    {businessInvolvedTypeName(project.involvedType)}
                  </TableCell>
                  <TableCell>
                    {project.manager}
                  </TableCell>
                  <TableCell>
                    <DateFormat date={project.beginDate} />
                  </TableCell>
                  <TableCell>
                    <DateFormat date={project.closeDate} />
                  </TableCell>
                  <TableCell>
                    <Button>새 창으로 상세 보기</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
