import React from 'react';
import {
  BusinessInvolvedProjectVO,
  businessInvolvedTypeList,
  businessInvolvedTypeName,
} from 'business/domain';
import TableCell, { TableCellProps } from 'components/TableCell';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DateFormat from 'components/DateFormat';
import Title from 'components/Title';
import SelectField from 'components/SelectField';

interface Props {
  list: BusinessInvolvedProjectVO[];
}

export default function ({ list }: Props) {
  const columnProps: TableCellProps[] = [
    {
      key:      'no',
      children: 'No',
    },
    {
      key:      ' projectCode',
      children: '프로젝트 번호',
    },
    {
      key:      'name',
      children: '프로젝트명',
    },
    {
      key:      'involvedType',
      children: '역할',
    },
    {
      key:      'manager',
      children: '대표담당자',
    },
    {
      key:      'beginDate',
      children: '착수일',
    },
    {
      key:      'endDate',
      children: '마감일',
    },
    {
      key:      'detail',
      children: '상세',
    }];

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Title
          title="참여 프로젝트 정보"
          titleRightComponent={
            <SelectField
              labelProps={{
                disableLabel: true,
              }}
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
                {columnProps.map((props) =>
                  (<TableCell {...props} />)
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>참여한 프로젝트가 없습니다.</Typography>
                </TableCell>
              </TableRow>
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
