import React, { useContext } from 'react';
import useDialog from 'components/Dialog';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import {
  BusinessId,
  InvolvedProjectVO,
  InvolvedType,
  involvedTypeName
} from 'business/domain';
import TableCell, { TableCellProps } from 'components/TableCell';
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { businessApi } from 'business/api';
import useId from 'services/useId';

const getList = async () => {
  const id = useId();
  return id !== undefined ? await businessApi.getInvolvedProjectList(BusinessId(id)) : [];
}

export default function () {
  const { error } = useDialog();
  const formikContext: FormikContextType<InvolvedProjectVO & { edit: boolean; }> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  const list = getList();
  const columnProps: TableCellProps[] = [
    {
      key:      'no',
      children: 'No',
      required: edit,
    },
    {
      key:      ' projectCode',
      children: '프로젝트 번호',
      required: edit,
    },
    {
      key:      'name',
      children: '프로젝트명',
      required: edit,
    },
    {
      key:      'involvedType',
      children: '역할',
      required: edit,
    },
    {
      key:      'manager',
      children: '대표담당자',
      required: edit,
    },
    {
      key:      'beginDate',
      children: '착수일',
      required: edit,
    },
    {
      key:      'endDate',
      children: '마감일',
      required: edit,
    },
    {
      key:      'detail',
      children: '상세',
      required: edit,
    }];

  if (edit) {
    return null;
  }

  return (
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
          {!edit && (
            <TableRow>
              <TableCell>
                {!edit && (<Typography>참여한 프로젝트가 없습니다.</Typography>)}
              </TableCell>
            </TableRow>
          )}
          {!edit &&
            Array.isArray(list) &&
            list.map((project,
                             no
          ) =>
            (
              <TableRow key={project.id}>
                <TableCell>
                  {no}
                </TableCell>
                <TableCell>
                  {project.projectCode}
                </TableCell>
                <TableCell>
                  {project.name}
                </TableCell>
                <TableCell>
                  {involvedTypeName(project.InvolvedType)}
                </TableCell>
                <TableCell>
                  {project.manager}
                </TableCell>
                <TableCell>
                  {project.beginDate}
                </TableCell>
                <TableCell>
                  {project.closeDate}
                </TableCell>
                <TableCell>
                  <Button children="새 창으로 상세 보기"></Button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
